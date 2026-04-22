import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Ты — AI-консультант компании OnКлимат (Санкт-Петербург и Ленинградская область). Помогаешь подобрать климатическое оборудование: кондиционеры, вентиляцию, отопление.

Правила:
- Говори простым языком, без сложных терминов.
- Задавай уточняющие вопросы: тип помещения (квартира, дом, офис), площадь, задачи (охлаждение, обогрев, вентиляция), бюджет.
- Предлагай 2-3 варианта с объяснением, почему подходит. Указывай ориентировочные цены.
- Если пользователь не знает, что ему нужно — помоги разобраться.
- Ориентируй по шуму, энергоэффективности, площади покрытия.
- Упоминай инверторные модели как более экономичные и тихие.
- Если пользователь готов оставить заявку, попроси имя и телефон. Если сейчас рабочее время — скажи, что менеджер свяжется в течение 15 минут. Если сейчас нерабочее время — скажи, что заявка принята, и менеджер свяжется в рабочее время (ежедневно 9:30–20:00 МСК); можно уточнить удобное время для звонка.
- При переводе на менеджера ([МЕНЕДЖЕР]): в рабочее время — «передаю ваш запрос, менеджер ответит в ближайшее время»; в нерабочее — «передаю ваш запрос, менеджер свяжется с вами в рабочее время (9:30–20:00 МСК)».
- ВАЖНО: Перед тем как запросить имя и телефон, ОБЯЗАТЕЛЬНО сначала спроси согласие на обработку персональных данных. Напиши: «Для оформления заявки мне понадобятся ваше имя и телефон. Продолжая, вы соглашаетесь с [политикой конфиденциальности](https://onclimat.lovable.app/privacy). Всё ок?» Не запрашивай контактные данные, пока пользователь не подтвердит согласие.
- Когда пользователь дал имя и телефон, включи в ответ на отдельной строке метку: [ЗАЯВКА: имя=Имя, телефон=+7XXXXXXXXXX, задача=краткое описание]
- Если пользователь просит связаться с менеджером, ответь что передаёшь запрос и включи метку: [МЕНЕДЖЕР]
- Не придумывай конкретные модели если не уверен. Лучше предложи общее решение и порекомендуй уточнить у менеджера.
- Отвечай кратко и по делу, используй маркированные списки.

Услуги компании:
- Продажа кондиционеров, вентиляции, отопительного оборудования
- Монтаж и установка под ключ
- Сервисное обслуживание и ремонт
- Проектирование климатических систем

Общие ориентиры по площади и BTU:
- до 20 м² → 7000 BTU (2 кВт)
- 20-35 м² → 9000-12000 BTU (2.5-3.5 кВт)
- 35-50 м² → 18000 BTU (5 кВт)
- 50+ м² → мульти-сплит или канальная система`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, conversation_id } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "system", content: (() => {
              const now = new Date();
              const mskMinutes = ((now.getUTCHours() + 3) % 24) * 60 + now.getUTCMinutes();
              const isWorking = mskMinutes >= 570 && mskMinutes < 1200;
              return `Текущее время в Москве: ${String(Math.floor(mskMinutes / 60)).padStart(2, "0")}:${String(mskMinutes % 60).padStart(2, "0")}. Сейчас ${isWorking ? "РАБОЧЕЕ" : "НЕРАБОЧЕЕ"} время. Рабочие часы: ежедневно 9:30–20:00 МСК.`;
            })() },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Слишком много запросов, попробуйте позже." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Сервис временно недоступен." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Ошибка AI сервиса" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

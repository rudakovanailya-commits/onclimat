import { Button } from "@/components/ui/button";
import { Check, AlertCircle, MessageCircle } from "lucide-react";
import { useChat } from "@/components/ChatContext";

const plans = [
  { power: "До 2,5 кВт", price: "от 15 990 ₽", note: "Для комнат до 25 м²" },
  { power: "До 3,5 кВт", price: "от 20 400 ₽", note: "Для комнат до 35 м²" },
  { power: "До 5,5 кВт", price: "от 23 490 ₽", note: "Для комнат до 50 м²" },
];

const included = ["Установка блоков", "Прокладка трассы", "Подключение", "Запуск и проверка"];
const factors = ["Длина трассы", "Сложность монтажа", "Дополнительные работы"];

const PricingSection = () => {
  const { openChat } = useChat();

  return (
    <section id="pricing" className="py-14">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
          Цены на монтаж кондиционеров
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Прозрачные цены без скрытых доплат
        </p>

        {/* Price cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {plans.map((p) => (
            <div
              key={p.power}
              className="bg-card rounded-xl p-6 shadow-card border border-border text-center flex flex-col items-center"
            >
              <span className="text-sm font-medium text-muted-foreground mb-1">{p.power}</span>
              <span className="text-2xl font-bold text-foreground mb-1">{p.price}</span>
              <span className="text-xs text-muted-foreground">{p.note}</span>
            </div>
          ))}
        </div>

        {/* Info blocks */}
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-accent-foreground" />
              Что входит в монтаж
            </h3>
            <ul className="space-y-2">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-accent-foreground" />
              Что влияет на стоимость
            </h3>
            <ul className="space-y-2">
              {factors.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            className="btn-gradient text-base px-8 py-6 gap-2"
            onClick={() => openChat("Хочу рассчитать стоимость монтажа")}
          >
            <MessageCircle className="w-5 h-5" />
            Рассчитать стоимость
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

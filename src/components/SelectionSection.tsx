import { useState } from "react";
import { Button } from "@/components/ui/button";
import klimatonImg from "@/assets/klimaton-mascot.png";

type Step = "intro" | "type" | "area" | "priorities" | "install" | "result";

const SelectionSection = () => {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState({ type: "", area: "", priorities: [] as string[], install: "" });

  const pick = (key: string, val: string) => {
    setAnswers((p) => ({ ...p, [key]: val }));
  };
  const togglePriority = (val: string) => {
    setAnswers((p) => ({
      ...p,
      priorities: p.priorities.includes(val) ? p.priorities.filter((v) => v !== val) : [...p.priorities, val],
    }));
  };

  const Chip = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-lg text-sm font-medium transition-all border ${
        selected
          ? "gradient-primary text-primary-foreground border-transparent shadow-button"
          : "bg-card text-foreground border-border hover:border-primary/40"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="selection" className="py-20 bg-background">
      <div className="container max-w-3xl">
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border">
          {step === "intro" && (
            <div className="text-center space-y-6">
              <img src={klimatonImg} alt="КлиматОН" width={120} height={120} className="mx-auto" loading="lazy" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Привет! Я КлиматОН 👋
              </h2>
              <p className="text-muted-foreground text-lg">
                Помогу подобрать оборудование под твои задачи
              </p>
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-button px-10" onClick={() => setStep("type")}>
                Начать подбор
              </Button>
            </div>
          )}

          {step === "type" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Где будет использоваться?</h3>
              <div className="flex flex-wrap gap-3">
                {["Квартира", "Дом", "Офис"].map((t) => (
                  <Chip key={t} label={t} selected={answers.type === t} onClick={() => pick("type", t)} />
                ))}
              </div>
              <Button disabled={!answers.type} onClick={() => setStep("area")} className="gradient-primary text-primary-foreground">
                Далее
              </Button>
            </div>
          )}

          {step === "area" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Какая площадь помещения?</h3>
              <div className="flex flex-wrap gap-3">
                {["до 25 м²", "25–50 м²", "50–100 м²", "более 100 м²"].map((a) => (
                  <Chip key={a} label={a} selected={answers.area === a} onClick={() => pick("area", a)} />
                ))}
              </div>
              <Button disabled={!answers.area} onClick={() => setStep("priorities")} className="gradient-primary text-primary-foreground">
                Далее
              </Button>
            </div>
          )}

          {step === "priorities" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Что для вас важно?</h3>
              <div className="flex flex-wrap gap-3">
                {["Охлаждение", "Обогрев", "Тишина", "Экономия", "Дизайн"].map((p) => (
                  <Chip key={p} label={p} selected={answers.priorities.includes(p)} onClick={() => togglePriority(p)} />
                ))}
              </div>
              <Button disabled={answers.priorities.length === 0} onClick={() => setStep("install")} className="gradient-primary text-primary-foreground">
                Далее
              </Button>
            </div>
          )}

          {step === "install" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Нужна ли установка?</h3>
              <div className="flex flex-wrap gap-3">
                {["Да, нужна", "Нет, только оборудование"].map((i) => (
                  <Chip key={i} label={i} selected={answers.install === i} onClick={() => pick("install", i)} />
                ))}
              </div>
              <Button disabled={!answers.install} onClick={() => setStep("result")} className="gradient-primary text-primary-foreground">
                Показать результат
              </Button>
            </div>
          )}

          {step === "result" && (
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-foreground text-center">
                Подобрали 3 варианта для вас
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { tier: "Базовый", price: "от 25 000 ₽", desc: "Надёжная модель для стандартных задач" },
                  { tier: "Оптимальный", price: "от 45 000 ₽", desc: "Баланс цены, тишины и энергоэффективности", highlight: true },
                  { tier: "Комфорт", price: "от 75 000 ₽", desc: "Премиум: минимум шума, максимум функций" },
                ].map((v) => (
                  <div
                    key={v.tier}
                    className={`rounded-xl p-5 border text-center space-y-3 ${
                      v.highlight
                        ? "gradient-primary text-primary-foreground border-transparent shadow-button"
                        : "bg-muted/50 border-border"
                    }`}
                  >
                    <div className="text-sm font-medium opacity-80">{v.tier}</div>
                    <div className="text-2xl font-bold">{v.price}</div>
                    <p className="text-sm opacity-80">{v.desc}</p>
                  </div>
                ))}
              </div>
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">Хотите — рассчитаем точную стоимость и установку</p>
                <Button size="lg" className="gradient-primary text-primary-foreground shadow-button px-10">
                  Получить расчёт
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SelectionSection;

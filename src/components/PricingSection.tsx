import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle, MessageCircle, Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useChat } from "@/components/ChatContext";

const plans = [
  { label: "До 2,5 кВт", key: "2.5", base: 15990, note: "до 25 м²" },
  { label: "До 3,5 кВт", key: "3.5", base: 20400, note: "до 35 м²" },
  { label: "До 5,5 кВт", key: "5.5", base: 23490, note: "до 50 м²" },
];

const included = ["Установка блоков", "Прокладка трассы", "Подключение", "Запуск и проверка"];
const factors = ["Длина трассы", "Сложность монтажа", "Дополнительные работы"];

const EXTRA_PER_METER = 1500;
const COMPLEX_SURCHARGE = 3000;
const FREE_TRACK = 3;

const PricingSection = () => {
  const { openChat } = useChat();
  const [selectedPower, setSelectedPower] = useState("2.5");
  const [trackLength, setTrackLength] = useState(3);
  const [isComplex, setIsComplex] = useState(false);

  const plan = plans.find((p) => p.key === selectedPower)!;

  const total = useMemo(() => {
    const extra = Math.max(0, trackLength - FREE_TRACK) * EXTRA_PER_METER;
    return plan.base + extra + (isComplex ? COMPLEX_SURCHARGE : 0);
  }, [plan, trackLength, isComplex]);

  const formatPrice = (n: number) =>
    n.toLocaleString("ru-RU") + " ₽";

  const handleSubmit = () => {
    openChat(
      `Монтаж кондиционера ${plan.label}, трасса ${trackLength} м, ${isComplex ? "сложный" : "стандартный"} монтаж — примерно ${formatPrice(total)}`
    );
  };

  return (
    <section id="pricing" className="py-14">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
          Цены на монтаж кондиционеров
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Прозрачные цены без скрытых доплат
        </p>

        {/* Power cards — selectable */}
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {plans.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setSelectedPower(p.key)}
              className={`bg-card rounded-xl p-6 shadow-card border-2 text-center flex flex-col items-center transition-all duration-200 cursor-pointer ${
                selectedPower === p.key
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <span className="text-sm font-medium text-muted-foreground mb-1">{p.label}</span>
              <span className="text-2xl font-bold text-foreground mb-1">от {formatPrice(p.base)}</span>
              <span className="text-xs text-muted-foreground">{p.note}</span>
            </button>
          ))}
        </div>

        {/* Calculator */}
        <div className="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border mb-10">
          <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2 text-lg">
            <Calculator className="w-5 h-5 text-accent-foreground" />
            Калькулятор стоимости
          </h3>

          <div className="grid sm:grid-cols-2 gap-8">
            {/* Track length */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Длина трассы: <span className="text-primary font-bold">{trackLength} м</span>
              </label>
              <Slider
                value={[trackLength]}
                onValueChange={(v) => setTrackLength(v[0])}
                min={1}
                max={15}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 м</span>
                <span>15 м</span>
              </div>
              {trackLength > FREE_TRACK && (
                <p className="text-xs text-muted-foreground mt-2">
                  +{formatPrice((trackLength - FREE_TRACK) * EXTRA_PER_METER)} за доп. {trackLength - FREE_TRACK} м трассы
                </p>
              )}
            </div>

            {/* Complexity */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Сложность монтажа
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsComplex(false)}
                  className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    !isComplex
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Стандартный
                </button>
                <button
                  type="button"
                  onClick={() => setIsComplex(true)}
                  className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isComplex
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Сложный
                  <span className="block text-xs opacity-75">+{formatPrice(COMPLEX_SURCHARGE)}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">Примерная стоимость</p>
              <p className="text-3xl font-bold text-foreground">
                от {formatPrice(total)}
              </p>
            </div>
            <Button
              className="btn-gradient text-base px-8 py-6 gap-2"
              onClick={handleSubmit}
            >
              <MessageCircle className="w-5 h-5" />
              Оставить заявку
            </Button>
          </div>
        </div>

        {/* Info blocks */}
        <div className="grid sm:grid-cols-2 gap-5">
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
      </div>
    </section>
  );
};

export default PricingSection;

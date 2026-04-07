import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wind, Fan, Flame, Wrench } from "lucide-react";

const categories = [
  { id: "cond", label: "Кондиционеры", icon: Wind },
  { id: "vent", label: "Вентиляция", icon: Fan },
  { id: "heat", label: "Отопление", icon: Flame },
  { id: "parts", label: "Комплектующие", icon: Wrench },
];

const products: Record<string, { name: string; price: string }[]> = {
  cond: [
    { name: "Сплит-система Haier HSU-07", price: "от 28 000 ₽" },
    { name: "Инверторный Daikin FTXB25C", price: "от 52 000 ₽" },
    { name: "Мульти-сплит Mitsubishi MSZ", price: "от 68 000 ₽" },
  ],
  vent: [
    { name: "Приточная установка Tion 4S", price: "от 35 000 ₽" },
    { name: "Рекуператор Vakio Base", price: "от 22 000 ₽" },
    { name: "Канальный вентилятор Shuft", price: "от 8 500 ₽" },
  ],
  heat: [
    { name: "Конвектор Noirot Spot E-5", price: "от 12 000 ₽" },
    { name: "Инфракрасный обогреватель Ballu", price: "от 5 500 ₽" },
    { name: "Тепловая завеса Тепломаш", price: "от 15 000 ₽" },
  ],
  parts: [
    { name: "Дренажная помпа Aspen Mini", price: "от 4 200 ₽" },
    { name: "Фреон R-410A (баллон)", price: "от 3 800 ₽" },
    { name: "Кронштейн наружного блока", price: "от 1 200 ₽" },
  ],
};

const CatalogSection = () => {
  const [active, setActive] = useState("cond");

  return (
    <section id="catalog" className="py-14 bg-muted/50">
      <div className="container">
        <p className="text-center text-muted-foreground mb-2">Или выберите оборудование самостоятельно</p>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10">Каталог</h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                active === cat.id
                  ? "gradient-primary text-primary-foreground border-transparent"
                  : "bg-card text-foreground border-border hover:border-primary/40"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products[active].map((p) => (
            <div key={p.name} className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-card-hover transition-shadow">
              <div className="w-full h-40 bg-muted rounded-lg mb-4 flex items-center justify-center">
                <Wind className="w-12 h-12 text-primary/30" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{p.name}</h3>
              <p className="text-lg font-bold text-primary mb-4">{p.price}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  Уточнить наличие
                </Button>
                <Button size="sm" className="flex-1 text-xs gradient-primary text-primary-foreground">
                  Заказать с установкой
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;

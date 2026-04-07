import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wind, Fan, Flame, Wrench, Snowflake, Volume2, Zap } from "lucide-react";

const categories = [
  { id: "cond", label: "Кондиционеры", icon: Wind },
  { id: "vent", label: "Вентиляция", icon: Fan },
  { id: "heat", label: "Отопление", icon: Flame },
  { id: "parts", label: "Комплектующие", icon: Wrench },
];

interface Product {
  name: string;
  area: string;
  price: string;
  features: string[];
}

const products: Record<string, Product[]> = {
  cond: [
    {
      name: "Haier HSU-07HPL103/R3",
      area: "до 20 м²",
      price: "от 28 000 ₽",
      features: ["Инвертор", "19 дБ — тихая работа", "Класс A++"],
    },
    {
      name: "Daikin FTXB25C / RXB25C",
      area: "до 25 м²",
      price: "от 52 000 ₽",
      features: ["Инвертор", "Самоочистка фильтра", "22 дБ"],
    },
    {
      name: "Mitsubishi Electric MSZ-LN25VG",
      area: "до 30 м²",
      price: "от 68 000 ₽",
      features: ["Гиперинвертор", "3D-поток воздуха", "19 дБ"],
    },
  ],
  vent: [
    {
      name: "Tion Бризер 4S",
      area: "до 40 м²",
      price: "от 35 000 ₽",
      features: ["HEPA-фильтр", "Подогрев воздуха", "Управление по Wi-Fi"],
    },
    {
      name: "Vakio Base Plus",
      area: "до 30 м²",
      price: "от 22 000 ₽",
      features: ["Рекуперация тепла", "Бесшумный режим", "Компактный"],
    },
    {
      name: "Shuft ECo 200/1-3.0",
      area: "до 60 м²",
      price: "от 8 500 ₽",
      features: ["Канальный тип", "Низкое энергопотребление", "IP44"],
    },
  ],
  heat: [
    {
      name: "Noirot Spot E-5 1500",
      area: "до 20 м²",
      price: "от 12 000 ₽",
      features: ["Электронный термостат", "Бесшумный", "Защита от перегрева"],
    },
    {
      name: "Ballu BIH-AP4-1.0",
      area: "до 15 м²",
      price: "от 5 500 ₽",
      features: ["Инфракрасный", "Потолочный монтаж", "Класс A"],
    },
    {
      name: "Тепломаш КЭВ-6П3231Е",
      area: "проём до 2.5 м",
      price: "от 15 000 ₽",
      features: ["Тепловая завеса", "Два режима мощности", "Пульт ДУ"],
    },
  ],
  parts: [
    {
      name: "Aspen Mini Blanc",
      area: "для сплит-систем",
      price: "от 4 200 ₽",
      features: ["Дренажная помпа", "Тихая работа", "Компактная"],
    },
    {
      name: "Фреон R-410A (11.3 кг)",
      area: "для инверторных систем",
      price: "от 3 800 ₽",
      features: ["Экологичный", "Высокая эффективность", "Заводская фасовка"],
    },
    {
      name: "Кронштейн К-1 500×450",
      area: "для наружных блоков",
      price: "от 1 200 ₽",
      features: ["Нагрузка до 100 кг", "Оцинкованная сталь", "В комплекте крепёж"],
    },
  ],
};

const featureIcon = (f: string) => {
  const low = f.toLowerCase();
  if (low.includes("дб") || low.includes("тих") || low.includes("бесшум")) return Volume2;
  if (low.includes("инвертор") || low.includes("гиперинвертор")) return Zap;
  return Snowflake;
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
          {products[active].map((p) => {
            return (
              <div key={p.name} className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-card-hover transition-shadow flex flex-col">
                <div className="w-full h-36 bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Wind className="w-12 h-12 text-primary/30" />
                </div>

                <h3 className="font-semibold text-foreground text-base mb-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">Площадь: {p.area}</p>

                <ul className="space-y-1.5 mb-4">
                  {p.features.map((f) => {
                    const Icon = featureIcon(f);
                    return (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                        {f}
                      </li>
                    );
                  })}
                </ul>

                <p className="text-lg font-bold text-primary mb-1">{p.price}</p>
                <p className="text-xs text-muted-foreground mb-4">или аналогичная модель</p>

                <div className="flex gap-2 mt-auto">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    Подробнее
                  </Button>
                  <Button size="sm" className="flex-1 text-xs gradient-primary text-primary-foreground">
                    Подобрать вариант
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Стандартный монтаж кондиционера",
    items: [
      { name: "Монтаж сплит-системы до 2,5 кВт (до 25 м²)", price: "от 15 990 ₽" },
      { name: "Монтаж сплит-системы до 3,5 кВт (до 35 м²)", price: "от 20 400 ₽" },
      { name: "Монтаж сплит-системы до 5,5 кВт (до 50 м²)", price: "от 23 490 ₽" },
      { name: "Монтаж сплит-системы до 7,0 кВт (до 70 м²)", price: "от 27 990 ₽" },
      { name: "Монтаж сплит-системы от 7,0 кВт", price: "от 32 000 ₽" },
    ],
  },
  {
    title: "Дополнительные работы",
    items: [
      { name: "Прокладка доп. трассы (за 1 м)", price: "1 500 ₽" },
      { name: "Штробление бетонной стены (за 1 м)", price: "2 500 ₽" },
      { name: "Штробление кирпичной стены (за 1 м)", price: "1 800 ₽" },
      { name: "Сложный монтаж (высота, фасад, доп. крепления)", price: "от 3 000 ₽" },
      { name: "Монтаж дренажной помпы", price: "от 3 500 ₽" },
      { name: "Прокладка дренажа в канализацию", price: "от 2 500 ₽" },
      { name: "Удлинение электрокабеля (за 1 м)", price: "300 ₽" },
      { name: "Установка козырька над наружным блоком", price: "от 3 000 ₽" },
    ],
  },
  {
    title: "Демонтаж и обслуживание",
    items: [
      { name: "Демонтаж сплит-системы", price: "от 3 000 ₽" },
      { name: "Демонтаж только наружного блока", price: "от 2 000 ₽" },
      { name: "Сервисное обслуживание (чистка, заправка)", price: "от 3 500 ₽" },
      { name: "Дозаправка фреоном (за 100 г)", price: "от 500 ₽" },
      { name: "Диагностика неисправности", price: "от 2 000 ₽" },
    ],
  },
];

const MontazhCeny = () => (
  <div className="min-h-screen bg-background">
    <div className="container py-10 max-w-3xl">
      <Link to="/">
        <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Button>
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
        Прайс на монтаж и дополнительные работы
      </h1>
      <p className="text-muted-foreground mb-10">
        Актуальные цены. Точная стоимость рассчитывается после осмотра объекта.
      </p>

      {sections.map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4">{section.title}</h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {section.items.map((item, i) => (
              <div
                key={item.name}
                className={`flex items-center justify-between px-5 py-3.5 text-sm ${
                  i !== section.items.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="text-foreground">{item.name}</span>
                <span className="text-foreground font-medium whitespace-nowrap ml-4">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground">
        * Цены указаны ориентировочно. Окончательная стоимость определяется после выезда специалиста.
      </p>
    </div>
  </div>
);

export default MontazhCeny;

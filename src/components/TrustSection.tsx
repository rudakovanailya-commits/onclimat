import { Settings, Truck, Handshake, Award } from "lucide-react";

const cards = [
  {
    icon: Settings,
    title: "Подбор под задачи",
    text: "Подбираем оборудование под помещение, а не просто продаём",
  },
  {
    icon: Truck,
    title: "Установка под ключ",
    text: "Берём на себя подбор, доставку и монтаж",
  },
  {
    icon: Handshake,
    title: "Работа с поставщиками",
    text: "Подбираем оптимальные варианты по цене и срокам",
  },
  {
    icon: Award,
    title: "20+ лет опыта",
    text: "Работаем с климатическим оборудованием с 2005 года",
  },
];

const TrustSection = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
        Почему нам доверяют
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border"
          >
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <card.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">{card.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;

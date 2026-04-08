import { Settings, Truck, Handshake } from "lucide-react";

const cards = [
  {
    icon: Settings,
    title: "Подбор под ваш объект",
    text: "Учитываем площадь, планировку и ваши пожелания — подбираем не \"по каталогу\", а под реальную задачу",
  },
  {
    icon: Truck,
    title: "Установка под ключ",
    text: "Берём на себя всё: подбор, доставку и монтаж — вам не нужно разбираться в деталях",
  },
  {
    icon: Handshake,
    title: "Проверенные поставщики",
    text: "Работаем с надёжными брендами и подбираем оптимальные варианты по цене и срокам",
  },
];

const TrustSection = () => (
  <section className="py-14 bg-background">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
        Почему нам доверяют
      </h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border"
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              cards.indexOf(card) === 1 ? "bg-accent" : "gradient-primary"
            }`}>
              <card.icon className={`w-6 h-6 ${cards.indexOf(card) === 1 ? "text-accent-foreground" : "text-primary-foreground"}`} />
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

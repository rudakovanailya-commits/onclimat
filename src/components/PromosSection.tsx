import { Truck, Percent, Banknote } from "lucide-react";

const promos = [
  {
    icon: Truck,
    title: "Бесплатная доставка",
    text: "Привезём оборудование в удобное время без доплат",
  },
  {
    icon: Percent,
    title: "Скидка на монтаж",
    text: "При установке нескольких систем — выгодные условия",
  },
  {
    icon: Banknote,
    title: "Рассрочка без переплат",
    text: "Оформим удобный вариант оплаты через банк",
  },
];

const PromosSection = () => (
  <section className="py-14 bg-background">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
        Акции и предложения
      </h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {promos.map((promo) => (
          <div
            key={promo.title}
            className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border"
          >
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <promo.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">{promo.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{promo.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PromosSection;

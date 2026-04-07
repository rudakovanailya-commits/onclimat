const steps = [
  { num: "01", title: "Оставляете заявку", text: "Или проходите подбор онлайн" },
  { num: "02", title: "Уточняем задачи", text: "Связываемся и выясняем детали" },
  { num: "03", title: "Подбираем оборудование", text: "Оптимальные варианты под бюджет" },
  { num: "04", title: "Согласовываем", text: "Финальный выбор и стоимость" },
  { num: "05", title: "Доставка и установка", text: "Монтаж в удобное время" },
];

const HowWeWorkSection = () => (
  <section className="py-20 bg-muted/50">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-14">
        Как мы работаем
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {steps.map((step) => (
          <div key={step.num} className="relative text-center">
            <div className="text-5xl font-extrabold text-primary/30 mb-2">{step.num}</div>
            <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
            <p className="text-sm text-foreground/70">{step.text}</p>
          </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowWeWorkSection;

import { Button } from "@/components/ui/button";
import { Wrench, RefreshCw, Search } from "lucide-react";

const services = [
  { icon: Wrench, title: "Монтаж кондиционеров", text: "Профессиональная установка с гарантией на работы", btn: "Заказать монтаж" },
  { icon: RefreshCw, title: "Обслуживание", text: "Чистка, заправка фреоном, проверка системы", btn: "Оставить заявку" },
  { icon: Search, title: "Диагностика", text: "Выезд мастера, поиск и устранение неисправностей", btn: "Оставить заявку" },
];

const ServicesSection = () => (
  <section id="services" className="py-20 bg-background">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Услуги</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {services.map((s) => (
          <div key={s.title} className="bg-card rounded-xl p-6 shadow-card border border-border text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-xl gradient-primary flex items-center justify-center">
              <s.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.text}</p>
            <Button className="gradient-primary text-primary-foreground shadow-button">{s.btn}</Button>
          </div>
        ))}
      </div>
      <div className="bg-accent rounded-xl p-8 text-center space-y-4">
        <h3 className="text-xl font-semibold text-accent-foreground">Уже есть оборудование?</h3>
        <p className="text-muted-foreground">Обслуживание и ремонт любой климатической техники</p>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
          Обслуживание и ремонт
        </Button>
      </div>
    </div>
  </section>
);

export default ServicesSection;

import { Button } from "@/components/ui/button";
import { Wrench, RefreshCw, Search, PenTool } from "lucide-react";
import { useChat } from "@/components/ChatContext";

const services = [
  { icon: Wrench, title: "Установка кондиционеров", text: "Монтаж под ключ с гарантией и запуском" },
  { icon: RefreshCw, title: "Обслуживание кондиционеров", text: "Чистка и поддержание эффективной работы" },
  { icon: Search, title: "Диагностика и ремонт", text: "Выезд мастера и точное определение неисправности" },
  { icon: PenTool, title: "Проектирование по вашему ТЗ", text: "Решения для квартир, домов и коммерческих помещений", extra: "Подбор и расчёт оборудования" },
];

const ServicesSection = () => {
  const { openChat } = useChat();
  return (
  <section id="services" className="py-14">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8">Услуги</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s) => (
          <div key={s.title} className="bg-card rounded-xl p-6 shadow-card border border-border text-center flex flex-col h-full">
            <div className="w-16 h-16 mx-auto rounded-xl icon-box flex items-center justify-center mb-4">
              <s.icon className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{s.text}</p>
            {s.extra && <p className="text-xs text-muted-foreground mb-2">{s.extra}</p>}
            <div className="mt-auto pt-4">
              <Button className="btn-gradient text-primary-foreground w-full" onClick={() => openChat(`Интересует ${s.title.toLowerCase()}`)}>Оставить заявку</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;

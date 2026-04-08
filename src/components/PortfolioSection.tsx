import { Button } from "@/components/ui/button";
import workApartment from "@/assets/work-apartment.jpg";
import workOffice from "@/assets/work-office.jpg";
import workHouse from "@/assets/work-house.jpg";
import workRestaurant from "@/assets/work-restaurant.jpg";

const works = [
  {
    image: workApartment,
    title: "Квартира 60 м², Санкт-Петербург",
    description: "Установка кондиционера с аккуратной прокладкой трассы",
  },
  {
    image: workOffice,
    title: "Офис 200 м², Василеостровский р-н",
    description: "Монтаж кассетной системы кондиционирования на 4 зоны",
  },
  {
    image: workHouse,
    title: "Частный дом 120 м², Всеволожск",
    description: "Установка наружного блока мульти-сплит системы с разводкой на 3 комнаты",
  },
  {
    image: workRestaurant,
    title: "Ресторан 150 м², Петроградская",
    description: "Проектирование и монтаж канальной вентиляции с климат-контролем",
  },
];

const PortfolioSection = () => (
  <section className="py-20 bg-muted/50">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
        Примеры наших работ
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {works.map((w) => (
          <div
            key={w.title}
            className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border"
          >
            <img
              src={w.image}
              alt={w.title}
              width={800}
              height={608}
              loading="lazy"
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="font-semibold text-foreground text-sm">{w.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{w.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 px-8">
          Смотреть ещё работы
        </Button>
      </div>
    </div>
  </section>
);

export default PortfolioSection;

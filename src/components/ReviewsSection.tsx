import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  { name: "Анна К.", text: "Помогли выбрать кондиционер для квартиры. Всё объяснили, установили за день!", rating: 5 },
  { name: "Дмитрий В.", text: "Быстрая установка и очень аккуратная работа. Рекомендую!", rating: 5 },
  { name: "Елена М.", text: "Спасибо за комфорт в жару! Подобрали тихую модель — спим отлично.", rating: 5 },
];

const ReviewsSection = () => (
  <section className="py-14 bg-muted/50">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
        Отзывы наших клиентов
      </h2>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {reviews.map((r) => (
          <div key={r.name} className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
            <div className="flex gap-0.5">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-violet text-violet" />
              ))}
            </div>
            <p className="text-foreground leading-relaxed">«{r.text}»</p>
            <p className="text-sm font-semibold text-muted-foreground">{r.name}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
          Смотреть все отзывы на Яндекс
        </Button>
      </div>
    </div>
  </section>
);

export default ReviewsSection;

import { MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const GeographySection = () => {
  return (
    <section id="geography" className="py-16 md:py-24">
      <div className="container space-y-8">
        <ScrollReveal>
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-accent flex items-center justify-center">
              <MapPin className="w-7 h-7 text-accent-foreground" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Зона обслуживания
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Работаем по всему Санкт-Петербургу и Ленинградской области — выезд на замер, доставка и монтаж
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="relative mx-auto max-w-3xl rounded-2xl overflow-hidden shadow-xl border border-border">
            <div className="relative w-full h-[400px] md:h-[500px]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=30.3159,59.9398&z=9&l=map"
                className="w-full h-full dark:invert dark:hue-rotate-180 dark:brightness-95"
                frameBorder="0"
                allowFullScreen
                title="Карта зоны обслуживания — Санкт-Петербург и Ленинградская область"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GeographySection;

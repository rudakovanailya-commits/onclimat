import { MapPin } from "lucide-react";

const GeographySection = () => (
  <section className="py-12">
    <div className="container text-center space-y-4">
      <div className="w-14 h-14 mx-auto rounded-full bg-accent flex items-center justify-center">
        <MapPin className="w-7 h-7 text-violet" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
        Работаем в Санкт-Петербурге и Ленинградской области
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        Выезд на замер, доставка и монтаж по всему региону
      </p>
    </div>
  </section>
);

export default GeographySection;

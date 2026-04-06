import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-comfort.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden">
      <img
        src={heroImage}
        alt="Комфортная комната с кондиционером"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 gradient-hero" />
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-2xl space-y-6">
          <div className="space-y-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20">
              <span className="text-sm font-medium text-primary-foreground">Более 20 лет помогаем создавать комфорт у&nbsp;вас дома</span>
            </div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15">
              <span className="text-xs font-medium text-primary-foreground/70">Подбираем и устанавливаем оборудование в&nbsp;Санкт-Петербурге и&nbsp;Ленинградской области</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight">
            Чтобы дома было комфортно в&nbsp;любую погоду
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg">
            Подберем и установим климатическое оборудование под ваши задачи — с учетом площади и бюджета
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              size="lg"
              onClick={() => scrollTo("#selection")}
              className="bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 shadow-button text-base px-8"
            >
              Подбор за 2 минуты
            </Button>
            <Button
              size="lg"
              onClick={() => scrollTo("#catalog")}
              className="bg-primary-foreground/20 backdrop-blur-sm border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/30 text-base px-8"
            >
              Перейти в каталог
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

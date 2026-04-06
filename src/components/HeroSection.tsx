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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight">
            Чтобы дома было комфортно в&nbsp;любую погоду
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl leading-relaxed">
            Более 20 лет помогаем создавать комфорт у&nbsp;вас дома — подбираем и&nbsp;устанавливаем оборудование в&nbsp;Санкт-Петербурге и&nbsp;Ленинградской области
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <p className="text-sm md:text-base text-primary-foreground/70 italic">
              А какой кондиционер подойдёт именно вам?
            </p>
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

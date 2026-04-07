import { Button } from "@/components/ui/button";
import TextType from "@/components/TextType";
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
          <div className="space-y-3">
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl leading-relaxed font-medium">
              Более 20 лет помогаем создавать комфорт<br /> у&nbsp;вас дома в&nbsp;Санкт-Петербурге и&nbsp;Ленинградской области
            </p>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-xl leading-relaxed font-medium italic">
              <TextType
                text="Подберём и установим климатическое оборудование под ваши запросы"
                typingSpeed={50}
                showCursor
                cursorCharacter="_"
                loop={false}
                initialDelay={800}
                startOnVisible
              />
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <p className="text-sm md:text-base text-primary-foreground/70 italic">
              А какой кондиционер подойдёт именно вам?
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollTo("#selection")}
                className="bg-primary-foreground text-primary font-bold hover:bg-primary-foreground/90 shadow-button text-lg md:text-xl px-10 md:px-14 py-5 md:py-6 h-auto rounded-xl"
              >
                Подбор за 2 минуты
              </Button>
              <Button
                size="lg"
                onClick={() => scrollTo("#catalog")}
                className="bg-primary-foreground/20 backdrop-blur-sm border-[3px] border-primary-foreground text-primary-foreground font-bold hover:bg-primary-foreground/35 text-lg md:text-xl px-10 md:px-14 py-5 md:py-6 h-auto rounded-xl"
              >
                Перейти в каталог
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { Button } from "@/components/ui/button";
import TextType from "@/components/TextType";
import DecryptedText from "@/components/DecryptedText";
import heroImage from "@/assets/hero-comfort.jpg";

import { useState } from "react";

const HeroSection = () => {
  const [typingDone, setTypingDone] = useState(false);
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
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight">
              Чтобы дома было комфортно в&nbsp;любую погоду
            </h1>
            <div className="space-y-3 mt-6">
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
                  onComplete={() => setTimeout(() => setTypingDone(true), 3000)}
                />
              </p>
            </div>
          </div>
          <div className="space-y-3 pt-8 max-w-4xl">
            <p className="text-base md:text-lg text-primary-foreground/80 font-bold">
              <DecryptedText
                text="А какой кондиционер подойдёт именно вам?"
                speed={40}
                maxIterations={15}
                sequential
                revealDirection="start"
                parentClassName="font-bold"
                startAnimation={typingDone}
              />
            </p>
            <div className="flex gap-6 w-full">
              <Button
                size="lg"
                onClick={() => scrollTo("#selection")}
                className="flex-1 bg-primary-foreground text-primary font-bold hover:bg-primary-foreground/90 shadow-button text-lg md:text-2xl py-6 md:py-7 h-auto rounded-xl"
              >
                Подбор за 2 минуты
              </Button>
              <Button
                size="lg"
                onClick={() => scrollTo("#catalog")}
                className="flex-1 bg-primary-foreground/20 backdrop-blur-sm border-[3px] border-primary-foreground text-primary-foreground font-bold hover:bg-primary-foreground/35 text-lg md:text-2xl py-6 md:py-7 h-auto rounded-xl"
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

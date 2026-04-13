import { Button } from "@/components/ui/button";
import TextType from "@/components/TextType";
import DecryptedText from "@/components/DecryptedText";
import heroImage from "@/assets/hero-comfort.jpg";
import { useChat } from "@/components/ChatContext";

import { useState, useEffect, useRef } from "react";

const HeroSection = () => {
  const [typingDone, setTypingDone] = useState(false);
  const { openChat } = useChat();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
      <img
        src={heroImage}
        alt="Комфортная комната с кондиционером"
        width={1920}
        height={1080}
        className="absolute inset-x-0 bottom-0 h-[123%] w-full object-cover object-[50%_82%] will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
      />
      <div className="absolute inset-0 gradient-hero" />
      <div className="container relative z-10 py-14 md:py-24">
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight">
              Чтобы дома было комфортно
              <br />
              в&nbsp;любую погоду
            </h1>
            <div className="space-y-3 mt-6">
              <p className="text-lg md:text-2xl text-primary-foreground/90 max-w-2xl leading-relaxed font-medium">
                Более 20 лет помогаем создавать комфорт<br /> у&nbsp;вас дома в&nbsp;Санкт-Петербурге и&nbsp;Ленинградской области
              </p>
              <p className="text-lg md:text-2xl text-primary-foreground/90 max-w-xl leading-relaxed font-medium italic">
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
          <div className="space-y-3 pt-6 max-w-4xl">
            <p className="text-base md:text-lg text-[hsl(45,100%,60%)] font-bold">
              <DecryptedText
                text="А какой кондиционер подойдёт именно вам?"
                speed={80}
                maxIterations={25}
                sequential
                revealDirection="start"
                parentClassName="font-bold"
                startAnimation={typingDone}
              />
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full">
              <Button
                size="lg"
                onClick={() => openChat("Помогите подобрать оборудование")}
                className="w-full sm:flex-1 bg-primary-foreground text-primary font-bold hover:bg-primary-foreground/90 shadow-button text-base md:text-2xl py-6 md:py-7 h-auto rounded-xl"
              >
                Подбор за 2 минуты
              </Button>
              <Button
                size="lg"
                onClick={() => document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:flex-1 bg-primary-foreground/20 backdrop-blur-sm border-[3px] border-primary-foreground text-primary-foreground font-bold hover:bg-primary-foreground/35 text-base md:text-2xl py-6 md:py-7 h-auto rounded-xl"
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

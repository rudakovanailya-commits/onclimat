import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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

const PortfolioSection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + works.length) % works.length : null));
  }, []);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % works.length : null));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, prev, next]);

  const current = lightboxIndex !== null ? works[lightboxIndex] : null;

  return (
    <section className="py-14">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8">
          Примеры наших работ
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.map((w, i) => (
            <div
              key={w.title}
              className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border cursor-pointer group"
              onClick={() => open(i)}
            >
              <div className="overflow-hidden">
                <img
                  src={w.image}
                  alt={w.title}
                  width={800}
                  height={608}
                  loading="lazy"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-semibold text-foreground text-sm">{w.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 px-8">
            Смотреть ещё работы
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image + caption */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl max-h-[85vh] mx-4 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.image}
                alt={current.title}
                className="max-h-[70vh] w-auto rounded-lg object-contain"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white font-semibold text-lg">{current.title}</h3>
                <p className="text-white/70 text-sm mt-1">{current.description}</p>
                <p className="text-white/40 text-xs mt-2">
                  {lightboxIndex! + 1} / {works.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;

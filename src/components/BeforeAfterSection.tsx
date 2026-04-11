import { useRef, useState, useCallback, useEffect } from "react";
import beforeImg from "@/assets/before-ac.jpg";
import afterImg from "@/assets/after-ac.jpg";

const BeforeAfterSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setPosition((x / rect.width) * 100);
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prevent = (e: TouchEvent) => {
      if (isDragging) e.preventDefault();
    };
    el.addEventListener("touchmove", prevent, { passive: false });
    return () => el.removeEventListener("touchmove", prevent);
  }, [isDragging]);

  return (
    <section className="py-14">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-3">
          До и после установки
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          Перетащите ползунок, чтобы увидеть разницу
        </p>

        <div
          ref={containerRef}
          className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-card select-none cursor-col-resize aspect-video border border-border"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* After (full background) */}
          <img
            src={afterImg}
            alt="После установки кондиционера"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            loading="lazy"
            width={1280}
            height={720}
          />

          {/* Before (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <img
              src={beforeImg}
              alt="До установки кондиционера"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: containerRef.current?.offsetWidth || "100%", maxWidth: "none" }}
              draggable={false}
              loading="lazy"
              width={1280}
              height={720}
            />
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          />

          {/* Handle */}
          <div
            className="absolute top-1/2 z-20 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-primary"
            style={{ left: `${position}%` }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary">
              <path d="M7 4L3 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 4L17 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-foreground/70 text-background text-xs font-semibold px-3 py-1 rounded-full z-10">
            До
          </div>
          <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full z-10">
            После
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;

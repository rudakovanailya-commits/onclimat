import { useState } from "react";
import { MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface District {
  id: string;
  name: string;
  d: string;
}

/* Simplified SVG paths representing districts of Saint Petersburg & Leningrad Oblast.
   The viewBox is an abstract artistic map — not geographically precise. */
const spbDistricts: District[] = [
  { id: "central", name: "Центральный", d: "M245,215 L265,205 280,215 285,235 270,250 250,245 240,230Z" },
  { id: "admiralteysky", name: "Адмиралтейский", d: "M230,245 L250,245 270,250 265,270 240,275 225,260Z" },
  { id: "vasileostrovsky", name: "Василеостровский", d: "M195,210 L220,200 240,215 240,230 225,260 205,255 190,235Z" },
  { id: "petrogradsky", name: "Петроградский", d: "M230,180 L255,175 265,190 265,205 245,215 230,210 220,195Z" },
  { id: "vyborgsky", name: "Выборгский", d: "M250,130 L290,120 310,145 305,175 280,190 265,190 255,175 240,160Z" },
  { id: "kalininsky", name: "Калининский", d: "M290,140 L320,130 340,155 335,185 310,195 290,185 280,165Z" },
  { id: "krasnogvardeysky", name: "Красногвардейский", d: "M310,175 L335,165 355,185 350,215 325,225 305,215 295,195Z" },
  { id: "nevsky", name: "Невский", d: "M285,235 L305,225 330,235 340,265 320,285 290,280 275,260Z" },
  { id: "frunzensky", name: "Фрунзенский", d: "M265,270 L290,280 310,295 295,320 265,315 250,295Z" },
  { id: "moskovsky", name: "Московский", d: "M230,275 L265,270 265,315 255,340 230,340 215,310Z" },
  { id: "kirovsky", name: "Кировский", d: "M190,260 L225,260 230,275 215,310 195,310 175,285Z" },
  { id: "krasnoselsky", name: "Красносельский", d: "M140,280 L175,270 195,310 185,340 155,345 130,315Z" },
  { id: "primorsky", name: "Приморский", d: "M170,140 L220,130 240,160 230,180 220,195 195,210 175,195 155,170Z" },
  { id: "pushkinsky", name: "Пушкинский", d: "M215,340 L255,340 270,370 250,400 215,395 200,365Z" },
  { id: "kolpinsky", name: "Колпинский", d: "M270,340 L310,330 330,360 315,395 280,400 260,370Z" },
  { id: "kronshtadtsky", name: "Кронштадтский", d: "M110,175 L145,165 155,185 145,205 115,210 100,195Z" },
  { id: "petrodvortsovy", name: "Петродворцовый", d: "M100,240 L135,230 150,260 140,280 110,290 90,270Z" },
  { id: "kurortny", name: "Курортный", d: "M110,120 L150,110 165,135 155,160 125,165 105,145Z" },
];

const loDistricts: District[] = [
  { id: "lo-north", name: "Север ЛО", d: "M150,40 L250,25 310,50 305,110 250,130 190,125 140,100Z" },
  { id: "lo-east", name: "Восток ЛО", d: "M340,80 L410,100 420,180 390,250 350,215 340,155 320,130Z" },
  { id: "lo-southeast", name: "Юго-Восток ЛО", d: "M340,265 L390,260 420,320 400,390 350,400 320,360 315,310Z" },
  { id: "lo-south", name: "Юг ЛО", d: "M200,400 L280,400 320,430 300,470 230,475 195,440Z" },
  { id: "lo-southwest", name: "Юго-Запад ЛО", d: "M80,310 L130,315 160,350 150,400 110,410 70,380Z" },
  { id: "lo-west", name: "Запад ЛО", d: "M50,170 L100,150 110,200 100,260 70,290 40,260Z" },
  { id: "lo-northwest", name: "Северо-Запад ЛО", d: "M60,80 L120,55 150,95 130,140 90,155 50,135Z" },
];

const GeographySection = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);

  const handleMouse = (d: District, e: React.MouseEvent<SVGPathElement>) => {
    const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top - 12;
    setHovered(d.id);
    setTooltip({ name: d.name, x, y });
  };

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
          <div className="relative mx-auto max-w-2xl">
            {/* Tooltip */}
            {tooltip && (
              <div
                className="pointer-events-none absolute z-20 rounded-lg bg-card/95 border border-border px-3 py-1.5 text-sm font-medium text-foreground shadow-lg backdrop-blur-sm transition-opacity"
                style={{
                  left: tooltip.x,
                  top: tooltip.y,
                  transform: "translate(-50%, -100%)",
                }}
              >
                {tooltip.name}
              </div>
            )}

            <svg
              viewBox="0 50 470 440"
              className="w-full h-auto"
              onMouseLeave={() => { setHovered(null); setTooltip(null); }}
            >
              {/* Glow filter */}
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="mapBg" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="hsl(var(--primary) / 0.08)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Background glow */}
              <ellipse cx="235" cy="260" rx="220" ry="200" fill="url(#mapBg)" />

              {/* Leningrad Oblast — outer ring */}
              {loDistricts.map((d) => (
                <path
                  key={d.id}
                  d={d.d}
                  className="transition-all duration-300 cursor-pointer"
                  fill={hovered === d.id ? "hsl(var(--primary) / 0.45)" : "hsl(var(--primary) / 0.2)"}
                  stroke={hovered === d.id ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.4)"}
                  strokeWidth={hovered === d.id ? 2 : 1}
                  filter={hovered === d.id ? "url(#glow)" : undefined}
                  onMouseMove={(e) => handleMouse(d, e)}
                  onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                />
              ))}

              {/* SPb districts — inner */}
              {spbDistricts.map((d) => (
                <path
                  key={d.id}
                  d={d.d}
                  className="transition-all duration-300 cursor-pointer"
                  fill={hovered === d.id ? "hsl(var(--primary) / 0.65)" : "hsl(var(--primary) / 0.4)"}
                  stroke={hovered === d.id ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.7)"}
                  strokeWidth={hovered === d.id ? 2.5 : 1.5}
                  filter={hovered === d.id ? "url(#glow)" : undefined}
                  onMouseMove={(e) => handleMouse(d, e)}
                  onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                />
              ))}

              {/* SPb label */}
              <text
                x="260"
                y="250"
                textAnchor="middle"
                className="fill-foreground text-[11px] font-bold pointer-events-none select-none"
              >
                СПб
              </text>
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "hsl(var(--primary) / 0.4)" }} />
                Санкт-Петербург
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "hsl(var(--primary) / 0.2)" }} />
                Ленинградская область
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GeographySection;

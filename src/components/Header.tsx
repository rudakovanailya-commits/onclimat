import { useState } from "react";
import { Phone, MapPin, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "@/components/ChatContext";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo-onklimat.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openChat } = useChat();

  const navItems = [
    { label: "Главная", href: "#hero" },
    { label: "Каталог", href: "#catalog" },
    { label: "Услуги", href: "#services" },
    { label: "Подбор", href: "#selection" },
    { label: "Статьи", href: "#articles" },
    { label: "Контакты", href: "#contacts" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-18">
        <a href="#hero" className="flex items-center shrink-0">
          <img src={logo} alt="Фирменный знак On Климат" className="h-10 md:h-12 w-auto object-contain dark:brightness-[3] dark:saturate-[1.5]" />
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span>СПб и ЛО</span>
          </div>
          <a href="tel:+78001234567" className="flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            8 (800) 123-45-67
          </a>
          <Button
            onClick={() => openChat("Помогите подобрать оборудование")}
            size="sm"
            className="btn-gradient text-primary-foreground"
          >
            Подбор за 2 минуты
          </Button>
          <Button
            onClick={() => openChat()}
            size="sm"
            variant="outline"
            className="gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Задать вопрос
          </Button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-foreground">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border px-4 pb-4">
          <nav className="flex flex-col gap-3 py-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="text-left text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3 py-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" /> СПб и ЛО
          </div>
          <a href="tel:+78001234567" className="flex items-center gap-2 py-2 text-sm font-semibold">
            <Phone className="w-4 h-4" /> 8 (800) 123-45-67
          </a>
          <div className="flex items-center gap-2 mt-2">
            <ThemeToggle />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <Button
              onClick={() => { setMobileOpen(false); openChat("Помогите подобрать оборудование"); }}
              className="w-full btn-gradient text-primary-foreground"
            >
              Подбор за 2 минуты
            </Button>
            <Button
              onClick={() => { setMobileOpen(false); openChat(); }}
              variant="outline"
              className="w-full gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              Задать вопрос
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

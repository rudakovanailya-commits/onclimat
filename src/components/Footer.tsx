import { Phone, MapPin, Mail } from "lucide-react";
import logo from "@/assets/logo-onklimat.png";

const Footer = () => (
  <footer id="contacts" className="bg-foreground text-primary-foreground py-14">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <img src={logo} alt="Фирменный знак On Климат" className="h-12 md:h-14 w-auto object-contain" loading="lazy" />
          <p className="text-sm text-primary-foreground/60">
            Подбор и установка климатического оборудования с 2005 года
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold mb-4">Контакты</h4>
          <a href="tel:+78001234567" className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <Phone className="w-4 h-4" /> 8 (800) 123-45-67
          </a>
          <a href="mailto:info@onclimat.ru" className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <Mail className="w-4 h-4" /> info@onclimat.ru
          </a>
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
            <MapPin className="w-4 h-4" /> Санкт-Петербург и ЛО
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold mb-4">Информация</h4>
          <a href="#" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            Политика конфиденциальности
          </a>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-8 pt-5 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} On Климат. Все права защищены.
      </div>
    </div>
  </footer>
);

export default Footer;

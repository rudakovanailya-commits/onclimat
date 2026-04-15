import { Phone, MapPin, Mail } from "lucide-react";
import logo from "@/assets/logo-onklimat.png";

const Footer = () => (
  <footer id="contacts" className="bg-[hsl(222,47%,11%)] text-white py-14">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <img src={logo} alt="Фирменный знак On Климат" className="h-12 md:h-14 w-auto object-contain brightness-0 invert" loading="lazy" />
          <p className="text-sm text-white/60">
            Подбор и установка климатического оборудования с 2005 года
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold mb-4">Контакты</h4>
          <a href="tel:+78001234567" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
            <Phone className="w-4 h-4" /> 8 (800) 123-45-67
          </a>
          <a href="mailto:info@onclimat.ru" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
            <Mail className="w-4 h-4" /> info@onclimat.ru
          </a>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <MapPin className="w-4 h-4" /> Санкт-Петербург и ЛО
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold mb-4">Информация</h4>
          <a href="#" className="block text-sm text-white/80 hover:text-white transition-colors">
            Политика конфиденциальности
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 mt-8 pt-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} On Климат. Все права защищены.
      </div>
    </div>
  </footer>
);

export default Footer;

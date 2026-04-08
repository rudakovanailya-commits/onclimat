
-- ==========================================
-- 1. User roles (admin access control)
-- ==========================================
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ==========================================
-- 2. Timestamp trigger function
-- ==========================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ==========================================
-- 3. Services
-- ==========================================
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon_name TEXT NOT NULL DEFAULT 'Wrench',
  extra TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admin insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update services" ON public.services FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete services" ON public.services FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- 4. Catalog categories
-- ==========================================
CREATE TABLE public.catalog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Wind',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.catalog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read catalog_categories" ON public.catalog_categories FOR SELECT USING (true);
CREATE POLICY "Admin insert catalog_categories" ON public.catalog_categories FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update catalog_categories" ON public.catalog_categories FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete catalog_categories" ON public.catalog_categories FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_catalog_categories_updated_at BEFORE UPDATE ON public.catalog_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- 5. Catalog products
-- ==========================================
CREATE TABLE public.catalog_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.catalog_categories(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  area TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.catalog_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read catalog_products" ON public.catalog_products FOR SELECT USING (true);
CREATE POLICY "Admin insert catalog_products" ON public.catalog_products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update catalog_products" ON public.catalog_products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete catalog_products" ON public.catalog_products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_catalog_products_updated_at BEFORE UPDATE ON public.catalog_products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- 6. Portfolio items
-- ==========================================
CREATE TABLE public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read portfolio_items" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Admin insert portfolio_items" ON public.portfolio_items FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update portfolio_items" ON public.portfolio_items FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete portfolio_items" ON public.portfolio_items FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_portfolio_items_updated_at BEFORE UPDATE ON public.portfolio_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- 7. Articles
-- ==========================================
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Admin insert articles" ON public.articles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update articles" ON public.articles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete articles" ON public.articles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- 8. Promos
-- ==========================================
CREATE TABLE public.promos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon_name TEXT NOT NULL DEFAULT 'Percent',
  sort_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read promos" ON public.promos FOR SELECT USING (true);
CREATE POLICY "Admin insert promos" ON public.promos FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update promos" ON public.promos FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete promos" ON public.promos FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_promos_updated_at BEFORE UPDATE ON public.promos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- 9. Contacts (key-value)
-- ==========================================
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read contacts" ON public.contacts FOR SELECT USING (true);
CREATE POLICY "Admin insert contacts" ON public.contacts FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update contacts" ON public.contacts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete contacts" ON public.contacts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- 10. Submissions (form leads)
-- ==========================================
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  task TEXT,
  city TEXT,
  needs JSONB DEFAULT '[]'::jsonb,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit" ON public.submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read submissions" ON public.submissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update submissions" ON public.submissions FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete submissions" ON public.submissions FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ==========================================
-- 11. Section settings (visibility)
-- ==========================================
CREATE TABLE public.section_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  visible BOOLEAN NOT NULL DEFAULT true,
  title TEXT,
  subtitle TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.section_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read section_settings" ON public.section_settings FOR SELECT USING (true);
CREATE POLICY "Admin insert section_settings" ON public.section_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update section_settings" ON public.section_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete section_settings" ON public.section_settings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_section_settings_updated_at BEFORE UPDATE ON public.section_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- 12. Storage bucket for images
-- ==========================================
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

CREATE POLICY "Public read site images" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
CREATE POLICY "Admin upload site images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update site images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete site images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

-- ==========================================
-- 13. Seed default section settings
-- ==========================================
INSERT INTO public.section_settings (section_key, visible, title) VALUES
  ('hero', true, 'Героическая секция'),
  ('trust', true, 'Доверие'),
  ('how_we_work', true, 'Как мы работаем'),
  ('promos', true, 'Акции и предложения'),
  ('services', true, 'Услуги'),
  ('catalog', true, 'Каталог'),
  ('portfolio', true, 'Примеры работ'),
  ('reviews', true, 'Отзывы'),
  ('articles', true, 'Статьи'),
  ('geography', true, 'География'),
  ('cta', true, 'Призыв к действию'),
  ('selection', true, 'Форма заявки');

-- ==========================================
-- 14. Seed initial data from current hardcoded content
-- ==========================================

-- Services
INSERT INTO public.services (title, description, icon_name, extra, sort_order) VALUES
  ('Установка кондиционеров', 'Монтаж под ключ с гарантией и запуском', 'Wrench', NULL, 1),
  ('Обслуживание кондиционеров', 'Чистка и поддержание эффективной работы', 'RefreshCw', NULL, 2),
  ('Диагностика и ремонт', 'Выезд мастера и точное определение неисправности', 'Search', NULL, 3),
  ('Проектирование по вашему ТЗ', 'Решения для квартир, домов и коммерческих помещений', 'PenTool', 'Подбор и расчёт оборудования', 4);

-- Catalog categories
INSERT INTO public.catalog_categories (slug, label, icon_name, sort_order) VALUES
  ('cond', 'Кондиционеры', 'Wind', 1),
  ('vent', 'Вентиляция', 'Fan', 2),
  ('heat', 'Отопление', 'Flame', 3),
  ('parts', 'Комплектующие', 'Wrench', 4);

-- Promos
INSERT INTO public.promos (title, description, icon_name, sort_order) VALUES
  ('Бесплатная доставка', 'Доставим оборудование бесплатно — без скрытых доплат', 'Truck', 1),
  ('Скидка на монтаж', 'Скидка при установке нескольких кондиционеров — чем больше систем, тем выгоднее', 'Percent', 2),
  ('Рассрочка без переплат', 'Поможем оформить рассрочку через банк без переплат', 'Banknote', 3);

-- Contacts
INSERT INTO public.contacts (key, value, sort_order) VALUES
  ('phone', '8 (800) 123-45-67', 1),
  ('email', 'info@onclimat.ru', 2),
  ('address', 'Санкт-Петербург и ЛО', 3);

-- Articles
INSERT INTO public.articles (slug, title, excerpt, content) VALUES
  ('kogda-ustanavlivat-konditsioner', 'Когда устанавливать кондиционер — до или после ремонта?', 'Что важно учесть, чтобы не переделывать', 'Один из самых частых вопросов — на каком этапе ремонта лучше устанавливать кондиционер. Ответ прост: идеальный момент — до чистовой отделки.'),
  ('kak-vybrat-konditsioner', 'Как выбрать кондиционер для квартиры', 'На что обратить внимание при выборе', 'Выбор кондиционера — это не только про бренд и цену. Важно учитывать параметры помещения и ваши задачи.'),
  ('novinki-2025', 'Новинки и технологии 2025', 'Что действительно полезно, а что маркетинг', 'Каждый год производители представляют новые функции. Разбираемся, что из этого реально полезно.');

-- Portfolio items
INSERT INTO public.portfolio_items (title, description, sort_order) VALUES
  ('Квартира 60 м², Санкт-Петербург', 'Установка кондиционера с аккуратной прокладкой трассы', 1),
  ('Офис 200 м², Василеостровский р-н', 'Монтаж кассетной системы кондиционирования на 4 зоны', 2),
  ('Частный дом 120 м², Всеволожск', 'Установка наружного блока мульти-сплит системы с разводкой на 3 комнаты', 3),
  ('Ресторан 150 м², Петроградская', 'Проектирование и монтаж канальной вентиляции с климат-контролем', 4);

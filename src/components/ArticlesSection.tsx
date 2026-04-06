import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const articles = [
  { title: "Как выбрать кондиционер для квартиры", excerpt: "Разбираем ключевые параметры: мощность, уровень шума, энергоэффективность." },
  { title: "5 ошибок при установке кондиционера", excerpt: "Частые ошибки, которые приводят к поломкам и потере гарантии." },
  { title: "Сравнение моделей 2024–2025", excerpt: "Обзор популярных моделей: Haier, Daikin, Mitsubishi и другие." },
];

const ArticlesSection = () => (
  <section id="articles" className="py-20 bg-background">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
        Полезные советы и подбор оборудования
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((a) => (
          <div key={a.title} className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4 flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">{a.title}</h3>
            <p className="text-sm text-muted-foreground flex-1">{a.excerpt}</p>
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5 self-start">
              Получить подбор
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ArticlesSection;

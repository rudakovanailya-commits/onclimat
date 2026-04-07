import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const articles = [
  { title: "Когда устанавливать кондиционер — до или после ремонта?", excerpt: "Что важно учесть, чтобы не переделывать" },
  { title: "Как выбрать кондиционер для квартиры", excerpt: "На что обратить внимание при выборе" },
  { title: "Новинки и технологии 2025", excerpt: "Что действительно полезно, а что маркетинг" },
];

const ArticlesSection = () => (
  <section id="articles" className="py-14 bg-background">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
        Что важно знать перед установкой
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((a) => (
          <div key={a.title} className="bg-card rounded-xl p-6 shadow-card border border-border flex flex-col h-full">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{a.title}</h3>
            <p className="text-sm text-muted-foreground flex-1">{a.excerpt}</p>
            <div className="mt-auto pt-4">
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5">
                Подробнее
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center bg-card rounded-xl p-8 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-2">Не хотите разбираться сами?</h3>
        <p className="text-muted-foreground mb-4">Поможем выбрать и предложим подходящее решение</p>
        <Button className="gradient-primary text-primary-foreground shadow-button">Оставить заявку</Button>
      </div>
    </div>
  </section>
);

export default ArticlesSection;

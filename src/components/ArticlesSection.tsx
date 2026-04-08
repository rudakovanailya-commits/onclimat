import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { articles } from "@/data/articles";

const ArticlesSection = () => (
  <section id="articles" className="py-20">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
        Что важно знать перед установкой
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((a) => (
          <div key={a.slug} className="bg-card rounded-xl p-6 shadow-card border border-border flex flex-col h-full">
            <div className="w-12 h-12 rounded-lg icon-box flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{a.title}</h3>
            <p className="text-sm text-muted-foreground flex-1">{a.excerpt}</p>
            <div className="mt-auto pt-4">
              <Link to={`/articles/${a.slug}`}>
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5">
                  Подробнее
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default ArticlesSection;

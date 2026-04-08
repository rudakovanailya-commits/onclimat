import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { articles } from "@/data/articles";
import { useChat } from "@/components/ChatContext";
import ChatWidget from "@/components/ChatWidget";
import NotFound from "./NotFound";

const ArticlePage = () => {
  const { slug } = useParams();
  const { openChat } = useChat();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-10">
        <Link to="/#articles" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{article.title}</h1>

        <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line leading-relaxed">
          {article.content}
        </div>

        <div className="mt-12 text-center bg-card rounded-xl p-8 shadow-card border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-2">Не уверены, как лучше сделать?</h3>
          <p className="text-muted-foreground mb-4">Поможем и подскажем под вашу ситуацию</p>
          <Button className="gradient-primary text-primary-foreground shadow-button" onClick={() => openChat()}>
            Оставить заявку
          </Button>
        </div>
      </div>
      <ChatWidget />
    </div>
  );
};

export default ArticlePage;

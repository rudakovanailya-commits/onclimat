import { Button } from "@/components/ui/button";
import { useChat } from "@/components/ChatContext";

const CtaSection = () => {
  const { openChat } = useChat();

  return (
    <section className="py-14">
      <div className="container">
        <div className="rounded-2xl gradient-primary p-8 md:p-12 text-center space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Подберём оборудование и установим под ключ
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto">
            Оставьте заявку — свяжемся в течение 15 минут
          </p>
          <Button
            size="lg"
            className="bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 shadow-button text-base px-10"
            onClick={() => openChat("Помогите подобрать оборудование")}
          >
            Получить подбор
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

import { Button } from "@/components/ui/button";

const CtaSection = () => (
  <section className="py-14">
    <div className="container">
      <div className="rounded-2xl gradient-primary p-10 md:p-16 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
          Подберём оборудование и установим под ключ
        </h2>
        <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto">
          Оставьте заявку — свяжемся в течение 15 минут
        </p>
        <Button
          size="lg"
          className="bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 shadow-button text-base px-10"
          onClick={() => document.querySelector("#selection")?.scrollIntoView({ behavior: "smooth" })}
        >
          Получить подбор
        </Button>
      </div>
    </div>
  </section>
);

export default CtaSection;

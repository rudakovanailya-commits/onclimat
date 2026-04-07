import { Button } from "@/components/ui/button";

const SelectionSection = () => (
  <section id="selection" className="py-20 bg-background">
    <div className="container max-w-3xl">
      <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Сложно выбрать кондиционер?<br />Поможем разобраться
        </h2>
        <p className="text-muted-foreground text-lg">
          Оставьте заявку — обсудим задачу и предложим подходящие варианты
        </p>
        <Button size="lg" className="gradient-primary text-primary-foreground shadow-button px-10">
          Оставить заявку
        </Button>
      </div>
    </div>
  </section>
);

export default SelectionSection;

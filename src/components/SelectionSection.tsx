import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const needOptions = [
  { id: "select", label: "Подбор оборудования" },
  { id: "know", label: "Уже знаю, что нужно" },
  { id: "service", label: "Нужна услуга" },
];

const SelectionSection = () => {
  const [needs, setNeeds] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [task, setTask] = useState("");
  const [city, setCity] = useState("");

  const toggleNeed = (id: string) => {
    setNeeds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Пожалуйста, заполните имя и телефон");
      return;
    }
    toast.success("Заявка отправлена! Свяжемся с вами в ближайшее время.");
    setNeeds([]);
    setName("");
    setPhone("");
    setTask("");
    setCity("");
  };

  return (
    <section id="selection" className="py-14 bg-background">
      <div className="container max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
            Оставить заявку
          </h2>

          <div className="space-y-3">
            <p className="font-medium text-foreground">Что вам нужно?</p>
            {needOptions.map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Checkbox
                  checked={needs.includes(opt.id)}
                  onCheckedChange={() => toggleNeed(opt.id)}
                />
                <span className="text-sm text-foreground">{opt.label}</span>
              </label>
            ))}
          </div>

          <div className="space-y-4">
            <Input
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
            />
            <Input
              placeholder="Телефон"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={20}
            />
            <Textarea
              placeholder="Опишите задачу"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              maxLength={1000}
              className="min-h-[100px]"
            />
            <Input
              placeholder="Город или район"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              maxLength={100}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full gradient-primary text-primary-foreground shadow-button"
          >
            Оставить заявку
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных
          </p>
        </form>
      </div>
    </section>
  );
};

export default SelectionSection;

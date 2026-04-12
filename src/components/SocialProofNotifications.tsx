import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const names = [
  "Иван", "Алексей", "Мария", "Дмитрий", "Елена", "Сергей",
  "Ольга", "Андрей", "Наталья", "Павел", "Анна", "Михаил",
];

const cities = [
  "Санкт-Петербурга", "Гатчины", "Пушкина", "Колпино",
  "Всеволожска", "Выборга", "Кронштадта", "Петергофа",
];

const actions = [
  "оставил заявку",
  "заказал установку кондиционера",
  "получил консультацию",
  "заказал обслуживание",
];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomMinutes(): number {
  return Math.floor(Math.random() * 25) + 1;
}

function generateNotification() {
  return {
    id: Date.now(),
    name: random(names),
    city: random(cities),
    action: random(actions),
    minutes: randomMinutes(),
  };
}

const SocialProofNotifications = () => {
  const [notification, setNotification] = useState<ReturnType<typeof generateNotification> | null>(null);

  const showNext = useCallback(() => {
    setNotification(generateNotification());
    setTimeout(() => setNotification(null), 4000);
  }, []);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      showNext();
    }, 8000);

    const interval = setInterval(() => {
      showNext();
    }, 15000 + Math.random() * 10000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [showNext]);

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-xs pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-card/95 backdrop-blur-md border border-border rounded-xl px-4 py-3 shadow-lg pointer-events-auto"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">
                  {notification.name[0]}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm text-foreground leading-snug">
                  <span className="font-semibold">{notification.name}</span>{" "}
                  из {notification.city}{" "}
                  <span className="text-muted-foreground">{notification.action}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {notification.minutes} мин. назад
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialProofNotifications;

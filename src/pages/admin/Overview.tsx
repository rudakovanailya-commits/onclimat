import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Inbox, FileText, ShoppingBag, Image } from "lucide-react";

const Overview = () => {
  const [stats, setStats] = useState({
    submissions: 0,
    unread: 0,
    articles: 0,
    products: 0,
    portfolio: 0,
  });

  useEffect(() => {
    const load = async () => {
      const [sub, unread, art, prod, port] = await Promise.all([
        supabase.from("submissions").select("id", { count: "exact", head: true }),
        supabase.from("submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
        supabase.from("articles").select("id", { count: "exact", head: true }),
        supabase.from("catalog_products").select("id", { count: "exact", head: true }),
        supabase.from("portfolio_items").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        submissions: sub.count ?? 0,
        unread: unread.count ?? 0,
        articles: art.count ?? 0,
        products: prod.count ?? 0,
        portfolio: port.count ?? 0,
      });
    };
    load();
  }, []);

  const cards = [
    { label: "Новых заявок", value: stats.unread, icon: Inbox, color: "text-red-500" },
    { label: "Всего заявок", value: stats.submissions, icon: Inbox, color: "text-primary" },
    { label: "Статей", value: stats.articles, icon: FileText, color: "text-primary" },
    { label: "Товаров", value: stats.products, icon: ShoppingBag, color: "text-primary" },
    { label: "Работ", value: stats.portfolio, icon: Image, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Обзор</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-card rounded-xl p-5 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <c.icon className={`w-5 h-5 ${c.color}`} />
              <span className="text-sm text-muted-foreground">{c.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;

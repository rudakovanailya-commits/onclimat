import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Submission = Tables<"submissions">;

const AdminSubmissions = () => {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const { data, error: err } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (err) throw err;
      setItems(data ?? []);
    } catch (e: any) {
      setError(e.message || "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    try {
      const { error: err } = await supabase.from("submissions").update({ is_read: true }).eq("id", id);
      if (err) throw err;
      toast.success("Отмечено как прочитанное");
      load();
    } catch (e: any) {
      toast.error(e.message || "Ошибка");
    }
  };

  const remove = async (id: string) => {
    try {
      const { error: err } = await supabase.from("submissions").delete().eq("id", id);
      if (err) throw err;
      toast.success("Заявка удалена");
      load();
    } catch (e: any) {
      toast.error(e.message || "Ошибка удаления");
    }
  };

  if (loading) return <p className="text-muted-foreground">Загрузка заявок...</p>;
  if (error) return <p className="text-destructive">Ошибка: {error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Заявки ({items.length})</h2>
      {items.length === 0 && <p className="text-muted-foreground">Заявок пока нет</p>}
      <div className="space-y-3">
        {items.map((s) => (
          <div key={s.id} className={`bg-card rounded-xl p-4 border shadow-sm ${s.is_read ? "border-border" : "border-primary/40"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-foreground">{s.name}</span>
                  <a href={`tel:${s.phone}`} className="text-sm text-primary hover:underline">{s.phone}</a>
                  {!s.is_read && <Badge variant="destructive" className="text-xs">Новая</Badge>}
                </div>
                {s.city && <p className="text-sm text-muted-foreground">📍 {s.city}</p>}
                {s.task && <p className="text-sm text-foreground/80">{s.task}</p>}
                {s.needs && Array.isArray(s.needs) && (s.needs as string[]).length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {(s.needs as string[]).map((n) => (
                      <Badge key={n} variant="secondary" className="text-xs">{n}</Badge>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {new Date(s.created_at).toLocaleString("ru-RU")}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                {!s.is_read && (
                  <Button variant="ghost" size="icon" onClick={() => markRead(s.id)} title="Прочитано">
                    <Check className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => remove(s.id)} title="Удалить">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSubmissions;

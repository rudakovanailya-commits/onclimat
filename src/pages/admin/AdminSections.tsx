import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type SectionSetting = Tables<"section_settings">;

const AdminSections = () => {
  const [items, setItems] = useState<SectionSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const { data, error: err } = await supabase.from("section_settings").select("*").order("created_at");
      if (err) throw err;
      setItems(data ?? []);
    } catch (e: any) {
      setError(e.message || "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggle = async (id: string, visible: boolean) => {
    try {
      const { error: err } = await supabase.from("section_settings").update({ visible }).eq("id", id);
      if (err) throw err;
      toast.success(visible ? "Секция показана" : "Секция скрыта");
      load();
    } catch (e: any) {
      toast.error(e.message || "Ошибка");
    }
  };

  if (loading) return <p className="text-muted-foreground">Загрузка секций...</p>;
  if (error) return <p className="text-destructive">Ошибка: {error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Управление секциями</h2>
      <div className="bg-card rounded-xl border border-border divide-y divide-border">
        {items.map((s) => (
          <div key={s.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-foreground">{s.title ?? s.section_key}</p>
              <p className="text-xs text-muted-foreground">{s.section_key}</p>
            </div>
            <Switch checked={s.visible} onCheckedChange={(v) => toggle(s.id, v)} />
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-sm p-4">Секций нет</p>}
      </div>
    </div>
  );
};

export default AdminSections;

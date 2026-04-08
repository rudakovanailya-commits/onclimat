import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save, X } from "lucide-react";
import { toast } from "sonner";

type Contact = Tables<"contacts">;

const AdminContacts = () => {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [value, setValue] = useState("");

  const load = async () => {
    try {
      setError("");
      const { data, error: err } = await supabase.from("contacts").select("*").order("sort_order");
      if (err) throw err;
      setItems(data ?? []);
    } catch (e: any) {
      setError(e.message || "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const startEdit = (c: Contact) => { setEditing(c.id); setValue(c.value); };
  const cancel = () => setEditing(null);

  const save = async (id: string) => {
    try {
      const { error: err } = await supabase.from("contacts").update({ value }).eq("id", id);
      if (err) throw err;
      toast.success("Контакт обновлён");
      cancel(); load();
    } catch (e: any) {
      toast.error(e.message || "Ошибка сохранения");
    }
  };

  const keyLabel: Record<string, string> = { phone: "Телефон", email: "Email", address: "Адрес" };

  if (loading) return <p className="text-muted-foreground">Загрузка контактов...</p>;
  if (error) return <p className="text-destructive">Ошибка: {error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Контакты</h2>
      <div className="bg-card rounded-xl border border-border divide-y divide-border">
        {items.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-4 gap-3">
            {editing === c.id ? (
              <div className="flex-1 flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground w-20">{keyLabel[c.key] ?? c.key}</span>
                <Input value={value} onChange={(e) => setValue(e.target.value)} className="flex-1" />
                <Button size="icon" variant="ghost" onClick={() => save(c.id)}><Save className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={cancel}><X className="w-4 h-4" /></Button>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{keyLabel[c.key] ?? c.key}</p>
                  <p className="text-foreground">{c.value}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => startEdit(c)}><Pencil className="w-4 h-4" /></Button>
              </>
            )}
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-sm p-4">Контактов нет</p>}
      </div>
    </div>
  );
};

export default AdminContacts;

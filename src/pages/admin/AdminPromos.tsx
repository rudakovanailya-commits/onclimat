import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";

type Promo = Tables<"promos">;

const empty = { title: "", description: "", icon_name: "Percent", sort_order: 0, visible: true };

const AdminPromos = () => {
  const [items, setItems] = useState<Promo[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [isNew, setIsNew] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("promos").select("*").order("sort_order");
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const startEdit = (p: Promo) => { setEditing(p.id); setForm({ title: p.title, description: p.description, icon_name: p.icon_name, sort_order: p.sort_order, visible: p.visible }); setIsNew(false); };
  const startNew = () => { setEditing("new"); setForm({ ...empty, sort_order: items.length + 1 }); setIsNew(true); };
  const cancel = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!form.title.trim()) { toast.error("Введите название"); return; }
    if (isNew) { await supabase.from("promos").insert(form); toast.success("Акция добавлена"); }
    else { await supabase.from("promos").update(form).eq("id", editing!); toast.success("Акция обновлена"); }
    cancel(); load();
  };

  const remove = async (id: string) => { await supabase.from("promos").delete().eq("id", id); toast.success("Удалено"); load(); };

  const renderForm = () => (
    <div className="space-y-3">
      <Input placeholder="Название" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <Textarea placeholder="Описание" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <Input placeholder="Иконка (Truck, Percent, Banknote)" value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })} />
      <div className="flex items-center gap-4">
        <Input type="number" placeholder="Порядок" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="w-24" />
        <label className="flex items-center gap-2 text-sm"><Switch checked={form.visible} onCheckedChange={(v) => setForm({ ...form, visible: v })} /> Видимая</label>
      </div>
      <div className="flex gap-2">
        <Button onClick={save} size="sm" className="gap-1"><Save className="w-4 h-4" /> Сохранить</Button>
        <Button onClick={cancel} size="sm" variant="ghost" className="gap-1"><X className="w-4 h-4" /> Отмена</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Акции</h2>
        <Button onClick={startNew} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Добавить</Button>
      </div>
      {editing === "new" && <div className="bg-card rounded-xl p-4 border border-primary/30">{renderForm()}</div>}
      <div className="space-y-2">
        {items.map((p) => (
          <div key={p.id} className="bg-card rounded-xl p-4 border border-border">
            {editing === p.id ? renderForm() : (
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{p.title}</span>
                    {!p.visible && <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">скрыта</span>}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{p.description}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => startEdit(p)}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPromos;

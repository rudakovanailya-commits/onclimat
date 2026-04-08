import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Save, X, Upload } from "lucide-react";
import { toast } from "sonner";

type PortfolioItem = Tables<"portfolio_items">;

const empty = { title: "", description: "", image_url: "", sort_order: 0, visible: true };

const AdminPortfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("portfolio_items").select("*").order("sort_order");
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const startEdit = (p: PortfolioItem) => { setEditing(p.id); setForm({ title: p.title, description: p.description, image_url: p.image_url ?? "", sort_order: p.sort_order, visible: p.visible }); setIsNew(false); };
  const startNew = () => { setEditing("new"); setForm({ ...empty, sort_order: items.length + 1 }); setIsNew(true); };
  const cancel = () => { setEditing(null); setIsNew(false); };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `portfolio/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("site-images").upload(path, file);
    if (error) { toast.error("Ошибка загрузки"); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("site-images").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: publicUrl }));
    setUploading(false);
    toast.success("Фото загружено");
  };

  const save = async () => {
    if (!form.title.trim()) { toast.error("Введите название"); return; }
    const payload = { title: form.title, description: form.description, image_url: form.image_url || null, sort_order: form.sort_order, visible: form.visible };
    if (isNew) { await supabase.from("portfolio_items").insert(payload); toast.success("Работа добавлена"); }
    else { await supabase.from("portfolio_items").update(payload).eq("id", editing!); toast.success("Работа обновлена"); }
    cancel(); load();
  };

  const remove = async (id: string) => { await supabase.from("portfolio_items").delete().eq("id", id); toast.success("Удалено"); load(); };

  const renderForm = () => (
    <div className="space-y-3">
      <Input placeholder="Название" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <Textarea placeholder="Описание" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Изображение</label>
        {form.image_url && <img src={form.image_url} alt="" className="w-32 h-20 object-cover rounded" />}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1 relative" disabled={uploading}>
            <Upload className="w-4 h-4" /> {uploading ? "Загрузка..." : "Загрузить фото"}
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
          </Button>
          <Input placeholder="Или URL изображения" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="flex-1" />
        </div>
      </div>
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
        <h2 className="text-xl font-bold text-foreground">Примеры работ</h2>
        <Button onClick={startNew} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Добавить</Button>
      </div>
      {editing === "new" && <div className="bg-card rounded-xl p-4 border border-primary/30">{renderForm()}</div>}
      <div className="space-y-2">
        {items.map((p) => (
          <div key={p.id} className="bg-card rounded-xl p-4 border border-border">
            {editing === p.id ? renderForm() : (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {p.image_url && <img src={p.image_url} alt="" className="w-16 h-12 object-cover rounded shrink-0" />}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{p.title}</span>
                      {!p.visible && <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">скрыта</span>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{p.description}</p>
                  </div>
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

export default AdminPortfolio;

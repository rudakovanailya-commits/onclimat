import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";

type Article = Tables<"articles">;

const emptyArticle = { slug: "", title: "", excerpt: "", content: "", visible: true };

const AdminArticles = () => {
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyArticle);
  const [isNew, setIsNew] = useState(false);

  const load = async () => {
    try {
      setError("");
      const { data, error: err } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
      if (err) throw err;
      setItems(data ?? []);
    } catch (e: any) {
      setError(e.message || "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const startEdit = (a: Article) => {
    setEditing(a.id);
    setForm({ slug: a.slug, title: a.title, excerpt: a.excerpt, content: a.content, visible: a.visible });
    setIsNew(false);
  };

  const startNew = () => { setEditing("new"); setForm(emptyArticle); setIsNew(true); };
  const cancel = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!form.title.trim() || !form.slug.trim()) { toast.error("Заполните название и slug"); return; }
    try {
      if (isNew) {
        const { error: err } = await supabase.from("articles").insert(form);
        if (err) throw err;
        toast.success("Статья добавлена");
      } else {
        const { error: err } = await supabase.from("articles").update(form).eq("id", editing!);
        if (err) throw err;
        toast.success("Статья обновлена");
      }
      cancel(); load();
    } catch (e: any) {
      toast.error(e.message || "Ошибка сохранения");
    }
  };

  const remove = async (id: string) => {
    try {
      const { error: err } = await supabase.from("articles").delete().eq("id", id);
      if (err) throw err;
      toast.success("Статья удалена"); load();
    } catch (e: any) {
      toast.error(e.message || "Ошибка удаления");
    }
  };

  if (loading) return <p className="text-muted-foreground">Загрузка статей...</p>;
  if (error) return <p className="text-destructive">Ошибка: {error}</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Статьи</h2>
        <Button onClick={startNew} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Добавить</Button>
      </div>

      {editing === "new" && (
        <div className="bg-card rounded-xl p-4 border border-primary/30 space-y-3">
          <Input placeholder="Название" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input placeholder="URL-slug (латиницей)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input placeholder="Краткое описание" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <Textarea placeholder="Содержание" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="min-h-[200px]" />
          <label className="flex items-center gap-2 text-sm"><Switch checked={form.visible} onCheckedChange={(v) => setForm({ ...form, visible: v })} /> Видимая</label>
          <div className="flex gap-2">
            <Button onClick={save} size="sm" className="gap-1"><Save className="w-4 h-4" /> Сохранить</Button>
            <Button onClick={cancel} size="sm" variant="ghost" className="gap-1"><X className="w-4 h-4" /> Отмена</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {items.map((a) => (
          <div key={a.id} className="bg-card rounded-xl p-4 border border-border">
            {editing === a.id ? (
              <div className="space-y-3">
                <Input placeholder="Название" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <Input placeholder="URL-slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                <Input placeholder="Краткое описание" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
                <Textarea placeholder="Содержание" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="min-h-[200px]" />
                <label className="flex items-center gap-2 text-sm"><Switch checked={form.visible} onCheckedChange={(v) => setForm({ ...form, visible: v })} /> Видимая</label>
                <div className="flex gap-2">
                  <Button onClick={save} size="sm" className="gap-1"><Save className="w-4 h-4" /> Сохранить</Button>
                  <Button onClick={cancel} size="sm" variant="ghost" className="gap-1"><X className="w-4 h-4" /> Отмена</Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{a.title}</span>
                    {!a.visible && <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">скрыта</span>}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{a.excerpt}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => startEdit(a)}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(a.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-sm">Статей пока нет</p>}
      </div>
    </div>
  );
};

export default AdminArticles;

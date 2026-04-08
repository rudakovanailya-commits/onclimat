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
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyArticle);
  const [isNew, setIsNew] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
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
    if (isNew) {
      await supabase.from("articles").insert(form);
      toast.success("Статья добавлена");
    } else {
      await supabase.from("articles").update(form).eq("id", editing!);
      toast.success("Статья обновлена");
    }
    cancel(); load();
  };

  const remove = async (id: string) => {
    await supabase.from("articles").delete().eq("id", id);
    toast.success("Статья удалена"); load();
  };

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
      </div>
    </div>
  );
};

export default AdminArticles;

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Save, X, Upload } from "lucide-react";
import { toast } from "sonner";

type Category = Tables<"catalog_categories">;
type Product = Tables<"catalog_products">;

const emptyProduct = { name: "", area: "", price: "", features: [] as string[], image_url: "", sort_order: 0, visible: true, category_id: "" };

const AdminCatalog = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCat, setActiveCat] = useState<string>("");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [featuresStr, setFeaturesStr] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState("");

  const loadCats = async () => {
    try {
      setError("");
      const { data, error: err } = await supabase.from("catalog_categories").select("*").order("sort_order");
      if (err) throw err;
      setCategories(data ?? []);
      if (data?.length && !activeCat) setActiveCat(data[0].id);
    } catch (e: any) {
      setError(e.message || "Ошибка загрузки категорий");
    } finally {
      setLoadingCats(false);
    }
  };

  const loadProducts = async () => {
    if (!activeCat) { setProducts([]); return; }
    try {
      setLoadingProducts(true);
      const { data, error: err } = await supabase.from("catalog_products").select("*").eq("category_id", activeCat).order("sort_order");
      if (err) throw err;
      setProducts(data ?? []);
    } catch (e: any) {
      toast.error(e.message || "Ошибка загрузки товаров");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => { loadCats(); }, []);
  useEffect(() => { loadProducts(); }, [activeCat]);

  const startEdit = (p: Product) => {
    setEditing(p.id);
    const feats = Array.isArray(p.features) ? (p.features as string[]) : [];
    setForm({ name: p.name, area: p.area, price: p.price, features: feats, image_url: p.image_url ?? "", sort_order: p.sort_order, visible: p.visible, category_id: p.category_id });
    setFeaturesStr(feats.join(", "));
    setIsNew(false);
  };

  const startNew = () => {
    setEditing("new");
    setForm({ ...emptyProduct, category_id: activeCat, sort_order: products.length + 1 });
    setFeaturesStr("");
    setIsNew(true);
  };

  const cancel = () => { setEditing(null); setIsNew(false); };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `catalog/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("site-images").upload(path, file);
    if (error) { toast.error("Ошибка загрузки"); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("site-images").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: publicUrl }));
    setUploading(false);
    toast.success("Фото загружено");
  };

  const save = async () => {
    if (!form.name.trim()) { toast.error("Введите название"); return; }
    try {
      const features = featuresStr.split(",").map((s) => s.trim()).filter(Boolean);
      const payload = { name: form.name, area: form.area, price: form.price, features: JSON.stringify(features), image_url: form.image_url || null, sort_order: form.sort_order, visible: form.visible, category_id: form.category_id };
      if (isNew) {
        const { error: err } = await supabase.from("catalog_products").insert(payload);
        if (err) throw err;
        toast.success("Товар добавлен");
      } else {
        const { error: err } = await supabase.from("catalog_products").update(payload).eq("id", editing!);
        if (err) throw err;
        toast.success("Товар обновлён");
      }
      cancel(); loadProducts();
    } catch (e: any) {
      toast.error(e.message || "Ошибка сохранения");
    }
  };

  const remove = async (id: string) => {
    try {
      const { error: err } = await supabase.from("catalog_products").delete().eq("id", id);
      if (err) throw err;
      toast.success("Удалено"); loadProducts();
    } catch (e: any) {
      toast.error(e.message || "Ошибка удаления");
    }
  };

  if (loadingCats) return <p className="text-muted-foreground">Загрузка каталога...</p>;
  if (error) return <p className="text-destructive">Ошибка: {error}</p>;

  const renderForm = () => (
    <div className="space-y-3">
      <Input placeholder="Название" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="Площадь (напр. до 20 м²)" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
        <Input placeholder="Цена (напр. от 28 000 ₽)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
      </div>
      <Input placeholder="Характеристики (через запятую)" value={featuresStr} onChange={(e) => setFeaturesStr(e.target.value)} />
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Изображение</label>
        {form.image_url && <img src={form.image_url} alt="" className="w-32 h-20 object-cover rounded" />}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1 relative" disabled={uploading}>
            <Upload className="w-4 h-4" /> {uploading ? "Загрузка..." : "Загрузить"}
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
          </Button>
          <Input placeholder="Или URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="flex-1" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Input type="number" placeholder="Порядок" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="w-24" />
        <label className="flex items-center gap-2 text-sm"><Switch checked={form.visible} onCheckedChange={(v) => setForm({ ...form, visible: v })} /> Видимый</label>
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
        <h2 className="text-xl font-bold text-foreground">Каталог</h2>
        <Button onClick={startNew} size="sm" className="gap-1" disabled={!activeCat}><Plus className="w-4 h-4" /> Добавить товар</Button>
      </div>

      {categories.length === 0 ? (
        <p className="text-muted-foreground text-sm">Нет категорий</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => { setActiveCat(c.id); cancel(); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                activeCat === c.id ? "btn-gradient text-primary-foreground border-transparent" : "bg-card text-foreground border-border hover:bg-accent"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {editing === "new" && <div className="bg-card rounded-xl p-4 border border-primary/30">{renderForm()}</div>}

      {loadingProducts ? (
        <p className="text-muted-foreground text-sm">Загрузка товаров...</p>
      ) : (
        <div className="space-y-2">
          {products.map((p) => (
            <div key={p.id} className="bg-card rounded-xl p-4 border border-border">
              {editing === p.id ? renderForm() : (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {p.image_url && <img src={p.image_url} alt="" className="w-16 h-12 object-cover rounded shrink-0" />}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{p.name}</span>
                        <span className="text-sm text-primary">{p.price}</span>
                        {!p.visible && <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">скрыт</span>}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{p.area}</p>
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
          {products.length === 0 && !loadingProducts && <p className="text-muted-foreground text-sm">Нет товаров в этой категории</p>}
        </div>
      )}
    </div>
  );
};

export default AdminCatalog;

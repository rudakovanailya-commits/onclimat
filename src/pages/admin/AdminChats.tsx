import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown, ChevronUp, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Conversation = {
  id: string;
  name: string | null;
  phone: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

type Message = {
  id: string;
  role: string;
  content: string;
  created_at: string;
};

const statusLabels: Record<string, string> = {
  active: "Активный",
  closed: "Закрыт",
  transferred: "Передан менеджеру",
};

const statusColors: Record<string, string> = {
  active: "text-green-600",
  closed: "text-muted-foreground",
  transferred: "text-yellow-600",
};

const AdminChats = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("chat_conversations")
        .select("*")
        .order("created_at", { ascending: false });
      if (err) throw err;
      setConversations(data || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);
    setLoadingMessages(true);
    try {
      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", id)
        .order("created_at", { ascending: true });
      setMessages(data || []);
    } catch {
      toast.error("Не удалось загрузить сообщения");
    } finally {
      setLoadingMessages(false);
    }
  };

  const remove = async (id: string) => {
    try {
      await supabase.from("chat_messages").delete().eq("conversation_id", id);
      await supabase.from("chat_conversations").delete().eq("id", id);
      toast.success("Чат удалён");
      load();
    } catch {
      toast.error("Ошибка удаления");
    }
  };

  const filtered = filter === "all" ? conversations : conversations.filter((c) => c.status === filter);

  if (loading) return <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" /> Загрузка чатов...</div>;
  if (error) return <p className="text-destructive">Ошибка: {error}</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {["all", "active", "transferred", "closed"].map((s) => (
          <Button
            key={s}
            size="sm"
            variant={filter === s ? "default" : "outline"}
            onClick={() => setFilter(s)}
          >
            {s === "all" ? "Все" : statusLabels[s]}
          </Button>
        ))}
      </div>

      {filtered.length === 0 && <p className="text-muted-foreground text-sm">Нет чатов</p>}

      <div className="space-y-2">
        {filtered.map((conv) => (
          <div key={conv.id} className="border border-border rounded-lg bg-card">
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => toggleExpand(conv.id)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <MessageCircle className="w-4 h-4 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {conv.name || "Без имени"}{conv.phone ? ` · ${conv.phone}` : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className={statusColors[conv.status]}>{statusLabels[conv.status] || conv.status}</span>
                    {" · "}
                    {new Date(conv.created_at).toLocaleString("ru-RU")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); remove(conv.id); }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
                {expandedId === conv.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {expandedId === conv.id && (
              <div className="border-t border-border px-4 py-3 space-y-2 max-h-80 overflow-y-auto">
                {loadingMessages ? (
                  <div className="flex items-center gap-2 text-muted-foreground text-sm"><Loader2 className="w-3 h-3 animate-spin" /> Загрузка...</div>
                ) : messages.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Нет сообщений</p>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className={`text-sm ${msg.role === "user" ? "text-foreground" : "text-muted-foreground"}`}>
                      <span className="font-medium">{msg.role === "user" ? "Пользователь" : "AI"}:</span>{" "}
                      {msg.content.length > 300 ? msg.content.slice(0, 300) + "..." : msg.content}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminChats;

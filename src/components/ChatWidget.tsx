import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "@/components/ChatContext";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const ChatWidget = () => {
  const { isOpen, openChat, closeChat, prefillMessage, clearPrefill } = useChat();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  // Handle prefill
  useEffect(() => {
    if (isOpen && prefillMessage && messages.length === 0 && !isLoading) {
      clearPrefill();
      send(prefillMessage);
    }
  }, [isOpen, prefillMessage]);

  const createConversation = async (): Promise<string> => {
    if (conversationId) return conversationId;
    const { data, error } = await supabase
      .from("chat_conversations")
      .insert({ status: "active" })
      .select("id")
      .single();
    if (error || !data) throw new Error("Failed to create conversation");
    setConversationId(data.id);
    return data.id;
  };

  const saveMessage = async (convId: string, role: string, content: string) => {
    await supabase.from("chat_messages").insert({ conversation_id: convId, role, content });
  };

  const parseSubmission = (text: string) => {
    const match = text.match(/\[ЗАЯВКА:\s*имя=(.+?),\s*телефон=(.+?),\s*задача=(.+?)\]/);
    if (match) {
      return { name: match[1].trim(), phone: match[2].trim(), task: match[3].trim() };
    }
    return null;
  };

  const parseTransfer = (text: string) => text.includes("[МЕНЕДЖЕР]");

  const send = useCallback(async (messageText?: string) => {
    const text = (messageText || input).trim();
    if (!text || isLoading) return;
    if (!messageText) setInput("");

    const userMsg: Msg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    let convId: string;
    try {
      convId = await createConversation();
      await saveMessage(convId, "user", text);
    } catch {
      toast.error("Не удалось создать чат");
      setIsLoading(false);
      return;
    }

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          conversation_id: convId,
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || "Ошибка сервера");
      }

      if (!resp.body) throw new Error("No stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsertAssistant(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Save assistant message
      if (assistantSoFar) {
        await saveMessage(convId, "assistant", assistantSoFar);

        // Check for submission
        const sub = parseSubmission(assistantSoFar);
        if (sub) {
          await supabase.from("submissions").insert({
            name: sub.name,
            phone: sub.phone,
            task: sub.task,
          });
          await supabase
            .from("chat_conversations")
            .update({ name: sub.name, phone: sub.phone, status: "closed" })
            .eq("id", convId);
        }

        // Check for transfer
        if (parseTransfer(assistantSoFar)) {
          await supabase
            .from("chat_conversations")
            .update({ status: "transferred" })
            .eq("id", convId);
        }
      }
    } catch (e: any) {
      toast.error(e.message || "Ошибка при отправке");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [input, messages, isLoading, conversationId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Clean display: remove [ЗАЯВКА:...] and [МЕНЕДЖЕР] tags from visible text
  const cleanContent = (text: string) =>
    text.replace(/\[ЗАЯВКА:[^\]]*\]/g, "").replace(/\[МЕНЕДЖЕР\]/g, "").trim();

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => openChat()}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
          aria-label="Открыть чат"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-2rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">AI-помощник</p>
                <p className="text-xs text-muted-foreground">OnКлимат</p>
              </div>
            </div>
            <button onClick={closeChat} className="p-1 rounded-lg hover:bg-accent transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Здравствуйте! Я помогу подобрать климатическое оборудование. Опишите вашу задачу или задайте вопрос.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Подобрать кондиционер", "Нужна вентиляция", "Вопрос по ценам"].map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert [&>p]:mb-1.5 [&>ul]:mb-1.5 [&>ol]:mb-1.5">
                      <ReactMarkdown>{cleanContent(msg.content)}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-2.5">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Введите сообщение..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                disabled={isLoading}
              />
              <Button
                size="icon"
                onClick={() => send()}
                disabled={!input.trim() || isLoading}
                className="h-8 w-8 rounded-full shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

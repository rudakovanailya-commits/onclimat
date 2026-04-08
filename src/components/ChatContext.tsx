import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ChatContextType {
  isOpen: boolean;
  openChat: (prefill?: string) => void;
  closeChat: () => void;
  prefillMessage: string | null;
  clearPrefill: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillMessage, setPrefillMessage] = useState<string | null>(null);

  const openChat = useCallback((prefill?: string) => {
    if (prefill) setPrefillMessage(prefill);
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => setIsOpen(false), []);
  const clearPrefill = useCallback(() => setPrefillMessage(null), []);

  return (
    <ChatContext.Provider value={{ isOpen, openChat, closeChat, prefillMessage, clearPrefill }}>
      {children}
    </ChatContext.Provider>
  );
};

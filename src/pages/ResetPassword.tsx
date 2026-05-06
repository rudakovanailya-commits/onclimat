import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase auto-creates a recovery session from URL hash
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Пароль должен быть не короче 8 символов");
      return;
    }
    if (password !== confirm) {
      toast.error("Пароли не совпадают");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Пароль обновлён");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card rounded-2xl p-8 shadow-card border border-border space-y-5"
      >
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Новый пароль</h1>
          <p className="text-sm text-muted-foreground">
            {ready ? "Введите новый пароль" : "Проверка ссылки..."}
          </p>
        </div>

        <div className="space-y-3">
          <Input
            type="password"
            placeholder="Новый пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!ready}
            autoComplete="new-password"
          />
          <Input
            type="password"
            placeholder="Повторите пароль"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={!ready}
            autoComplete="new-password"
          />
        </div>

        <Button
          type="submit"
          className="w-full btn-gradient text-primary-foreground"
          disabled={loading || !ready}
        >
          {loading ? "Сохранение..." : "Сохранить пароль"}
        </Button>

        <p className="text-center">
          <a href="/admin/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← К входу
          </a>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;

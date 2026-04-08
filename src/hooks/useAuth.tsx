import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

async function checkAdmin(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  return !!data;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  const resolveAuth = useCallback(async (u: User | null) => {
    if (!mounted.current) return;
    setUser(u);
    if (u) {
      try {
        const admin = await checkAdmin(u.id);
        if (mounted.current) setIsAdmin(admin);
      } catch {
        if (mounted.current) setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
    if (mounted.current) setLoading(false);
  }, []);

  useEffect(() => {
    mounted.current = true;
    let initialDone = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (initialDone) {
          resolveAuth(session?.user ?? null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      initialDone = true;
      resolveAuth(session?.user ?? null);
    }).catch(() => {
      initialDone = true;
      if (mounted.current) setLoading(false);
    });

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, [resolveAuth]);

  const signOut = () => supabase.auth.signOut();

  return { user, isAdmin, loading, signOut };
}

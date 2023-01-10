import { supabase } from "../Supabase";
import { useUser } from "../store";
import { useEffect } from "react";

const useAuthChangeHandler = () => {
  const setSession = useUser((state) => state.setSession);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return null;
};

export default useAuthChangeHandler;

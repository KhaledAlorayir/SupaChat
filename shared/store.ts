import { Session } from "@supabase/supabase-js";
import create from "zustand";

interface userStore {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const useUser = create<userStore>((set) => ({
  session: null,
  setSession(session) {
    set({ session });
  },
}));

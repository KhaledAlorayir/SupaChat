import { useEffect } from "react";
import { supabase } from "../Supabase";
import { useQueryClient } from "@tanstack/react-query";
import { Message, User } from "../types";

const cachedUsers: User[] = [];

const useRealtimeMessageUpdater = () => {
  const qc = useQueryClient();

  useEffect(() => {
    const sub = supabase
      .channel("public:Message")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Message",
        },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            let user = cachedUsers.find((u) => u.id === payload.new.user_id);

            if (!user) {
              console.log("cache miss");
              const { data } = await supabase
                .from("profiles")
                .select("full_name,id,avatar_url")
                .eq("id", payload.new.user_id)
                .single();
              cachedUsers.push(data as User);
              user = data as User;
            }

            qc.setQueryData(["messages"], (cache: Message[] | undefined) => {
              if (cache) {
                const newMsg = { ...payload.new, profiles: user } as Message;
                return [...cache, newMsg];
              }
              return cache;
            });
          } else if (payload.eventType === "DELETE") {
            const deletedId: number = payload.old.id;

            qc.setQueryData(["messages"], (cache: Message[] | undefined) => {
              if (cache) {
                return cache.filter((m) => m.id !== deletedId);
              }
              return cache;
            });
          }
        }
      )
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  });
};

export default useRealtimeMessageUpdater;

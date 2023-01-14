// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// MessageNotificationHandler
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod/mod.ts";
serve(async (req) => {
  const body = await req.json();

  const InsertMessageHookSchema = z.object({
    type: z.literal("INSERT"),
    table: z.literal("Message"),
    record: z.object({
      id: z.number().positive(),
      content: z.string(),
      user_id: z.string().uuid(),
      created_at: z.string().datetime({ offset: true }),
    }),
  });
  const validated = InsertMessageHookSchema.parse(body);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const { data, error } = await supabase
    .from("profiles")
    .select("expo_token,full_name")
    .neq("id", validated.record.user_id)
    .not("expo_token", "is", null);

  if (data) {
    const notifications = data.map(({ expo_token }) => ({
      body: validated.record.content,
      sound: "default",
      title: "fetch user name",
      to: expo_token,
    }));
    // unable to use expo sdk bucz deno sucks
    const res = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      body: JSON.stringify(notifications),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const j = await res.json();
    console.log(j);
    if (res.ok) {
      return new Response(JSON.stringify({ message: "succsess" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response(JSON.stringify({ message: "failed" }), {
    headers: { "Content-Type": "application/json" },
  });
});

//vercel

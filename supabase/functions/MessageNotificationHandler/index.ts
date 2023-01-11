// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// MessageNotificationHandler
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

console.log("Hello from Functions!");

serve(async (req) => {
  const reqjson = await req.json();
  console.log(reqjson);
  const data = {
    message: `Hello world!`,
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});

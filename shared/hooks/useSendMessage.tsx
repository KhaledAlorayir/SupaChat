import { useMutation } from "@tanstack/react-query";
import { supabase } from "../Supabase";

const SendMessage = async ({ content }: { content: string }) => {
  const { data, error } = await supabase.from("Message").insert({ content });
  if (error) {
    throw error;
  }
};

const useSendMessage = () => {
  return useMutation({
    mutationFn: SendMessage,
    onSuccess(data, variables, context) {
      console.log("yay");
    },
  });
};

export default useSendMessage;

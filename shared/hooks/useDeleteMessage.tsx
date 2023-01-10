import { supabase } from "../Supabase";
import { useMutation } from "@tanstack/react-query";

const deleteMessage = async ({ mid }: { mid: number }) => {
  const { error, data } = await supabase.from("Message").delete().eq("id", mid);
  if (error) {
    throw error;
  }
  return data;
};

const useDeleteMessage = () => {
  return useMutation({
    mutationFn: deleteMessage,
  });
};

export default useDeleteMessage;

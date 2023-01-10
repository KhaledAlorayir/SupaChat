import { useQuery } from "@tanstack/react-query";
import { supabase } from "../Supabase";
import { Message } from "../types";

const getMessages = async (): Promise<Message[]> => {
  const { data, error } = await supabase
    .from("Message")
    .select("*,profiles(full_name,id,avatar_url)")
    .limit(15)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }
  return data.reverse();
};

const useMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    staleTime: Infinity,
  });
};

export default useMessages;

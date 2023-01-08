import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, extendTheme, Box } from "native-base";
import { useEffect } from "react";
import AppLayout from "./components/AppLayout";
import { supabase } from "./shared/Supabase";
import { useUser } from "./shared/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//for auth
//https://dev.to/fedorish/google-sign-in-using-supabase-and-react-native-expo-14jf
import { Buffer } from "buffer";
global.Buffer = Buffer;

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
});

const client = new QueryClient();

export default function App() {
  const setSession = useUser((state) => state.setSession);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={client}>
        <AppLayout />
        <StatusBar />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}

/*
Todo: 
1- post messages
2- realtime connection
3- delete messages
4- notifictions
5- load older
6- images?
*/

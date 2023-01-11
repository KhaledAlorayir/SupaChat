import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, extendTheme } from "native-base";
import AppLayout from "./components/AppLayout";
import useAuthChangeHandler from "./shared/hooks/useAuthChangeHandler";
import useNotificationsHandler from "./shared/hooks/useNotificationsHandler";
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
  useAuthChangeHandler();
  useNotificationsHandler();

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
1- notifictions
  2- insert expo token to profile table (on load check if is it there or change it)
  3- webhooks + supabase functions to send push not (nodejs sdk works for deno?) 

2- load older
3- images?
*/

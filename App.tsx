import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, extendTheme } from "native-base";
import AppLayout from "./components/AppLayout";
import useAuthChangeHandler from "./shared/hooks/useAuthChangeHandler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//for auth
//https://dev.to/fedorish/google-sign-in-using-supabase-and-react-native-expo-14jf
import { Buffer } from "buffer";
import useNotificationsHandler from "./shared/hooks/useNotificationsHandler";
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
4- notifictions
5- load older
6- images?
*/

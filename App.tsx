import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, extendTheme, Box } from "native-base";
import { useEffect } from "react";
import AppLayout from "./components/AppLayout";
import { supabase } from "./shared/Supabase";
import { useUser } from "./shared/store";

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
      <AppLayout />
      <StatusBar />
    </NativeBaseProvider>
  );
}

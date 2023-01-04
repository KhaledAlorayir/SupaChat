//@ts-ignore
import { SUPABASE_URL, SUPABASE_KEY } from "@env";
import { createClient } from "@supabase/supabase-js";
import { setupURLPolyfill } from "react-native-url-polyfill";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri, startAsync } from "expo-auth-session";
import { useUser } from "./store";

setupURLPolyfill();

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

//custom method that uses ExpoAuthSession to perform oauth signin
// then sets the tokens to supabase client
export const signinWithDiscord = async () => {
  const redirectUrl = makeRedirectUri({
    path: "/auth/callback",
  });
  const authResponse = await startAsync({
    authUrl: `${SUPABASE_URL}/auth/v1/authorize?provider=discord&redirect_to=${redirectUrl}`,
    returnUrl: redirectUrl,
  });

  if (authResponse.type === "success") {
    const res = await supabase.auth.setSession({
      access_token: authResponse.params.access_token,
      refresh_token: authResponse.params.refresh_token,
    });
    useUser.getState().setSession(res.data.session);
  } else if (authResponse.type === "error") {
    console.log("auth error");
  }
};

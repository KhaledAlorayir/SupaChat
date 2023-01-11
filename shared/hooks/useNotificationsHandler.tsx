import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { useEffect, useRef } from "react";
import { supabase } from "../Supabase";
import { useUser } from "../store";

//Handle notifications when app is one the fourground
//defualt behivor that it will not show the noti//
/* Notifications.setNotificationHandler({
  async handleNotification() {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
}); */
//
const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    storeExpoToken(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

const storeExpoToken = async (token: string) => {
  const user_id = useUser.getState().session?.user.id;
  if (user_id) {
    const { data, error } = await supabase
      .from("profiles")
      .select("expo_token")
      .eq("id", user_id)
      .single();

    if (!data?.expo_token || data.expo_token !== token) {
      await supabase
        .from("profiles")
        .update({ expo_token: token })
        .eq("id", user_id);
    }
  }
};

const useNotificationsHandler = () => {
  const onMount = useRef(true);

  useEffect(() => {
    if (onMount.current) {
      registerForPushNotificationsAsync();
    }
    onMount.current = false;
  }, []);

  return null;
};

export default useNotificationsHandler;

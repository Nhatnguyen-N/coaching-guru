import { UserDetailContext } from "@/context/UserDetailContext";
import { UserDetail } from "@/types/UserDetail.types";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-blod": require("../assets/fonts/Outfit-Bold.ttf"),
  });
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </UserDetailContext.Provider>
  );
}

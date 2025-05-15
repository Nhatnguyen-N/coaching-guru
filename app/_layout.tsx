import { useFonts } from "expo-font";
import { Stack } from "expo-router";
export default function RootLayout() {
  useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-blod": require("../assets/fonts/Outfit-Bold.ttf"),
  });
  return <Stack screenOptions={{ headerShown: false }} />;
}

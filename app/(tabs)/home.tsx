import Header from "@/components/Home/Header";
import NoCourse from "@/components/Home/NoCourse";
import Colors from "@/constant/Colors";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView
      style={{ padding: 25, flex: 1, backgroundColor: Colors.WHITE }}
    >
      <Header />
      <NoCourse />
    </SafeAreaView>
  );
}

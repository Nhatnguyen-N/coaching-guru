import Chapters from "@/components/CourseView/Chapters";
import Intro from "@/components/CourseView/Intro";
import Colors from "@/constant/Colors";
import { CourseType } from "@/types/Course.types";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CourseView() {
  const { courseParams } = useLocalSearchParams();
  const course: CourseType = JSON.parse(courseParams as string);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <FlatList
        data={[{ key: "intro" }, { key: "chapters" }]} // Dummy data
        renderItem={({ item }) =>
          item.key === "intro" ? (
            <Intro course={course} />
          ) : (
            <Chapters course={course} />
          )
        }
      />
    </SafeAreaView>
  );
}

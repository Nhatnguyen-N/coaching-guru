import Chapters from "@/components/CourseView/Chapters";
import Intro from "@/components/CourseView/Intro";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import { CourseType } from "@/types/Course.types";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CourseView() {
  const { courseParams, courseId } = useLocalSearchParams();
  const [course, setCourse] = useState<CourseType>();
  useEffect(() => {
    if (!courseParams) {
      GetCourseById();
    } else {
      setCourse(JSON.parse(courseParams as string));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);
  const GetCourseById = async () => {
    const docRef = await getDoc(doc(db, "Courses", courseId as string));
    const courseData = docRef.data();
    setCourse(courseData as CourseType);
  };
  // const course: CourseType = JSON.parse(courseParams as string);
  return (
    course && (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
        <FlatList
          data={[{ key: "intro" }, { key: "chapters" }]} // Dummy data
          renderItem={({ item }) =>
            item.key === "intro" ? (
              <Intro course={course as CourseType} />
            ) : (
              <Chapters course={course as CourseType} />
            )
          }
        />
      </SafeAreaView>
    )
  );
}

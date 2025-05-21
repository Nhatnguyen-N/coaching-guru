import CourseList from "@/components/Home/CourseList";
import CourseProgress from "@/components/Home/CourseProgress";
import Header from "@/components/Home/Header";
import NoCourse from "@/components/Home/NoCourse";
import PraticeSection from "@/components/Home/PraticeSection";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import { useUserDetail } from "@/context/UserDetailContext";
import { CourseType } from "@/types/Course.types";
import { useFocusEffect } from "expo-router";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { Image, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { userDetail, setUserDetail } = useUserDetail();
  const [courseList, setCourseList] = useState<CourseType[] | DocumentData[]>(
    []
  );

  useFocusEffect(
    React.useCallback(() => {
      if (!userDetail) return;

      const q = query(
        collection(db, "Courses"),
        where("createdBy", "==", userDetail.email)
      );

      // Subscribe to realtime updates
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const updatedCourses = snapshot.docs.map((doc) => doc.data());
        setCourseList(updatedCourses);
      });

      return () => unsubscribe();
    }, [userDetail]) // Chỉ chạy lại nếu userDetail thay đổi
  );

  // const GetCourseList = async () => {
  //   setCourseList([]);
  //   const q = query(
  //     collection(db, "Courses"),
  //     where("createdBy", "==", userDetail?.email)
  //   );
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setCourseList((prev) => [...prev, doc.data()]);
  //   });
  // };

  return (
    // Fix Scroll, margin
    <SafeAreaView
      style={{ backgroundColor: Colors.WHITE, flex: 1 }}
      edges={["top", "left", "right"]} // 🔥 Chỉ áp dụng safe area cho 3 cạnh (loại bỏ bottom)
    >
      <Image
        source={require("@/assets/images/wave.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: 700,
        }}
      />
      <View
        style={{
          paddingRight: 15,
          paddingTop: Platform.OS === "web" ? 45 : 0,
          // backgroundColor: Colors.WHITE,
          // flex: 1,
        }}
      >
        <Header />
        <ScrollView>
          {courseList?.length === 0 ? (
            <NoCourse />
          ) : (
            <View>
              <CourseProgress courseList={courseList as CourseType[]} />
              <PraticeSection />
              <CourseList courseList={courseList as CourseType[]} />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

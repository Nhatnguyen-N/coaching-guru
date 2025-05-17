import CourseList from "@/components/Home/CourseList";
import CourseProgress from "@/components/Home/CourseProgress";
import Header from "@/components/Home/Header";
import NoCourse from "@/components/Home/NoCourse";
import PraticeSection from "@/components/Home/PraticeSection";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import { useUserDetail } from "@/context/UserDetailContext";
import { CourseType } from "@/types/Course.types";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { userDetail, setUserDetail } = useUserDetail();
  const [courseList, setCourseList] = useState<CourseType[] | DocumentData[]>(
    []
  );

  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCourseList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    // Fix Scroll, margin
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "web" ? 45 : 0,
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}
      edges={["top", "left", "right"]} // 🔥 Chỉ áp dụng safe area cho 3 cạnh (loại bỏ bottom)
    >
      <Header />
      <ScrollView
        style={{
          flex: 1,
          // backgroundColor: "blue",
        }}
      >
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
    </SafeAreaView>
  );
}

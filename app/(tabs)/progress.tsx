import CourseProgressCard from "@/components/Shared/CourseProgressCard";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { useUserDetail } from "@/context/UserDetailContext";
import { CourseType } from "@/types/Course.types";
import { router, useFocusEffect } from "expo-router";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function Progress() {
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
  return (
    <View>
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
          width: "100%",
          position: "absolute",
          padding: 20,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.outfitBold,
            fontSize: 30,
            color: Colors.WHITE,
            marginBlock: 10,
          }}
        >
          Course Progress
        </Text>
        <FlatList
          data={courseList as CourseType[]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: `/courseView/[courseId]`,
                  params: {
                    courseId: item?.docId,
                    courseParams: JSON.stringify(item),
                    key: item?.docId,
                  },
                });
              }}
            >
              <CourseProgressCard width={"97%"} item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

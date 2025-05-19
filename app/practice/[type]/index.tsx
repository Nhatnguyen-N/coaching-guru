import CourseListGrid from "@/components/PracticeScreen/CourseListGrid";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { PraticeOption } from "@/constant/Option";
import { useUserDetail } from "@/context/UserDetailContext";
import { CourseType } from "@/types/Course.types";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

export default function PracticeTypeHomeScreen() {
  const { type } = useLocalSearchParams();
  const option = PraticeOption.find((item) => item?.name === type);
  const { userDetail } = useUserDetail();
  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState<CourseType[] | DocumentData[]>(
    []
  );
  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);
  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    try {
      const q = query(
        collection(db, "Courses"),
        where("createdBy", "==", userDetail?.email),
        orderBy("createdOn", "desc")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCourseList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <View>
      <Image source={option?.image} style={{ height: 200, width: "100%" }} />
      <View
        style={{
          position: "absolute",
          padding: 10,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.BLACK}
            style={{
              backgroundColor: Colors.WHITE,
              padding: 8,
              borderRadius: 10,
            }}
          />
        </Pressable>
        <Text
          style={{
            fontFamily: Fonts.outfitBold,
            fontSize: 35,
            color: Colors.WHITE,
          }}
        >
          {type}
        </Text>
      </View>
      {loading && (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{ marginTop: 150 }}
        />
      )}

      <CourseListGrid />
    </View>
  );
}

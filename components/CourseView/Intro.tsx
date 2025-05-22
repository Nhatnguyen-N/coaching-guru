import { db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { BannerImageKey, imageAssets } from "@/constant/Option";
import { useUserDetail } from "@/context/UserDetailContext";
import { CourseType } from "@/types/Course.types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Button from "../Shared/Button";

export default function Intro({
  course,
  enroll,
}: {
  course: CourseType;
  enroll: boolean;
}) {
  const { userDetail, setUserDetail } = useUserDetail();
  const [loading, setLoading] = useState(false);
  const onEnrollCourse = async () => {
    if (userDetail?.member === false) {
      router.push("/subscriptionWall");
      return;
    }
    const docId = Date.now().toString();
    setLoading(true);
    const data = {
      ...course,
      createdBy: userDetail?.email,
      createdOn: new Date(),
      enroll: true,
    };
    await setDoc(doc(db, "Courses", docId), data);
    router.push({
      pathname: `/courseView/[courseId]`,
      params: {
        courseId: docId,
        courseParams: JSON.stringify(data),
        key: docId,
        enroll: JSON.stringify(false),
      },
    });
    setLoading(false);
  };
  return (
    <View>
      <Image
        source={
          imageAssets.hasOwnProperty(course?.banner_image)
            ? imageAssets[course?.banner_image as BannerImageKey]
            : require("../../assets/images/banner1.png")
        }
        style={{
          width: "100%",
          height: 280,
        }}
      />
      <View
        style={{
          padding: 20,
        }}
      >
        <Text style={{ fontFamily: Fonts.outfitBold, fontSize: 25 }}>
          {course?.courseTitle}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Ionicons name="book-outline" size={20} color={"black"} />

          <Text
            style={{
              fontFamily: Fonts.outfitRegular,
              fontSize: 18,
            }}
          >
            {course?.chapters?.length} Chapters
          </Text>
        </View>
        <Text
          style={{
            fontFamily: Fonts.outfitBold,
            fontSize: 20,
            marginTop: 10,
          }}
        >
          Description:
        </Text>
        <Text
          style={{
            fontFamily: Fonts.outfitRegular,
            fontSize: 18,
            color: Colors.GRAY,
          }}
        >
          {course?.description}
        </Text>
        {enroll === true ? (
          <Button
            text="Enroll Now"
            loading={loading}
            onPress={() => onEnrollCourse()}
          />
        ) : (
          <Button text="Start Now" />
        )}
      </View>
      <Pressable
        style={{
          position: "absolute",
          padding: 10,
        }}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Ionicons name="arrow-back" size={34} color={"black"} />
      </Pressable>
    </View>
  );
}

import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { BannerImageKey, imageAssets } from "@/constant/Option";
import { CourseType } from "@/types/Course.types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import Button from "../Shared/Button";

export default function Intro({ course }: { course: CourseType }) {
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
        <Button text="Start Now" />
      </View>
      <Pressable
        style={{
          position: "absolute",
          padding: 10,
        }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={34} color={"black"} />
      </Pressable>
    </View>
  );
}

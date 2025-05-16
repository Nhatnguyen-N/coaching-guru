import Fonts from "@/constant/Fonts";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import Button from "../Shared/Button";

export default function NoCourse() {
  return (
    <View
      style={{
        marginTop: 40,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/book.png")}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text
        style={{
          fontFamily: Fonts.outfitBold,
          fontSize: 25,
          textAlign: "center",
        }}
      >
        You Don&apos;t Have Any Course
      </Text>
      <Button
        text="+ Create New Course"
        onPress={() => router.push(`/addCourse`)}
      />
      <Button text="Explore Existing Course" type="outline" />
    </View>
  );
}

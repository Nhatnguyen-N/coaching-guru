import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { CourseType } from "@/types/Course.types";
import React from "react";
import { FlatList, Text, View } from "react-native";
import CourseProgressCard from "../Shared/CourseProgressCard";
export default function CourseProgress({
  courseList,
}: {
  courseList: CourseType[];
}) {
  return (
    <View
      style={{
        marginTop: 0,
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.outfitBold,
          fontSize: 25,
          marginLeft: 15,
          color: Colors.WHITE,
        }}
      >
        Progress
      </Text>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 15,
        }}
        renderItem={({ item, index }) => (
          <View>
            <CourseProgressCard item={item} />
          </View>
        )}
      />
    </View>
  );
}

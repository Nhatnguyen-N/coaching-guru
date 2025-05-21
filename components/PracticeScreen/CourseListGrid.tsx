import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { PraticeOptionType } from "@/constant/Option";
import { CourseType } from "@/types/Course.types";
import { Ionicons } from "@expo/vector-icons";
import { ExternalPathString, RelativePathString, router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function CourseListGrid({
  courseList,
  option,
}: {
  courseList: CourseType[];
  option: PraticeOptionType;
}) {
  const onPress = (course: CourseType) => {
    router.push({
      pathname: option?.path as RelativePathString | ExternalPathString,
      params: {
        courseParams: JSON.stringify(course),
      },
    });
  };
  return (
    <View>
      <FlatList
        data={courseList}
        numColumns={2}
        style={{
          padding: 20,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPress(item)}
            key={index}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              backgroundColor: Colors.WHITE,
              margin: 7,
              borderRadius: 15,
              elevation: 1,
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={Colors.GRAY}
              style={{
                position: "absolute",
                top: 10,
                right: 20,
              }}
            />
            <Image
              source={option?.icon}
              style={{
                width: "100%",
                height: 70,
                objectFit: "contain",
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.outfitRegular,
                textAlign: "center",
                marginTop: 7,
              }}
            >
              {item?.courseTitle}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

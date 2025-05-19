import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { CourseType } from "@/types/Course.types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BannerImageKey, imageAssets } from "../../constant/Option";
export default function CourseList({
  courseList,
}: {
  courseList: CourseType[];
}) {
  return (
    <View style={{ marginTop: 15 }}>
      <Text
        style={{
          fontFamily: Fonts.outfitBold,
          fontSize: 25,
          marginLeft: 15,
        }}
      >
        Courses
      </Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 15,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/courseView/[courseId]`,
                params: {
                  courseId: item?.docId,
                  courseParams: JSON.stringify(item),
                  key: item?.docId,
                },
              })
            }
            key={index}
            style={styles.courseContainer}
          >
            <Image
              source={
                imageAssets.hasOwnProperty(item.banner_image)
                  ? imageAssets[item.banner_image as BannerImageKey]
                  : require("../../assets/images/banner1.png")
              }
              style={{
                width: "100%",
                height: 150,
                borderRadius: 15,
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.outfitBold,
                fontSize: 18,
                marginTop: 10,
              }}
            >
              {item?.courseTitle}
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
                }}
              >
                {item?.chapters?.length} Chapters
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    backgroundColor: Colors.BG_GRAY,
    margin: 6,
    borderRadius: 15,
    width: 260,
  },
});

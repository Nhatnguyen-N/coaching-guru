import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { BannerImageKey, imageAssets } from "@/constant/Option";
import { CourseType } from "@/types/Course.types";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import * as Progress from "react-native-progress";
export default function CourseProgress({
  courseList,
}: {
  courseList: CourseType[];
}) {
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <Text
        style={{ fontFamily: Fonts.outfitBold, fontSize: 25, marginLeft: 15 }}
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
          <View
            style={{
              margin: 7,
              padding: 15,
              backgroundColor: Colors.BG_GRAY,
              borderRadius: 15,
              width: 280,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 8,
              }}
            >
              <Image
                source={
                  imageAssets.hasOwnProperty(item.banner_image)
                    ? imageAssets[item.banner_image as BannerImageKey]
                    : require("../../assets/images/banner1.png")
                }
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                }}
              />
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: Fonts.outfitBold,
                    fontSize: 19,
                    flexWrap: "wrap",
                  }}
                >
                  {item?.courseTitle}
                </Text>
                <Text style={{ fontFamily: Fonts.outfitRegular, fontSize: 15 }}>
                  {item?.chapters?.length} Chapters
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Progress.Bar progress={0} width={250} />
              <Text
                style={{
                  fontFamily: Fonts.outfitRegular,
                  marginTop: 2,
                }}
              >
                0 Out of 5 Chapter Completed
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

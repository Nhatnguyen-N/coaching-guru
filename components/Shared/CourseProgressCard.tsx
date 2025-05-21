import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { BannerImageKey, imageAssets } from "@/constant/Option";
import { CourseType } from "@/types/Course.types";
import React from "react";
import { DimensionValue, Image, Text, View } from "react-native";
import * as Progress from "react-native-progress";
export default function CourseProgressCard({
  item,
  width,
}: {
  item: CourseType;
  width?: DimensionValue;
}) {
  const GetCompletedChapter = (course: CourseType) => {
    const completedChapter = course?.completedChapter?.length;
    const perc = Number(completedChapter) / Number(course?.chapters.length);
    return perc;
  };
  return (
    <View
      style={{
        margin: 7,
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        width: width ? width : 280,
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
        <Progress.Bar
          progress={GetCompletedChapter(item)}
          width={Number(width) - 30}
        />
        <Text
          style={{
            fontFamily: Fonts.outfitRegular,
            marginTop: 2,
          }}
        >
          {item?.completedChapter?.length ?? 0} Out of {item?.chapters?.length}{" "}
          Chapter Completed
        </Text>
      </View>
    </View>
  );
}

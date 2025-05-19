import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { CourseType } from "@/types/Course.types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Chapters({ course }: { course: CourseType }) {
  const isChapterCompleted = (index: string) => {
    const isCompleted = course?.completedChapter?.find(
      (item) => item === index
    );

    return isCompleted ? true : false;
  };
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.outfitBold,
          fontSize: 25,
        }}
      >
        Chapters
      </Text>
      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              router.replace({
                pathname: "/chapterView",
                params: {
                  chapterParams: JSON.stringify(item),
                  docId: course?.docId,
                  chapterIndex: index,
                },
              });
            }}
            key={index}
            style={{
              padding: 18,
              borderWidth: 0.5,
              borderRadius: 15,
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                width: "85%",
              }}
            >
              <Text style={styles.chapterText}>{index + 1}.</Text>
              <Text style={styles.chapterText}>{item?.chapterName}</Text>
            </View>

            {isChapterCompleted(JSON.stringify(index)) ? (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={Colors.GREEN}
              />
            ) : (
              <Ionicons name="play" size={24} color={Colors.PRIMARY} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  chapterText: {
    fontFamily: Fonts.outfitRegular,
    fontSize: 20,
  },
});

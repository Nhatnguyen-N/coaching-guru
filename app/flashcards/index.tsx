import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { CourseType } from "@/types/Course.types";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FlipCard from "react-native-flip-card";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";

const width = Dimensions.get("screen").width;
export default function Flashcards() {
  const { courseParams } = useLocalSearchParams();
  const course: CourseType = JSON.parse(courseParams as string);
  const flashcard = course?.flashcards;
  const [currentPage, setCurrentPage] = useState(0);

  const GetProgress = (currentPage: number) => {
    const perc = currentPage / flashcard?.length;
    return perc;
  };

  const onScroll = (event: any) => {
    const index = Math.round(event?.nativeEvent?.contentOffset.x / width);
    setCurrentPage(index);
  };
  return (
    <SafeAreaView edges={["left", "right"]}>
      <Image
        source={require("../../assets/images/wave.png")}
        style={{ height: 800, width: "100%" }}
      />
      <View
        style={{
          position: "absolute",
          padding: 25,
          paddingTop: 70,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // paddingHorizontal: 25,
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={30} color={"white"} />
          </Pressable>
          <Text
            style={{
              fontFamily: Fonts.outfitBold,
              fontSize: 25,
              color: Colors.WHITE,
            }}
          >
            {currentPage + 1} of {flashcard?.length}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            // paddingHorizontal: 25,
          }}
        >
          <Progress.Bar
            progress={GetProgress(currentPage)}
            width={Dimensions.get("window").width * 0.85}
            color={Colors.WHITE}
            height={10}
          />
        </View>
        {/* Need fix */}
        <FlatList
          data={flashcard}
          horizontal
          pagingEnabled
          onScroll={onScroll}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={[
                {
                  // height: 500,
                  marginTop: 60,
                },
              ]}
            >
              <FlipCard style={[styles.flipCard]}>
                {/* Face Side */}
                <View style={styles.frontCard}>
                  <Text style={{ fontFamily: Fonts.outfitBold, fontSize: 28 }}>
                    {item?.front}
                  </Text>
                </View>
                <View style={styles.backCard}>
                  <Text
                    style={{
                      width: Dimensions.get("screen").width * 0.78,
                      fontFamily: Fonts.outfitRegular,
                      fontSize: 28,
                      padding: 20,
                      textAlign: "center",
                      color: Colors.WHITE,
                    }}
                  >
                    {item?.back}
                  </Text>
                </View>
              </FlipCard>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  flipCard: {
    width: Dimensions.get("screen").width * 0.78,
    height: 500,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: Dimensions.get("screen").width * 0.05,
  },
  frontCard: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  backCard: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
  },
});

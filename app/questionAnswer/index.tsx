import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { CourseType } from "@/types/Course.types";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function QuestionAnswer() {
  const { courseParams } = useLocalSearchParams();
  const course: CourseType = JSON.parse(courseParams as string);
  const qaList = course?.qa;
  const [selectQuestion, setSelectionQuestion] = useState<number | null>(null);

  const OnQuestionSelect = (index: number) => {
    if (selectQuestion === index) {
      setSelectionQuestion(null);
    } else {
      setSelectionQuestion(index);
    }
  };
  return (
    <View style={{}}>
      <Image
        source={require("../../assets/images/wave.png")}
        style={{ height: 800, width: "100%" }}
      />
      <View
        style={{
          position: "absolute",
          width: "90%",
          height: "100%",
          padding: 20,
          paddingTop: 45,
          marginTop: 35,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 7,
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={30} color={"white"} />
          </Pressable>
          <Text
            style={{
              fontFamily: Fonts.outfitBold,
              fontSize: 28,
              color: Colors.WHITE,
            }}
          >
            Question & Answer
          </Text>
        </View>
        <Text
          style={{
            fontFamily: Fonts.outfitRegular,
            color: Colors.WHITE,
            fontSize: 20,
          }}
        >
          {course?.courseTitle}
        </Text>
        <FlatList
          data={qaList}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          renderItem={({ item, index }) => (
            <Pressable
              style={styles.card}
              onPress={() => OnQuestionSelect(index)}
            >
              <Text
                style={{
                  fontFamily: Fonts.outfitBold,
                  fontSize: 20,
                }}
              >
                {item?.question}
              </Text>
              {selectQuestion === index && (
                <View
                  style={{
                    borderTopWidth: 0.4,
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.outfitRegular,
                      fontSize: 17,
                      color: Colors.GREEN,
                      marginTop: 10,
                    }}
                  >
                    Answer:{item?.answer}
                  </Text>
                </View>
              )}
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    marginTop: 15,
    borderRadius: 15,
    elevation: 1,
  },
});

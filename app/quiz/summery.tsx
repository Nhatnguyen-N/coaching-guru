import Button from "@/components/Shared/Button";
import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResultType } from ".";

export default function QuizSummery() {
  const { quizResultParam } = useLocalSearchParams();
  const quizResult: ResultType = JSON.parse(quizResultParam as string);
  const [correctAns, setCorrectAns] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  useEffect(() => {
    quizResult && CalculateResult();
  }, [quizResult]);
  const CalculateResult = () => {
    if (quizResult !== undefined) {
      const correctAns_ = Object.entries(quizResult)?.filter(
        ([key, value]) => value?.isCorrect === true
      );
      const totalQues_ = Object.keys(quizResult).length;
      setCorrectAns(correctAns_.length);
      setTotalQuestion(totalQues_);
    }
  };

  const GetPercMark = () => {
    return Number(((correctAns / totalQuestion) * 100).toFixed(0));
  };

  return (
    <SafeAreaView>
      <Image
        source={require("../../assets/images/wave.png")}
        style={{
          width: "100%",
          height: 700,
        }}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          padding: 35,
          paddingTop: 70,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: Fonts.outfitBold,
            fontSize: 30,
            color: Colors.WHITE,
          }}
        >
          Quiz Summery
        </Text>
        <View
          style={{
            backgroundColor: Colors.WHITE,
            padding: 20,
            borderRadius: 20,
            marginTop: 60,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/trophy.png")}
            style={{
              width: 100,
              height: 100,
              marginTop: -60,
            }}
          />
          <Text
            style={{
              fontSize: 26,
              fontFamily: Fonts.outfitBold,
            }}
          >
            {GetPercMark() > 60 ? "Congratulations!" : "Try Again!"}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.outfitRegular,
              color: Colors.GRAY,
              fontSize: 17,
            }}
          >
            You gave {GetPercMark()}% Correct Answer
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>Q {totalQuestion}</Text>
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>✅ {correctAns}</Text>
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>
                ❌ {totalQuestion - correctAns}
              </Text>
            </View>
          </View>
        </View>
        <Button
          text="Back To Home"
          onPress={() => router.replace("/(tabs)/home")}
        />
        <View
          style={{
            marginTop: 25,
            flex: 1,
          }}
        >
          <Text style={{ fontFamily: Fonts.outfitBold, fontSize: 25 }}>
            Summery:
          </Text>
          <FlatList
            data={Object.entries(quizResult)}
            renderItem={({ item, index }) => {
              const quizItem = item[1];
              return (
                <View
                  style={{
                    padding: 15,
                    borderWidth: 1,
                    marginTop: 5,
                    borderRadius: 15,
                    backgroundColor:
                      quizItem?.isCorrect === true
                        ? Colors.LIGHT_GREEN
                        : Colors.LIGHT_RED,
                    borderColor:
                      quizItem?.isCorrect === true ? Colors.GREEN : Colors.RED,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.outfitRegular,
                      fontSize: 20,
                    }}
                  >
                    {quizItem.question}
                  </Text>
                  <Text
                    style={{ fontFamily: Fonts.outfitRegular, fontSize: 15 }}
                  >
                    Ans: {quizItem?.correctAns}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  resultTextContainer: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    elevation: 1,
  },
  resultText: {
    fontFamily: Fonts.outfitRegular,
    fontSize: 20,
  },
});

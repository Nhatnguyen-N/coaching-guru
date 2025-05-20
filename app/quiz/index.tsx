import Button from "@/components/Shared/Button";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { CourseType } from "@/types/Course.types";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
export interface ResultType {
  [key: number]: {
    // Key là số trang (currentPage)
    userChoice: string;
    isCorrect: boolean;
    question: string;
    correctAns: string;
  };
}
export default function Quiz() {
  const { courseParams } = useLocalSearchParams();
  const course: CourseType = JSON.parse(courseParams as string);
  const quiz = course?.quiz;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [result, setResult] = useState<ResultType[]>([]);
  const [loading, setLoading] = useState(false);
  const GetProgress = (currentPage: number) => {
    const perc = currentPage / quiz?.length;
    return perc;
  };

  const OnOptionSelect = (selectedChoice: string) => {
    setResult((prev) => ({
      ...prev,
      [currentPage]: {
        userChoice: selectedChoice,
        isCorrect: quiz[currentPage]?.correctAns === selectedChoice,
        question: quiz[currentPage]?.question,
        correctAns: quiz[currentPage]?.correctAns,
      },
    }));
  };

  const onQuizFinish = async () => {
    setLoading(true);
    // Save The result in Database for Quiz
    try {
      await updateDoc(doc(db, "Courses", course?.docId), {
        quizResult: result,
      });
      setLoading(false);
      router.replace({
        pathname: "/quiz/summery",
        params: {
          quizResultParam: JSON.stringify(result),
        },
      });
    } catch (error) {
      setLoading(false);
    }

    // Redirect user to Quiz Summery
  };

  return (
    <SafeAreaView style={{}}>
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
          }}
        >
          <Pressable>
            <Ionicons name="arrow-back" size={30} color={"white"} />
          </Pressable>
          <Text
            style={{
              fontFamily: Fonts.outfitBold,
              fontSize: 25,
              color: Colors.WHITE,
            }}
          >
            {currentPage + 1} of {quiz?.length}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Progress.Bar
            progress={GetProgress(currentPage)}
            width={Dimensions.get("window").width * 0.85}
            color={Colors.WHITE}
            height={10}
          />
        </View>
        <View
          style={{
            padding: 20,
            backgroundColor: Colors.WHITE,
            marginTop: 30,
            height: Dimensions.get("screen").height * 0.65,
            elevation: 1,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: Fonts.outfitBold,
              textAlign: "center",
            }}
          >
            {quiz[currentPage]?.question}
          </Text>
          {quiz[currentPage]?.options.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  OnOptionSelect(item);
                  setSelectedOption(index);
                }}
                key={index}
                style={{
                  padding: 20,
                  borderWidth: 1,
                  borderRadius: 15,
                  marginTop: 8,
                  backgroundColor:
                    selectedOption === index ? Colors.LIGHT_GREEN : "",
                  borderColor: selectedOption === index ? Colors.GREEN : "",
                  elevation: 1,
                }}
              >
                <Text style={{ fontFamily: Fonts.outfitRegular, fontSize: 20 }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {selectedOption !== null && quiz?.length - 1 > currentPage && (
          <Button
            text="Next"
            onPress={() => {
              setCurrentPage(currentPage + 1);
              setSelectedOption(null);
            }}
          />
        )}
        {selectedOption !== null && quiz?.length - 1 === currentPage && (
          <Button
            loading={loading}
            text="Finish"
            onPress={() => onQuizFinish()}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

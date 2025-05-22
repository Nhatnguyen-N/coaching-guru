import Button from "@/components/Shared/Button";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { useUserDetail } from "@/context/UserDetailContext";
import { CourseType } from "@/types/Course.types";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GenerateCourseAIModel,
  GenerateTopicsAIModel,
} from "../../config/AiModel";
import Prompt from "../../constant/Prompt";
export default function AddCourse() {
  const { userDetail, setUserDetail } = useUserDetail();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const onGenerateTopic = async () => {
    if (userDetail?.member === false) {
      router.push("/subscriptionWall");
      return;
    }
    setLoading(true);
    try {
      const PROMPT = userInput + Prompt.IDEA;
      const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT);
      const topicIdea = JSON.parse(aiResp.response.text());
      setTopics(topicIdea);
      console.log(topicIdea);
    } catch (error: any) {
      console.error("Lỗi AI:", error);
      alert("Lỗi khi tạo chủ đề: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const onTopicSelect = (topic: string) => {
    const isAlreadyExist = selectedTopics.find((item) => item === topic);
    if (!isAlreadyExist) {
      setSelectedTopics((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopics.filter((item) => item !== topic);
      setSelectedTopics(topics);
    }
  };
  const onGenerateCourse = async () => {
    setLoading(true);
    try {
      const PROMPT = selectedTopics + Prompt.COURSE;
      const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
      const resp = JSON.parse(aiResp.response.text());
      const courses = resp.courses;
      // Save Course info to Database
      courses.forEach(async (course: CourseType) => {
        const docId = Date.now().toString();
        await setDoc(doc(db, "Courses", docId), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetail?.email ?? "",
          docId: docId,
        });
      });
      router.push("/(tabs)/home");
    } catch (error: any) {
      console.error("Lỗi AI:", error);
      alert("Lỗi khi tạo chủ đề: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const isTopicSelected = (topic: string) => {
    const selection = selectedTopics.find((item) => item === topic);
    return selection ? true : false;
  };
  return (
    <SafeAreaView
      style={{ padding: 25, backgroundColor: Colors.WHITE, flex: 1 }}
    >
      <Text
        style={{
          fontFamily: Fonts.outfitBold,
          fontSize: 30,
        }}
      >
        Create New Course
      </Text>
      <Text
        style={{
          fontFamily: Fonts.outfitRegular,
          fontSize: 25,
        }}
      >
        What you want to learn today?
      </Text>
      <Text
        style={{
          fontFamily: Fonts.outfitRegular,
          fontSize: 20,
          marginTop: 8,
          color: Colors.GRAY,
        }}
      >
        What corse you want to create (ex.Learn Python, Digital Marketting, 10Th
        Science Chapters, etc...)
      </Text>
      <TextInput
        placeholder="(Ex. Learn Python, Learn 12th Chemistry)"
        placeholderTextColor={Colors.GRAY}
        style={styles.textInput}
        numberOfLines={3}
        multiline={true}
        onChangeText={(value) => setUserInput(value)}
      />
      <Button
        text="Generate Topic"
        type="outline"
        onPress={() => onGenerateTopic()}
        loading={loading}
      />

      <Pressable
        onPress={() => Keyboard.dismiss()}
        style={{
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.outfitRegular,
            fontSize: 20,
          }}
        >
          Select all topics which you want to add in the course
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 6,
          }}
        >
          {topics.map((item, index) => (
            <Pressable key={index} onPress={() => onTopicSelect(item)}>
              <Text
                style={{
                  padding: 7,
                  borderWidth: 0.4,
                  borderRadius: 99,
                  paddingHorizontal: 15,
                  backgroundColor: isTopicSelected(item) ? Colors.PRIMARY : "",
                  color: isTopicSelected(item) ? Colors.WHITE : Colors.PRIMARY,
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </Pressable>

      {selectedTopics?.length > 0 && (
        <Button
          text="Generate Course"
          onPress={() => onGenerateCourse()}
          loading={loading}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    fontSize: 18,
    alignItems: "flex-start",
  },
});

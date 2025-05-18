import Button from "@/components/Shared/Button";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { ChapterType } from "@/types/Course.types";
import { router, useLocalSearchParams } from "expo-router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ChapterView() {
  const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
  const chapters: ChapterType = JSON.parse(chapterParams as string);
  const [currentPage, setCurrentPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const GetProgress = (currentPage: number) => {
    const perc = currentPage / chapters?.content?.length;
    return perc;
  };
  const onChapterComplete = async () => {
    // Save Chapter Complete
    setLoader(true);
    await updateDoc(doc(db, "Courses", docId as string), {
      completedChapter: arrayUnion(chapterIndex),
    });
    setLoader(false);
    router.replace(`/courseView/${docId}`);
  };
  return (
    <SafeAreaView
      style={{ padding: 25, backgroundColor: Colors.WHITE, flex: 1 }}
    >
      <Progress.Bar
        progress={GetProgress(currentPage)}
        width={Dimensions.get("screen").width * 0.85}
      />
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.outfitBold,
            fontSize: 20,
          }}
        >
          {chapters?.content[currentPage]?.topic}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.outfitRegular,
            fontSize: 20,
            marginTop: 7,
          }}
        >
          {chapters?.content[currentPage]?.explain}
        </Text>

        {chapters.content[currentPage]?.code && (
          <Text
            style={[
              styles.codeExampleText,
              { backgroundColor: Colors.BLACK, color: Colors.WHITE },
            ]}
          >
            {chapters.content[currentPage]?.code}
          </Text>
        )}

        {chapters.content[currentPage]?.example && (
          <Text style={styles.codeExampleText}>
            {chapters.content[currentPage].example}
          </Text>
        )}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 15,
          width: "100%",
          left: 25,
        }}
      >
        {chapters?.content?.length - 1 !== currentPage ? (
          <Button text="Next" onPress={() => setCurrentPage(currentPage + 1)} />
        ) : (
          <Button
            text="Finish"
            onPress={() => onChapterComplete()}
            loading={loader}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  codeExampleText: {
    padding: 15,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    fontFamily: Fonts.outfitRegular,
    fontSize: 18,
    marginTop: 10,
  },
});

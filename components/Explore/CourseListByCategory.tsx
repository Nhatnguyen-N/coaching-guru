import { db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import { CourseType } from "@/types/Course.types";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CourseList from "../Home/CourseList";

export default function CourseListByCategory({
  category,
}: {
  category: string;
}) {
  const [courseList, setCourseList] = useState<DocumentData[] | CourseType[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetCourseListByCategory();
  }, [category]);
  const GetCourseListByCategory = async () => {
    setCourseList([]);
    setLoading(true);
    const q = query(
      collection(db, "Courses"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot?.forEach((doc) => {
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <View>
      {/* <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 0,
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
      /> */}
      {courseList?.length > 0 && (
        <CourseList
          courseList={courseList as CourseType[]}
          category={category}
          enroll={true}
        />
      )}
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

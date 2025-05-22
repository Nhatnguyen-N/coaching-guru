import CourseListByCategory from "@/components/Explore/CourseListByCategory";
import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { CourseCategory } from "@/constant/Option";
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function Explore() {
  return (
    <FlatList
      renderItem={() => <></>}
      data={[]}
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
      ListHeaderComponent={
        <View
          style={{
            padding: 25,
            paddingTop: 45,
            backgroundColor: Colors.WHITE,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.outfitBold,
              fontSize: 30,
            }}
          >
            Explore More Courses
          </Text>
          {CourseCategory.map((item, index) => (
            <View
              key={index}
              style={{
                marginTop: 10,
              }}
            >
              <CourseListByCategory category={item} />
            </View>
          ))}
        </View>
      }
    />
  );
}

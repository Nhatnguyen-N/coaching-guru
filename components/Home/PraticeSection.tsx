import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { PraticeOption } from "@/constant/Option";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function PraticeSection() {
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.outfitBold,
          fontSize: 25,
          marginLeft: 15,
        }}
      >
        Pratice
      </Text>
      <View>
        <FlatList
          scrollEnabled={false}
          data={PraticeOption}
          numColumns={3}
          contentContainerStyle={{
            paddingLeft: 15,
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: `/practice/[type]`,
                  params: {
                    type: item?.name,
                  },
                })
              }
              key={index}
              style={{
                flex: 1,
                margin: 5,
                aspectRatio: 1,
              }}
            >
              <Image
                source={item?.image}
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: 160,
                  borderRadius: 15,
                }}
              />
              <Text
                style={{
                  position: "absolute",
                  padding: 15,
                  fontFamily: Fonts.outfitRegular,
                  fontSize: 15,
                  color: Colors.WHITE,
                }}
              >
                {item?.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

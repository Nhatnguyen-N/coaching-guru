import { auth } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import { ProfileMenu, ProfileMenuType } from "@/constant/Option";
import { useUserDetail } from "@/context/UserDetailContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function Profile() {
  const { userDetail, setUserDetail } = useUserDetail();
  const onMenuClick = (menu: ProfileMenuType) => {
    if (menu.name === "Logout") {
      signOut(auth)
        .then(() => {
          setUserDetail(null);
          router.replace("/");
          router.dismissAll();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      router.push(menu.path);
    }
  };
  return (
    <View
      style={{
        padding: 25,
        paddingTop: 45,
        flex: 1,
        // backgroundColor: Colors.WHITE,
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.outfitBold,
          fontSize: 28,
        }}
      >
        Profile
      </Text>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={{
            width: 200,
            height: 200,
          }}
        />
        <Text style={{ fontFamily: Fonts.outfitBold, fontSize: 25 }}>
          {userDetail?.name}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.outfitRegular,
            fontSize: 18,
            color: Colors.GRAY,
          }}
        >
          {userDetail?.email}
        </Text>
      </View>
      {ProfileMenu.map((item, index) => (
        <Pressable
          onPress={() => onMenuClick(item)}
          key={index}
          style={{
            flexDirection: "row",
            marginTop: 7,
            backgroundColor: Colors.WHITE,
            padding: 12,
            alignItems: "center",
            gap: 10,
            borderRadius: 12,
            shadowColor: "#000", // Màu shadow
            shadowOffset: {
              width: 0, // Shadow ngang (0 = không lệch ngang)
              height: 2, // Shadow dọc (2px ở bottom)
            },
            shadowOpacity: 0.2, // Độ mờ (0.1 = 10%)
            shadowRadius: 3, // Độ rộng blur shadow
            elevation: 1,
          }}
        >
          <View
            style={{
              padding: 12,
              backgroundColor: Colors.BG_GRAY,
              borderRadius: 12,
            }}
          >
            <Ionicons
              name={
                item?.icon === "add-outline"
                  ? "add-outline"
                  : item.icon === "book"
                  ? "book"
                  : item.icon === "analytics-outline"
                  ? "analytics-outline"
                  : item.icon === "shield-checkmark"
                  ? "shield-checkmark"
                  : "log-out"
              }
              color={Colors.PRIMARY}
              size={24}
            />
          </View>
          <Text>{item?.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

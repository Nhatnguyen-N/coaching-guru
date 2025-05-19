import Colors from "@/constant/Colors";
import { useUserDetail } from "@/context/UserDetailContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Fonts from "../../constant/Fonts";
export default function Header() {
  const { userDetail, setUserDetail } = useUserDetail();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: Fonts.outfitBold,
            fontSize: 25,
            color: Colors.WHITE,
          }}
        >
          Hello, {userDetail?.name}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.outfitRegular,
            fontSize: 17,
            color: Colors.WHITE,
          }}
        >
          Let&apos;s Get Started
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={32} color={"black"} />
      </TouchableOpacity>
    </View>
  );
}

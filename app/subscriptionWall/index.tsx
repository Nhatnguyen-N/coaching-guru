import Colors from "@/constant/Colors";
import Fonts from "@/constant/Fonts";
import React, { useState } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionWall() {
  const [selectedPlan, setSelectedPlan] = useState<boolean | null>(null);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Image
        source={require("../../assets/images/edu.png")}
        style={{
          height: 280,
          width: "100%",
        }}
      />
      <View
        style={{
          padding: 25,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.outfitBold,
            fontSize: 25,
            textAlign: "center",
          }}
        >
          Get started with our Standard plan
        </Text>
        <View
          style={{
            backgroundColor: Colors.BG_GRAY,
            padding: 20,
            paddingHorizontal: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 35,
            borderRadius: 20,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.outfitBold,
              fontSize: 16,
            }}
          >
            Standard
          </Text>
          <Text
            style={{
              fontFamily: Fonts.outfitBold,
              fontSize: 16,
            }}
          >
            Premium
          </Text>
        </View>
        <View
          style={{
            margin: 10,
            gap: 3,
          }}
        >
          <Text>✔️ Access to 30 cinematic LUTs.</Text>
          <Text>✔️ Pro fonts end transition effects.</Text>
          <Text>✔️ 10+ templates.</Text>
        </View>

        <Pressable
          onPress={() => setSelectedPlan(!selectedPlan)}
          style={[
            {
              padding: 10,
              paddingVertical: 15,
              backgroundColor: selectedPlan
                ? Colors.LIGHT_GREEN
                : Colors.BG_GRAY,

              borderColor: selectedPlan ? Colors.GREEN : Colors.GRAY,
              borderWidth: 1,
              borderRadius: 10,
              width: Dimensions.get("screen").width * 0.85,
            },
          ]}
        >
          <Text style={{ fontFamily: Fonts.outfitBold, fontSize: 18 }}>
            Annual
          </Text>
          <Text style={{ fontFamily: Fonts.outfitRegular, fontSize: 15 }}>
            Full access for just $3.99/yr
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedPlan(!selectedPlan)}
          style={[
            {
              marginTop: 10,
              padding: 10,
              paddingVertical: 15,
              backgroundColor: !selectedPlan
                ? Colors.LIGHT_GREEN
                : Colors.BG_GRAY,

              borderColor: !selectedPlan ? Colors.GREEN : Colors.GRAY,
              borderWidth: 1,
              borderRadius: 10,
              width: Dimensions.get("screen").width * 0.85,
            },
          ]}
        >
          <Text style={{ fontFamily: Fonts.outfitBold, fontSize: 18 }}>
            Monthly
          </Text>
          <Text style={{ fontFamily: Fonts.outfitRegular, fontSize: 15 }}>
            Full access for just $4.99/mo
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: Dimensions.get("screen").width * 0.85,
            backgroundColor: Colors.GREEN,
            alignItems: "center",
            marginTop: 20,
            paddingVertical: 15,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: Colors.WHITE,
              fontSize: 18,
              fontFamily: Fonts.outfitBold,
            }}
          >
            Continue
          </Text>
        </Pressable>
        <Pressable
          style={{
            marginTop: 5,
          }}
        >
          <Text style={{ color: Colors.GRAY, fontFamily: Fonts.outfitBold }}>
            Cancel
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

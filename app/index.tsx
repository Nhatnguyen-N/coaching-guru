import { auth, db } from "@/config/firebaseConfig";
import { useUserDetail } from "@/context/UserDetailContext";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constant/Colors";
export default function Index() {
  const { userDetail, setUserDetail } = useUserDetail();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const result = await getDoc(doc(db, "users", user.email!));

      if (result.exists()) {
        const data = result.data();
        setUserDetail({
          uid: data.uid,
          email: data.email,
          name: data.name || "", // Xử lý trường optional
          member: data.member ?? false, // Nullish coalescing
        });
      }
      router.replace("/(tabs)/home");
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Image
        source={require("../assets/images/landing.png")}
        resizeMode="contain"
        style={{
          width: "100%",
          height: 300,
          marginTop: 70,
        }}
      />
      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit-blod",
          }}
        >
          Welcome to Coaching Guru
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: Colors.WHITE,
            marginTop: 20,
            textAlign: "center",
            fontFamily: "outfit",
          }}
        >
          Transform your ideas into engaging educational content, effortlessly
          with AI! 📚🤖
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/auth/signUp")}
          style={styles.button}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/auth/signIn")}
          style={[
            styles.button,
            {
              backgroundColor: Colors.PRIMARY,
              borderWidth: 1,
              borderColor: Colors.WHITE,
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: Colors.WHITE,
              },
            ]}
          >
            Already have an Account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "outfit",
  },
});

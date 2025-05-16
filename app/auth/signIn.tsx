import { auth, db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import { useUserDetail } from "@/context/UserDetailContext";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userDetail, setUserDetail } = useUserDetail();
  const [loading, setLoading] = useState(false);
  const onSignInClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        await getUserDetail();
        setLoading(false);
        router.replace("/");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        Alert.alert("Incorrect Email && Password");
      });
  };

  const getUserDetail = async () => {
    const result = await getDoc(doc(db, "users", email));
    console.log(result?.data());
    if (!result.exists()) {
      setUserDetail(null);
      return;
    }
    const data = result.data();
    setUserDetail({
      uid: data.uid,
      email: data.email,
      name: data.name || "", // Xử lý trường optional
      member: data.member ?? false, // Nullish coalescing
    });
  };
  return (
    <View
      style={{
        alignItems: "center",
        paddingTop: 100,
        flex: 1,
        padding: 25,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: 180,
          height: 180,
        }}
      />
      <Text style={{ fontSize: 30, fontFamily: "outfit-bold" }}>
        Welcome Back
      </Text>
      {/* <TextInput
            style={styles.textInput}
            placeholder="Full Name"
            placeholderTextColor={"grey"}
          /> */}
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor={"grey"}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor={"grey"}
        onChangeText={(value) => setPassword(value)}
      />
      <TouchableOpacity
        onPress={onSignInClick}
        disabled={loading}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          width: "100%",
          marginTop: 25,
          borderRadius: 10,
        }}
      >
        {!loading ? (
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 20,
              color: Colors.WHITE,
              textAlign: "center",
            }}
          >
            Sign In
          </Text>
        ) : (
          <ActivityIndicator size={"large"} color={Colors.WHITE} />
        )}
      </TouchableOpacity>
      <View
        style={{ display: "flex", flexDirection: "row", gap: 5, marginTop: 20 }}
      >
        <Text style={{ fontFamily: "outfit" }}>
          Don&apos;t have an account?
        </Text>
        <Pressable onPress={() => router.push("/auth/signUp")}>
          <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-bold" }}>
            Create New Here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
});

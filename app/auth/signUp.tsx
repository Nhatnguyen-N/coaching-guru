import Colors from "@/constant/Colors";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../config/firebaseConfig";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const CreateNewAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log(user);
        await SaveUser(user);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const SaveUser = async (user: any) => {
    await setDoc(doc(db, "users", email), {
      name: fullName,
      email: email,
      member: false,
      uid: user?.uid,
    });

    // Mavigate to New Screen
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
        Create New Account
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Full Name"
        placeholderTextColor={"grey"}
        onChangeText={(value) => setFullName(value)}
      />
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
        onPress={CreateNewAccount}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          width: "100%",
          marginTop: 25,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: "center",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
      <View
        style={{ display: "flex", flexDirection: "row", gap: 5, marginTop: 20 }}
      >
        <Text style={{ fontFamily: "outfit" }}>Already have an account?</Text>
        <Pressable onPress={() => router.push("/auth/signIn")}>
          <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-bold" }}>
            Sign In Here
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

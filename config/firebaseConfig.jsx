// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAQ0E9h20187W9WK8tEC86u317zS6Wxug",
  authDomain: "coarching-app.firebaseapp.com",
  projectId: "coarching-app",
  storageBucket: "coarching-app.firebasestorage.app",
  messagingSenderId: "375613413806",
  appId: "1:375613413806:web:7911d17728aa34e461d03f",
  measurementId: "G-L0W1K330DG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

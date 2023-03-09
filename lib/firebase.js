// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLaeI_dSmrHz3MhTqPNqoWzxQNLM-Skjc",
  authDomain: "cnc-news-d7d50.firebaseapp.com",
  projectId: "cnc-news-d7d50",
  storageBucket: "cnc-news-d7d50.appspot.com",
  messagingSenderId: "79226945663",
  appId: "1:79226945663:web:d39c6a8d796d547749ff4a",
  measurementId: "G-6R3E8LQNQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

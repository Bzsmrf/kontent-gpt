
// import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import firebase from "firebase/compat/app";
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBhMT7zQ_6rLLPZuLUfzvkKhRAWFT_acxE",
    authDomain: "kontent-gpt.firebaseapp.com",
    databaseURL: "https://kontent-gpt-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kontent-gpt",
    storageBucket: "kontent-gpt.appspot.com",
    messagingSenderId: "130216563574",
    appId: "1:130216563574:web:915d78633ca35874106057",
    measurementId: "G-KMZF81ZMSZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };

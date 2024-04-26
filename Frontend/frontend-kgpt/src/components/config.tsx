
// import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import firebase from "firebase/compat/app";
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCf0y1Jx0YJw5zajae3s4DC7SV_OsjuIB4",
    authDomain: "kontent-gpt-3cb4b.firebaseapp.com",
    projectId: "kontent-gpt-3cb4b",
    storageBucket: "kontent-gpt-3cb4b.appspot.com",
    messagingSenderId: "1039058408790",
    appId: "1:1039058408790:web:954b1fcbf556205a0fb2f7",
    measurementId: "G-61Q9CPE6YY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };

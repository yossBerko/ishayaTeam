// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {} from "firebase/auth";
import {} from "firebase/database";
import {} from "firebase/firestore";
import {} from "firebase/functions";
import {} from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDwmIriHQhkCvXbe6VYZGp08WUc8uVQ_K0",
    authDomain: "ishayateam.firebaseapp.com",
    projectId: "ishayateam",
    storageBucket: "ishayateam.appspot.com",
    messagingSenderId: "477279214151",
    appId: "1:477279214151:web:f3379b6f26a5ead61caf62",
    measurementId: "G-FWPT23FEMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
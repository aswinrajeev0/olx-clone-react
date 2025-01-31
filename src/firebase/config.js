// Import the functions you need from the SDKs you need
import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const key = import.meta.env.VITE_FIREBASE_KEY;

const firebaseConfig = {
    apiKey: key,
    authDomain: "olx-clone-49346.firebaseapp.com",
    projectId: "olx-clone-49346",
    storageBucket: "olx-clone-49346.appspot.com",
    messagingSenderId: "216154679585",
    appId: "1:216154679585:web:9c0331fe027645748bb660"
};
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase)
const db = getFirestore(firebase)
const storage = getStorage(firebase)
export { auth, db, storage }
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNGA5b2FxMmHsbn1A0trJJcrgXhhj7uXg",
  authDomain: "instagram-16212.firebaseapp.com",
  projectId: "instagram-16212",
  storageBucket: "instagram-16212.appspot.com",
  messagingSenderId: "351486734435",
  appId: "1:351486734435:web:5a2c3b01477ac0ac904856",
  measurementId: "G-HBTP42L46X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore();
const storage=getStorage();
export {db,storage}



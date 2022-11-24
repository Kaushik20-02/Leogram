// Import the functions you need from the SDKs you need
import { getApp, getApps,initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage' 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWX5ZApr1XePbsbMezHn2BG7K0MzUnxIg",
  authDomain: "insta-53163.firebaseapp.com",
  projectId: "insta-53163",
  storageBucket: "insta-53163.appspot.com",
  messagingSenderId: "830263747321",
  appId: "1:830263747321:web:7f1c6b0e174bf968bb3828"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
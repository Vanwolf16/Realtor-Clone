
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG0GCYql8lDzlAN8Pms3taGeqOwvXpjzI",
  authDomain: "realtor-clone-7abe6.firebaseapp.com",
  projectId: "realtor-clone-7abe6",
  storageBucket: "realtor-clone-7abe6.appspot.com",
  messagingSenderId: "655770139273",
  appId: "1:655770139273:web:b5c7afc3d20452ff1ae458",
  measurementId: "G-D1YWCTKMSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore()

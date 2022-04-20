import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqu5vcN5lglM_9DDz3YxDZQ4BTPS__6uA",
  authDomain: "ky-2022.firebaseapp.com",
  projectId: "ky-2022",
  storageBucket: "ky-2022.appspot.com",
  messagingSenderId: "601131607561",
  appId: "1:601131607561:web:28a7dfcb9fb52f28cdfad8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth();

// firestore
export const db = getFirestore();

// storage
export const storage = getStorage(app);
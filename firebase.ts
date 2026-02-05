
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChIh5JKh3kroSaAPhZ_-L8nDzVu58OeLo",
  authDomain: "elite-app-5762a.firebaseapp.com",
  projectId: "elite-app-5762a",
  storageBucket: "elite-app-5762a.firebasestorage.app",
  messagingSenderId: "1060791207545",
  appId: "1:1060791207545:web:e9740a432142151b56b6a8",
  measurementId: "G-JKY4T43EHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

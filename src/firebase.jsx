// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLIotrz42mxVvZQe7VMROLMiZdQzOYvEg",
  authDomain: "netag-test.firebaseapp.com",
  databaseURL: "https://netag-test-default-rtdb.firebaseio.com",
  projectId: "netag-test",
  storageBucket: "netag-test.appspot.com",
  messagingSenderId: "485872082237",
  appId: "1:485872082237:web:2b9b1891cfeff8356bb954",
  measurementId: "G-QXC29FVHS8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, auth, database, storage, firestore };

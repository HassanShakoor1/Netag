// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC5h_8FSLcG2fKkIpejRno8ZlwfufM3D3M",
  authDomain: "business-54df9.firebaseapp.com",
  projectId: "business-54df9",
  storageBucket: "business-54df9.appspot.com",
  messagingSenderId: "1055277060346",
  appId: "1:1055277060346:web:a30d745972271d3dbe3943"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, auth, database, storage, firestore }; 

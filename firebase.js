import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

import { getFirestore, doc, setDoc, getDoc, addDoc, collection, getDocs, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCnraeG7vpPbkJyciczNnJkrhVB5dmyoU4",
  authDomain: "quiz-app-feeae.firebaseapp.com",
  projectId: "quiz-app-feeae",
  storageBucket: "quiz-app-feeae.firebasestorage.app",
  messagingSenderId: "456343118115",
  appId: "1:456343118115:web:c559b7d4e2bb21f0286c96",
  measurementId: "G-Q67KC6QL4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export {
  app,
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  signInWithEmailAndPassword,
  getDoc,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  query, where
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV_1La6l6ONUxLyJFAcNAiJGgT5r_xLRY",
  authDomain: "classy-clothing-db.firebaseapp.com",
  projectId: "classy-clothing-db",
  storageBucket: "classy-clothing-db.appspot.com",
  messagingSenderId: "46098035528",
  appId: "1:46098035528:web:8fda5d8e65f18cd034b97d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth)
    return;
  
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // if not exists, create
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef,
        { displayName, email, createdAt });
    }
    catch (err) {
      console.log("error creating the user", err.message);
    }

    return userDocRef;

  }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) 
    return;
  
  return createUserWithEmailAndPassword(auth, email, password);
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

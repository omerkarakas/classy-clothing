// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  console.log(objectsToAdd);
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  });

  await batch.commit();
  console.log("loaded");

}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  
  return categoryMap;

}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo={}) => {
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
        {
          displayName, email, createdAt,
          ...additionalInfo
        });
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

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
  if (!email || !password) 
    return;

  return signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
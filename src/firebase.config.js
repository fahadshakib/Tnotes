import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth , onAuthStateChanged} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAIfBtawJ5wOl64b9AyQy4qdHHql3Mo-Ow",
  authDomain: "tnotes-11e86.firebaseapp.com",
  projectId: "tnotes-11e86",
  storageBucket: "tnotes-11e86.appspot.com",
  messagingSenderId: "480755816847",
  appId: "1:480755816847:web:c5409dcf6fcaac4ec0d3fa"
};


export const COLLECTION_USERS = 'users';
export const COLLECTION_NOTES = 'notes';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export const authStateChangedListener = (fn) => onAuthStateChanged(auth , fn);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  // signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPKKuUHlC4BwPpKrkygz6ae499SZ3jDmo",
  authDomain: "vichaar-b83bc.firebaseapp.com",
  projectId: "vichaar-b83bc",
  storageBucket: "vichaar-b83bc.appspot.com",
  messagingSenderId: "834540914992",
  appId: "1:834540914992:web:302fceee87dafb2487e0f5",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// export function signIn() {
//   return signInWithEmailAndPassword(email, password);
// }

// export function signUp() {
//   return createUserWithEmailAndPassword(auth, email, password);
// }

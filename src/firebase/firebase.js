import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDIgv41dwonLQHn_H3oblp8Nicpm_nRggs",
  authDomain: "dactilus-12bc4.firebaseapp.com",
  projectId: "dactilus-12bc4",
  storageBucket: "dactilus-12bc4.appspot.com",
  messagingSenderId: "474280065419",
  appId: "1:474280065419:web:3e9890d9bb67b3acd6d78e",
  measurementId: "G-3LDHLXJ2EP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

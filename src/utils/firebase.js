
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDX-JOn4J_QJRnD7Fw35gG9OsdN_sythRY",
  authDomain: "tenedores-v2-a1df2.firebaseapp.com",
  projectId: "tenedores-v2-a1df2",
  storageBucket: "tenedores-v2-a1df2.appspot.com",
  messagingSenderId: "858344445442",
  appId: "1:858344445442:web:c1634d80fba165967d391b"
};


export const iniFirebase= initializeApp(firebaseConfig);
export const db = getFirestore(iniFirebase);
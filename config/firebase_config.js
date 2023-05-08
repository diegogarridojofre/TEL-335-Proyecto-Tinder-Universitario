import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCBAeUezcu5Su3A-nB0igaOfzETP7VtQy0",
  authDomain: "tinderusm-68d24.firebaseapp.com",
  projectId: "tinderusm-68d24",
  storageBucket: "tinderusm-68d24.appspot.com",
  messagingSenderId: "17737061134",
  appId: "1:17737061134:web:e4767824b1a9cd80cd7d5f",
  measurementId: "G-7CKLY5TB5T",
};
initializeApp(firebaseConfig);
const db = getFirestore();
export { db };

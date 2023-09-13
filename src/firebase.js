import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAwZG1MEh8P1OCiPxmKabEQfGW1F6Lgbbw",
  authDomain: "chat-app-c1cbc.firebaseapp.com",
  projectId: "chat-app-c1cbc",
  storageBucket: "chat-app-c1cbc.appspot.com",
  messagingSenderId: "766800444184",
  appId: "1:766800444184:web:a4aaad1163260bcec03c6d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
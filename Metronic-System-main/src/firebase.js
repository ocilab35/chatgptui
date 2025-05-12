import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSD30QDdLxH_pa968ss6e4zDoGxQQmWl8",
  authDomain: "plantsauthapp.firebaseapp.com",
  projectId: "plantsauthapp",
  storageBucket: "plantsauthapp.firebasestorage.app",
  messagingSenderId: "905044278924",
  appId: "1:905044278924:web:c4e31194398b7f7181c5a9",
  measurementId: "G-D88WSXJ4K9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as signInWithFirebase,
  signOut as signOutFromFirebase,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      id: result.user.uid,
      name: result.user.displayName || "",
      email: result.user.email || "",
      imageUrl: result.user.photoURL || "",
      providerType: "google",
    };
  } catch (error) {
    console.error("Google sign in error:", error);
    throw error;
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      id: userCredential.user.uid,
      name: name,
      email: email,
      imageUrl: null,
      providerType: "email",
    };
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithFirebase(auth, email, password);

    return {
      id: userCredential.user.uid,
      name: userCredential.user.displayName || "",
      email: userCredential.user.email || "",
      imageUrl: userCredential.user.photoURL || null,
      providerType: "email",
    };
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await signOutFromFirebase(auth);
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};

export { auth };

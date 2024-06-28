// lib/firebaseClient.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut as firebaseSignOut,
  AuthErrorCodes,
  linkWithCredential,
} from "firebase/auth";

// Configuration Object for Firebase with default values or checks
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "default-api-key",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "default-auth-domain",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "default-project-id",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "default-storage-bucket",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    "default-messaging-sender-id",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "default-app-id",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "default-measurement-id",
};

// Safe initialization of the Firebase App
let app;
try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} catch (error) {
  console.error("Failed to initialize Firebase: ", error);
  // Additional fallback or error handling logic could go here
}

// Initialize Firebase Authentication
const auth = getAuth(app);
auth.useDeviceLanguage();

// Functions to handle authentication
export async function signIn() {
  const provider = new GoogleAuthProvider();
  try {
    return await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("Sign-in failed: ", error);
    throw error;
  }
}

export async function signOut() {
  try {
    return await firebaseSignOut(auth);
  } catch (error) {
    console.error("Sign-out failed: ", error);
    throw error;
  }
}

// Export configurations and error codes for external use
export { app, auth, AuthErrorCodes, linkWithCredential };

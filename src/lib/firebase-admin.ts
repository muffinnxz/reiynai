// lib/firebaseAdmin.ts
import * as admin from "firebase-admin";
import { cert } from "firebase-admin/app";

// Function to initialize Firebase Admin
function initializeFirebaseAdmin() {
  if (!admin.apps.length) {
    try {
      const app = admin.initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
        } as admin.ServiceAccount),
        databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
      });
      console.log("Firebase Admin initialized successfully");
      return app;
    } catch (error) {
      console.error("Firebase admin initialization error", error);
      // Optionally, implement more complex error handling here
    }
  }
}

const adminApp = initializeFirebaseAdmin();

export default adminApp;

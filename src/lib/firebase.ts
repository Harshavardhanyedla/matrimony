import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  sendPasswordResetEmail,
  signOut,
  UserCredential
} from 'firebase/auth';

// Firebase configuration for project: soumatch-5782e
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSy_SoulMatch_soumatch-5782e",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "soumatch-5782e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "soumatch-5782e",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "soumatch-5782e.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "248987124974",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:248987124974:web:soumatch5782e"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Firebase Auth Helpers
export async function loginWithEmail(email: string, pass: string): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, pass);
}

export async function signUpWithEmail(email: string, pass: string): Promise<UserCredential> {
  return await createUserWithEmailAndPassword(auth, email, pass);
}

export async function loginWithGoogle(): Promise<UserCredential> {
  return await signInWithPopup(auth, googleProvider);
}

export async function loginWithFacebook(): Promise<UserCredential> {
  return await signInWithPopup(auth, facebookProvider);
}

export async function resetPassword(email: string): Promise<void> {
  return await sendPasswordResetEmail(auth, email);
}

export async function logoutFirebase(): Promise<void> {
  return await signOut(auth);
}

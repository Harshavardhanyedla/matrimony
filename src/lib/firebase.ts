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

// Firebase configuration (uses environment variables or demo fallback)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoSoulMatchApiKey123456789",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "soulmatch-matrimony.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "soulmatch-matrimony",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "soulmatch-matrimony.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "109876543210",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:109876543210:web:abcdef123456"
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

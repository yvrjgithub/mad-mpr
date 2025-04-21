import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA5eVaeF74i8okuQSu01z3Zj_05Cm0hses",
  authDomain: "shoe-flutter-app.firebaseapp.com",
  projectId: "shoe-flutter-app",
  storageBucket: "shoe-flutter-app.firebasestorage.app",
  messagingSenderId: "225253582725"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
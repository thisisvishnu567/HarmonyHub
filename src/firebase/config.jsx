import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA-SwDDgaDDqrIGDn9uw5sR_vyfovG_80E",
    authDomain: "clone-ab7af.firebaseapp.com",
    projectId: "clone-ab7af",
    storageBucket: "clone-ab7af.firebasestorage.app",
    messagingSenderId: "164087288572",
    appId: "1:164087288572:web:b3f5b1187d3c196b2d7d79",
    measurementId: "G-0YVVZEE5H7"
  };
  

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

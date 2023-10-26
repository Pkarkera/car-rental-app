// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Optionally import the services that you want to use
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC-HLsnhAZkeJJ-avUt3TzcO34yCIL-wgw",
  authDomain: "rentalapp-e00cc.firebaseapp.com",
  projectId: "rentalapp-e00cc",
  storageBucket: "rentalapp-e00cc.appspot.com",
  messagingSenderId: "105289838620",
  appId: "1:105289838620:web:822f0d7493cfb78af26fd9",
  measurementId: "G-XWTEXT3W0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };

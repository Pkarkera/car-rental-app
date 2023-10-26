// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Optionally import the services that you want to use
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration (Naitik)
// const firebaseConfig = {
//   apiKey: 'AIzaSyB3oTV1dp5h-8VSiJpOx0JOv2fvgzQc8Qc',
//   authDomain: 'group07-project-rn.firebaseapp.com',
//   projectId: 'group07-project-rn',
//   storageBucket: 'group07-project-rn.appspot.com',
//   messagingSenderId: '565444894885',
//   appId: '1:565444894885:web:ee4335d4b665b5edd12d4c',
// };

//Dilpreet firebase config
// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: 'AIzaSyBZkM7ZwPgFaly36o7pWnbTdWPTQ-ut-v4',
  // authDomain: 'ownerappg07.firebaseapp.com',
  // projectId: 'ownerappg07',
  // storageBucket: 'ownerappg07.appspot.com',
  // messagingSenderId: '222437232722',
  // appId: '1:222437232722:web:40eeaa6b4c36983be4cf8b',
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

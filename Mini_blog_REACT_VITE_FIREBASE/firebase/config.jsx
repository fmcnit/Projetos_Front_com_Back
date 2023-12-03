// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBj184_rd41AX-iKt_WkcezxLLldmF0BA",
  authDomain: "miniblog-d78dd.firebaseapp.com",
  projectId: "miniblog-d78dd",
  storageBucket: "miniblog-d78dd.appspot.com",
  messagingSenderId: "942334834248",
  appId: "1:942334834248:web:6d192f0a7e68741690ca7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }
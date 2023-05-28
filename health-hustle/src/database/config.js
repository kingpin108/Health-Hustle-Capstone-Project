// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4DfehYkyLbBu1Zu5setdLZZFR6AFO2Ic",
  authDomain: "health-hustle-88599.firebaseapp.com",
  projectId: "health-hustle-88599",
  storageBucket: "health-hustle-88599.appspot.com",
  messagingSenderId: "381651592516",
  appId: "1:381651592516:web:5ef7b538addb6e36fda311",
  measurementId: "G-Y2EN9754P7"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };
export const db = getFirestore(app);
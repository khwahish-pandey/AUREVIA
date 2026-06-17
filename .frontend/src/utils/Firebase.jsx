import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aurevia-3d99e.firebaseapp.com",
  projectId: "aurevia-3d99e",
  storageBucket: "aurevia-3d99e.firebasestorage.app",
  messagingSenderId: "548096427602",
  appId: "1:548096427602:web:2e46565ccb518432fcc18b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
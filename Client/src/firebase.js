// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
     apiKey: import.meta.env.VITE_API_KEY,
     authDomain: "mern-blog-6f4b8.firebaseapp.com",
     projectId: "mern-blog-6f4b8",
     storageBucket: "mern-blog-6f4b8.appspot.com",
     messagingSenderId: "218393380368",
     appId: "1:218393380368:web:620cf0458dc39017dbec95"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
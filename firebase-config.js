import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your real web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeY_GfWUbs5_2N65nBUnaq-_LISaRXHgc",
  authDomain: "vidio-app-da061.firebaseapp.com",
  projectId: "vidio-app-da061",
  storageBucket: "vidio-app-da061.firebasestorage.app",
  messagingSenderId: "568321387275",
  appId: "1:568321387275:web:3f7c3e12fd1c007238100e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore services for auth.js and dashboard.html
export const auth = getAuth(app);
export const db = getFirestore(app);

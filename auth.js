import { auth } from "./firebase-config.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 1. User Sign Up
export async function signUpUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Registered:", userCredential.user);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Sign up failed: " + error.message);
  }
}

// 2. User Login
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in:", userCredential.user);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
}

// 3. User Logout
export async function logoutUser() {
  await signOut(auth);
  window.location.href = "index.html";
}

// 4. Session State Observer (protect dashboard)
export function monitorAuthState(onUserLoggedIn, onUserLoggedOut) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (onUserLoggedIn) onUserLoggedIn(user);
    } else {
      if (onUserLoggedOut) onUserLoggedOut();
    }
  });
}

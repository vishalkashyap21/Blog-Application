
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getEnv } from "./getEnv"; // Custom helper to get environment variables

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "yt-mern-blog-50595.firebaseapp.com",
  projectId: "yt-mern-blog-50595",
  storageBucket: "yt-mern-blog-50595.appspot.com", // ✅ fixed typo here ('appspot.com' not 'storage.app')
  messagingSenderId: "19968562385",
  appId: "1:19968562385:web:693a363ade3b53b53de1f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export auth and provider
export { auth, provider };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDq1MWj06_uao9LPzQhXArHdHqRz3RSDrU",
  authDomain: "commit-timer-4b241.firebaseapp.com",
  projectId: "commit-timer-4b241",
  storageBucket: "commit-timer-4b241.appspot.com",
  messagingSenderId: "540365092085",
  appId: "1:540365092085:web:36993ef753d2611bc101bc",
  measurementId: "G-ZCDSM01064"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider };

export default db;
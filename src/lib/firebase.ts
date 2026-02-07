import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDT8SFEKL4uAWM19jEIxfUUX5mRzPk-YnI",
  authDomain: "servicematch-6dfed.firebaseapp.com",
  projectId: "servicematch-6dfed",
  storageBucket: "servicematch-6dfed.appspot.com", // ✅ FIXED HERE
  messagingSenderId: "938001886789",
  appId: "1:938001886789:web:205daa7434609d03237d2c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

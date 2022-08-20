import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { UserType } from "../types";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth: any = getAuth(app);

onAuthStateChanged(auth, (user: any) => {
  if (user) {
    let data: UserType = {
      uid: user.uid,
      refreshToken: user.refreshToken,
      email: user.email,
      displayName: user.displayName,
      accessToken: user.accessToken,
      photoURL: user.photoURL,
    };
  } else {
  }
});

export { app, googleProvider, auth };

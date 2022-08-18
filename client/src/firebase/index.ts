import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { store } from "../store";
import { setUser, setUserLoading } from "../store/auth";

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
  store.dispatch(setUserLoading(true));
  if (user) {
    localStorage.setItem("token", JSON.stringify(user.refreshToken));
    store.dispatch(setUser(user));
    store.dispatch(setUserLoading(false));
  } else {
    localStorage.removeItem("token");
    store.dispatch(setUserLoading(false));
  }
});

export { app, googleProvider, auth };

import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../features/user/Login";
import Signup from "../features/user/Signup";
import Layout from "../components/Layout";
import { onAuthStateChanged } from "firebase/auth";
import { UserType } from "../types";
import { auth } from "./firebase";
import { setUser } from "../features/user/userSlice";
import { useAppDispatch } from "./hooks";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
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
        return dispatch(setUser(data));
      }
    });
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

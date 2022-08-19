import React from "react";
import LogoutIcon from "../assets/icons/LogoutIcon";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { generateLogo } from "../lib/utils";
import ChatLogo from "../assets/images/chat-logo.png";
import {
  setUser,
  setUserLoading,
  useAppDispatch,
  useAppSelector,
} from "../store/auth";
import toast from "react-hot-toast";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user: any = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const logout = async () => {
    dispatch(setUserLoading(true));
    try {
      await signOut(auth);
      dispatch(setUser(false));
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
      dispatch(setUserLoading(false));
    } catch (e: any) {
      dispatch(setUserLoading(false));
      return toast.error(e.code);
    }
  };

  return (
    <div className="w-full h-4rem text-800 flex justify-content-center align-items-center">
      <div
        className="flex justify-content-between align-items-center w-full"
        style={{ maxWidth: "80rem" }}
      >
        <div className="flex align-items-center">
          <img src={ChatLogo} alt="logo" />
          <h3 className="ml-1 mb-0"> ChatApp</h3>
        </div>
        <div className="flex align-items-center">
          {user?.photoURL ? (
            <img
              width={40}
              className="border-circle mr-2"
              src={user?.photoURL}
              alt="logo"
            />
          ) : (
            <span className="surface-300 p-2 border-circle text-indigo-400 mr-2">
              {generateLogo(user?.displayName)}
            </span>
          )}

          <span className="mr-4 text-sm hidden sm:flex">
            {user?.displayName.toUpperCase()}
          </span>
          <button
            onClick={logout}
            className="flex justify-content-center align-items-center surface-200 cursor-pointer p-1"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

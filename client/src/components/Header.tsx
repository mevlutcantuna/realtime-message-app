import React from "react";
import LogoutIcon from "../assets/icons/LogoutIcon";
import { signOut } from "firebase/auth";
import { auth } from "../app/firebase";
import { useNavigate } from "react-router-dom";
import { generateLogo } from "../lib/utils";
import ChatLogo from "../assets/images/chat-logo.png";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser, UserStateType } from "../features/user/userSlice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector<UserStateType>((state) => state.user);
  const dispatch = useAppDispatch();

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      dispatch(setUser(null));
      navigate("/login", { replace: true });
    } catch (e: any) {
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
            <span className="surface-300 p-2 border-circle text-indigo-400 mr-2 w-3rem h-3rem flex align-items-center justify-content-center">
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

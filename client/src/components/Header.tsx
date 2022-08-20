import React from "react";
import LogoutIcon from "../assets/icons/LogoutIcon";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { generateLogo } from "../lib/utils";
import ChatLogo from "../assets/images/chat-logo.png";
import toast from "react-hot-toast";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    } catch (e: any) {
      return toast.error(e.code);
    }
  };

  const mockUser = {
    displayName: "Mevlüt Can",
    photoURL: null,
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
          {mockUser?.photoURL ? (
            <img
              width={40}
              className="border-circle mr-2"
              src={mockUser?.photoURL}
              alt="logo"
            />
          ) : (
            <span className="surface-300 p-2 border-circle text-indigo-400 mr-2">
              {generateLogo(mockUser?.displayName)}
            </span>
          )}

          <span className="mr-4 text-sm hidden sm:flex">
            {mockUser?.displayName.toUpperCase()}
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

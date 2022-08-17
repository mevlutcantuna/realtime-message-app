import React from "react";
import LogoutIcon from "../assets/icons/LogoutIcon";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { generateLogo } from "../lib/utils";
import { UserType } from "../types";

interface Props {
    user: UserType | null;
}

const Header: React.FC<Props> = ({ user }) => {
    const navigate = useNavigate();

    const logout = () => {
        signOut(auth);
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    return (
        <div className="w-full h-4rem text-800 flex justify-content-center align-items-center">
            <div
                className="flex justify-content-between align-items-center w-full"
                style={{ maxWidth: "80rem" }}
            >
                <h3>MessageApp</h3>
                <div className="flex align-items-center">
                    {user?.photoURL ? (
                        <img width={40} className="border-circle mr-2" src={user?.photoURL} alt="logo" />
                    ) : (
                        <span className="surface-300 p-2 border-circle text-indigo-400 mr-2">
                            {generateLogo(user?.displayName)}
                        </span>
                    )}
                    <span className="mr-4">{user?.displayName}</span>
                    <button
                        onClick={logout}
                        className="flex justify-content-center align-items-center surface-50 cursor-pointer p-1"
                    >
                        <LogoutIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;

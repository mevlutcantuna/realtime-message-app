import React from "react";
import Header from "../components/Header";
import { ProgressSpinner } from "primereact/progressspinner";
import SideBar from "../components/SideBar";
import ChatRoom from "../components/ChatRoom";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
    const loading = useSelector<any>((state) => state.auth.loading);
    const user = useSelector<any>((state) => state.auth.user);

    if (loading || !user)
        return (
            <div className="w-full mt-30 flex align-items-center justify-content-center spinner">
                <ProgressSpinner
                    style={{ width: "50px", height: "50px", margin: "15rem" }}
                    strokeWidth="8"
                    fill="#fff"
                    animationDuration="1s"
                />
            </div>
        );

    return (
        <div className="w-full min-h-screen surface-200 px-2">
            <Header />
            <div
                className="flex mx-auto mt-4"
                style={{ maxWidth: "80rem" }}
            >
                <SideBar />
                <ChatRoom />
            </div>
        </div>
    );
};

export default Home;

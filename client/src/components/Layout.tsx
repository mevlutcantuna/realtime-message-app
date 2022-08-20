import React from "react";
import Header from "./Header";
import { ProgressSpinner } from "primereact/progressspinner";
import SideBar from "../features/room/SideBar";
import ChatRoom from "../features/chat/ChatRoom";
import { useAppSelector } from "../app/hooks";
import { UserStateType } from "../features/user/userSlice";

const Home: React.FC = () => {
  const { user } = useAppSelector<UserStateType>((state) => state.user);

  // if loading or non-user, show loading component
  if (!user)
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
      <div className="flex mx-auto mt-4">
        <SideBar />
        <ChatRoom />
      </div>
    </div>
  );
};

export default Home;

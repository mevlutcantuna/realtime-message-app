import React from "react";
import Header from "../components/Header";
import { ProgressSpinner } from "primereact/progressspinner";
import SideBar from "../components/SideBar";
import ChatRoom from "../components/ChatRoom";

const Home: React.FC = () => {
  let x = false;
  // if loading or non-user, show loading component

  if (x)
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

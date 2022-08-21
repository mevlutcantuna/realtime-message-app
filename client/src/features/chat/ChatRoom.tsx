import React, { useEffect, useRef } from "react";
import SendLogo from "../../assets/images/send-logo.png";
import ReceivedMessage from "../room/ReceivedMessage";
import SentMessage from "../room/SentMessage";
import ChatHeader from "./ChatHeader";

const ChatRoom: React.FC = () => {
  const messagesRef = useRef(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    (messagesRef as any)?.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  return (
    <div className="w-full w-full">
      <ChatHeader />
      <div
        className="w-full h-85vh-to-73vh bg-white border-round-xl px-3 pb-3 p-1 flex flex-column justify-content-between"
        style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
      >
        <div className="h-full overflow-scroll hide-scroll">
          <SentMessage />
          <ReceivedMessage />
          <ReceivedMessage />
          <ReceivedMessage />
          <ReceivedMessage />
          <ReceivedMessage />

          <div ref={messagesRef} />
        </div>
        <div className="flex pt-3 ">
          <input
            className="surface-200 w-full p-3 border-round-3xl"
            placeholder="Type a message"
          />
          <button className="transition-colors transition-duration-200 transition-ease-out w-3rem h-3rem ml-3 border-circle flex align-items-center justify-content-center cursor-pointer hover:bg-indigo-100">
            <img src={SendLogo} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

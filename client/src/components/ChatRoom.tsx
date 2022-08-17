import React, { useEffect, useRef } from "react";
import SendLogo from '../assets/images/send-logo.png'
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";

const ChatRoom: React.FC = () => {
  const messagesRef = useRef(null)

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    (messagesRef as any)?.current?.scrollIntoView({ behavior: 'auto' })
  }, [])

  return (
    <div className="w-full h-full">
      <div
        className="flex align-items-center w-full h-3rem pl-3 bg-white border-round-xl mb-5 "
        style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
      >
        Chat Room 1
      </div>
      <div
        className="w-full h-3rem bg-white border-round-xl p-3 flex flex-column justify-content-between"
        style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px", minHeight: "calc(100vh - 12rem)" }}
      >
        <div className="h-full overflow-scroll">
          <SentMessage />
          <ReceivedMessage />
          <ReceivedMessage />
          <ReceivedMessage />

          <div ref={messagesRef} />
        </div>
        <div className="flex">
          <input className="surface-200 w-full p-3 border-round-3xl" placeholder="Type a message" />
          <button className="w-3rem h-3rem ml-3 border-circle flex align-items-center justify-content-center cursor-pointer hover:bg-indigo-100">
            <img src={SendLogo} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

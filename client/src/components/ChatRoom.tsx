import React from "react";

const ChatRoom: React.FC = () => {
  return (
    <div className="w-full h-full">
      <div
        className="flex align-items-center w-full h-3rem pl-3 bg-white border-round-xl mb-5"
        style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
      >
        Chat Room 1
      </div>
      <div
        className="w-full h-3rem pl-3 bg-white border-round-xl py-3"
        style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px", minHeight: "calc(100vh - 12rem)" }}
      >
        chat yeri
      </div>
    </div>
  );
};

export default ChatRoom;

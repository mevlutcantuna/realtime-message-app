import React, { useEffect, useRef } from "react";
import SendLogo from "../../assets/images/send-logo.png";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import ChatHeader from "./ChatHeader";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLocation } from "react-router-dom";
import { ChatStateType, fetchRoomMessages } from "./ChatSlice";
import { UserStateType } from "../user/userSlice";
import { MessageType, UserType } from "../../types";

const ChatRoom: React.FC = () => {
  const messagesRef = useRef(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector<UserStateType>((state) => state.user);
  const { messages } = useAppSelector<ChatStateType>((state) => state.chat);
  let { search } = useLocation();
  let room_id = search.split("=")[1];

  console.log(user);

  useEffect(() => {
    if (room_id) {
      dispatch(fetchRoomMessages(room_id));
    }

    // 👇️ scroll to bottom every time messages change
    (messagesRef as any)?.current?.scrollIntoView({ behavior: "auto" });
  }, [room_id]);

  return (
    <div className="w-full w-full">
      <ChatHeader />
      <div
        className="w-full h-85vh-to-73vh bg-white border-round-xl px-3 pb-3 p-1 flex flex-column justify-content-between"
        style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
      >
        <div className="h-full overflow-scroll hide-scroll">
          {messages?.map((message: MessageType) =>
            message.user.id === (user as UserType).uid ? (
              <SentMessage key={message._id} message={message} />
            ) : (
              <ReceivedMessage key={message._id} message={message} />
            )
          )}
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

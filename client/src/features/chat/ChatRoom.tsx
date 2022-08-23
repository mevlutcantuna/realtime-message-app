import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ChatStateType, fetchRoomMessages } from "./ChatSlice";
import Messages from "./Messages";
import NoMessage from "./NoMessage";
import ChatInput from "./ChatInput";
import { useLocation } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

const ChatRoom: React.FC = () => {
  const { messages, loading } = useAppSelector<ChatStateType>(
    (state) => state.chat
  );
  const dispatch = useAppDispatch();
  const [isRoomSelected, setIsRoomSelected] = useState<boolean>(false);
  let { search } = useLocation();
  let room_id = search.split("=")[1];

  useEffect(() => {
    const getMessages = async () => {
      if (room_id) {
        const res = await dispatch(fetchRoomMessages(room_id));
        if (res.payload) {
          return setIsRoomSelected(true);
        } else {
          return setIsRoomSelected(false);
        }
      }
      setIsRoomSelected(false);
    };
    getMessages();
  }, [room_id, dispatch]);

  return (
    <div className="w-full w-full">
      <ChatHeader />
      <div
        className={`w-full h-85vh-to-73vh bg-white border-round-xl px-3 pb-3 p-1 flex flex-column ${
          messages.length <= 0
            ? "justify-content-between"
            : "justify-content-end"
        } `}
        style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
      >
        {messages.length > 0 ? <Messages /> : <NoMessage />}
        {isRoomSelected && <ChatInput />}
      </div>
    </div>
  );
};

export default ChatRoom;

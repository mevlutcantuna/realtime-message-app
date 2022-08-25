import SendLogo from "../../assets/images/send-logo.png";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UserStateType } from "../user/userSlice";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { ChatStateType, sendMessage, setChat } from "./ChatSlice";
import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  MessageType,
  ServerToClientEvents,
} from "../../types";

interface Props {
  isRoomSelected: boolean;
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
}

const ChatInput: React.FC<Props> = ({ isRoomSelected, socket }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector<UserStateType>((state) => state.user);
  const { messages } = useAppSelector<ChatStateType>((state) => state.chat);
  const { search } = useLocation();
  const room_id = search.split("=")[1];
  const [arrivalMessage, setArrivalMessage] = useState<MessageType | null>(
    null
  );

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      if (inputRef.current.value === "")
        return toast.error("Message is required");

      const data = {
        content: inputRef.current.value,
        room_id,
        user: {
          name: user?.displayName as string,
          id: user?.uid as string,
          photoURL: user?.photoURL as string,
        },
        created_date: new Date(),
      };

      const res = await dispatch(sendMessage({ ...data }));
      if (!res.payload) return toast.error("Something went wrong...");
      inputRef.current.value = "";

      //@ts-ignore
      socket?.emit("send-message", { ...data, _id: res.payload._id });
    }
  };

  useEffect(() => {
    // when user gets new message,show it
    if (arrivalMessage) {
      if (arrivalMessage.room_id === room_id) {
        const messageExists = messages.findIndex(
          (message: MessageType) => message._id === arrivalMessage._id
        );
        if (messageExists === -1) {
          dispatch(setChat(arrivalMessage));
        }
      }
    }
  }, [arrivalMessage]);

  useEffect(() => {
    //@ts-ignore
    socket?.on("get-sent-message", (data) => {
      setArrivalMessage({ ...data });
    });
  }, []);

  return (
    <div className="flex pt-3 ">
      <form className="flex pt-3 w-full" onSubmit={submit}>
        <input
          disabled={!isRoomSelected}
          ref={inputRef}
          className="surface-200 w-full p-3 border-round-3xl"
          placeholder="Type a message"
        />
        <button
          disabled={!isRoomSelected}
          type="submit"
          className="transition-colors transition-duration-200 transition-ease-out w-3rem h-3rem ml-3 border-circle flex align-items-center justify-content-center cursor-pointer hover:bg-indigo-100"
        >
          <img src={SendLogo} alt="send" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;

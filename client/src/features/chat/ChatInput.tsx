import SendLogo from "../../assets/images/send-logo.png";
import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UserStateType } from "../user/userSlice";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { sendMessage } from "./ChatSlice";

const ChatInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector<UserStateType>((state) => state.user);
  const { search } = useLocation();
  const room_id = search.split("=")[1];

  const submit = async () => {
    if (inputRef.current) {
      if (inputRef.current.value === "")
        return toast.error("Message is required");

      const data = {
        content: inputRef.current.value,
        room_id,
        user: {
          name: user?.displayName as string,
          id: user?.uid as string,
        },
        created_date: new Date(),
      };

      const res = await dispatch(sendMessage({ ...data }));
      if (!res.payload) return toast.error("Something went wrong...");

      return (inputRef.current.value = "");
    }
  };

  return (
    <div className="flex pt-3 ">
      <input
        ref={inputRef}
        className="surface-200 w-full p-3 border-round-3xl"
        placeholder="Type a message"
      />
      <button
        onClick={submit}
        className="transition-colors transition-duration-200 transition-ease-out w-3rem h-3rem ml-3 border-circle flex align-items-center justify-content-center cursor-pointer hover:bg-indigo-100"
      >
        <img src={SendLogo} alt="send" />
      </button>
    </div>
  );
};

export default ChatInput;
import React from "react";
import { generateLogo, getTime } from "../../lib/utils";
import { MessageType } from "../../types";

interface Props {
  message: MessageType;
}

const SentMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="w-full flex justify-content-end mb-3">
      <div className="w-full max-w-25rem flex flex-column px-4 pt-2 pb-3 bg-indigo-100 border-round-xl border-noround-right border-round-bottom-xl">
        <span className="text-xs text-700">{message?.user.name}</span>
        <span className="text-md text-900">{message?.content}</span>
      </div>
      <div className="flex flex-column align-items-center ml-2">
        {message?.user?.photoURL ? (
          <img
            width={40}
            height={40}
            className="border-circle mr-2"
            src={message?.user?.photoURL}
            alt="logo"
          />
        ) : (
          <span className="bg-indigo-100 p-2 border-circle text-indigo-400 w-3rem h-3rem flex align-items-center justify-content-center">
            {generateLogo(message.user?.name)}
          </span>
        )}
        <span className="mt-1">{getTime(message?.created_date as Date)}</span>
      </div>
    </div>
  );
};

export default SentMessage;

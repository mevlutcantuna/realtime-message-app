import React from "react";
import { generateLogo, getTime } from "../../lib/utils";
import { MessageType } from "../../types";

interface Props {
  message: MessageType;
}

const ReceivedMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="w-full flex mb-3">
      <div className="flex flex-column align-items-center">
        <span className="flex justify-content-center align-items-center p-3 surface-300 border-circle text-indigo-400 mr-2">
          {generateLogo(message?.user.name as string)}
        </span>
        <span className="mt-1">{getTime(message.created_date as Date)}</span>
      </div>
      <div className="w-full max-w-25rem flex flex-column px-4 pt-2 pb-3 surface-200 border-round-xl border-noround-left border-round-bottom-xl">
        <span className="text-xs text-700">{message?.user.name}</span>
        <span className="text-md text-900">{message.content}</span>
      </div>
    </div>
  );
};

export default ReceivedMessage;

import ChatBubble from "../../assets/images/chat-bubble.svg";

const NoMessage = () => {
  return (
    <div className="w-full flex flex-column pt-5 justify-content-start align-items-center">
      <img className="w-full max-w-8rem" src={ChatBubble} alt="chat-bubble" />
      <div className="mt-4 text-lg md:text-xl text-indigo-900">
        Start chat...
      </div>
    </div>
  );
};

export default NoMessage;

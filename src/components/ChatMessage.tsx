import type { Data } from "../pages/ChatRoom";

interface ChatMessageProps {
  message: Data;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  if (message.type === "user") {
    return (
      <div className="flex items-end justify-end gap-2">
        <div className="text-xs text-gray-400">{message.timestamp}</div>
        <div className="max-w-[80%] rounded-s-[16px] rounded-tr-[16px] bg-blue-400 px-4 py-3 text-white">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[14px] font-medium">{message.nickname}</p>
      <div className="flex items-end justify-start gap-2">
        <div className="max-w-[80%] rounded-e-[16px] rounded-tl-[16px] bg-gray-100 px-4 py-3 text-black">
          {message.text}
        </div>
        <div className="text-xs text-gray-400">{message.timestamp}</div>
      </div>
    </div>
  );
};

export default ChatMessage;

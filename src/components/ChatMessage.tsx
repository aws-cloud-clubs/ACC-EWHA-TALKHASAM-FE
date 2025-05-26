import type { Data } from "../pages/ChatRoom";
import profile from "../../public/profile.png";

interface ChatMessageProps {
  message: Data;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isOwner = localStorage.getItem("isOwner");
  const PROFILE_IMAGE = localStorage.getItem("profile") || profile;
  const date = new Date(message.createdAt);

  const formatted = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (message.isOwner.toString() == isOwner) {
    return (
      <div className="flex items-end justify-end gap-2">
        <div className="text-xs text-gray-400">{formatted}</div>
        <div className="max-w-[80%] rounded-s-[16px] rounded-tr-[16px] bg-blue-400 px-4 py-[10px] text-white">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      {isOwner == "false" && (
        <img src={PROFILE_IMAGE} className="w-11 h-11 rounded-full" />
      )}
      <div className="flex flex-col gap-1">
        <p className="text-[14px] font-medium">{message.nickname}</p>
        <div className="flex items-end justify-start gap-2">
          <div className="max-w-[80%] rounded-e-[16px] rounded-bl-[16px] bg-gray-100 px-4 py-[10px] text-black">
            {message.content}
          </div>
          <div className="text-xs text-gray-400">{formatted}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

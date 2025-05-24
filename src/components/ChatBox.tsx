import { useEffect, useRef } from "react";
import type { Data } from "../pages/ChatRoom";
import ChatMessage from "./ChatMessage";

interface ChatBoxProps {
  history: Data[];
}

const ChatBox = ({ history }: ChatBoxProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="scrollbar-none mt-[62px] mb-[60px] flex h-screen flex-col gap-4 overflow-auto p-4 px-4">
      {history.map((message, idx) => (
        <ChatMessage message={message} key={idx} />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBox;

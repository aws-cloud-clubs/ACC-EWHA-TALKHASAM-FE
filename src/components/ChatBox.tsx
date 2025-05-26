import { useEffect, useRef } from "react";
import type { Data } from "../pages/ChatRoom";
import ChatMessage from "./ChatMessage";

interface ChatBoxProps {
  history: Data[];
  onReachTop?: () => void;
  isInitialLoad?: boolean;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

const ChatBox = ({
  history,
  onReachTop,
  isInitialLoad,
  scrollRef,
}: ChatBoxProps) => {
  const boxRef = scrollRef ?? useRef<HTMLDivElement>(null); // scrollRef 우선 사용
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box || !onReachTop) return;

    const handleScroll = () => {
      if (box.scrollTop === 0) {
        onReachTop();
      }
    };

    box.addEventListener("scroll", handleScroll);
    return () => box.removeEventListener("scroll", handleScroll);
  }, [onReachTop, boxRef]);

  useEffect(() => {
    if (isInitialLoad) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isInitialLoad]);

  return (
    <div
      className="scrollbar-none mt-[62px] mb-[60px] flex h-screen flex-col gap-4 overflow-auto p-4 px-4"
      ref={boxRef}
    >
      {history.length > 0 &&
        history.map((message, idx) => (
          <ChatMessage message={message} key={idx} />
        ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBox;

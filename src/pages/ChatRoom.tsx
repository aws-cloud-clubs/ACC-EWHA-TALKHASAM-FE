import { useEffect, useRef, useState } from "react";
import ChatBox from "../components/ChatBox";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import { createStompClient, type ChatMessage } from "../hooks/useStompClient";
import toast from "react-hot-toast";

export interface Data {
  text: string;
  type: "user" | "opponent";
  timestamp: string;
  nickname?: string;
}

const ChatRoom = () => {
  const exampleMessages: Data[] = [
    {
      type: "user",
      text: "안녕하세요!",
      timestamp: "14:20",
    },
    {
      type: "opponent",
      text: "안녕하세요, 반가워요!",
      timestamp: "14:21",
      nickname: "@@이 여친",
    },
    {
      type: "opponent",
      text: "오늘 기분은 어때요?",
      timestamp: "14:22",
      nickname: "용가리",
    },
  ];
  const chatRoomId = 3;
  const stompRef = useRef<ReturnType<typeof createStompClient> | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("토큰이 없습니다");
      return;
    }

    stompRef.current = createStompClient({
      token,
      chatRoomId,
      onMessage: (message: ChatMessage) => {
        console.log("수신된 메시지:", message);
        // 메시지 상태 처리 등...
      },
    });

    stompRef.current.activate();

    return () => {
      stompRef.current?.deactivate();
    };
  }, [chatRoomId]);
  const [data, setData] = useState<Data[]>([]);

  const [input, setInput] = useState("");

  const addMessage = (message: Data) => {
    setData((prev) => [...prev, message]);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* 헤더 */}
      <ChatHeader />
      {/* 채팅 구역 */}
      <ChatBox history={exampleMessages} />
      {/* 입력창 */}
      <ChatInput input={input} setInput={setInput} setData={addMessage} />
    </div>
  );
};

export default ChatRoom;

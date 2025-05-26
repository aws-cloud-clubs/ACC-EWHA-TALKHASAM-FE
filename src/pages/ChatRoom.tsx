import { useEffect, useRef, useState } from "react";
import ChatBox from "../components/ChatBox";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import { createStompClient, type ChatMessage } from "../hooks/useStompClient";
import Modal from "../components/Modal";
import LoginModal from "../components/LoginModal";

export interface Data {
  text: string;
  type: "user" | "opponent";
  timestamp: string;
  nickname?: string;
}

const ChatRoom = () => {
  const [modal, setModal] = useState(false);
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
      setModal(true);
    }
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
      {modal && (
        <Modal>
          <LoginModal onClose={() => setModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default ChatRoom;

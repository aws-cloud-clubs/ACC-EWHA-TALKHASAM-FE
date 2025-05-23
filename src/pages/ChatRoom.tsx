import { useState } from "react";
import ChatBox from "../components/ChatBox";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";

export interface Data {
  text: string;
  type: "user" | "opponent";
  timestamp: string;
}

const ChatRoom = () => {
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
      <ChatBox history={data} />
      {/* 입력창 */}
      <ChatInput input={input} setInput={setInput} setData={addMessage} />
    </div>
  );
};

export default ChatRoom;

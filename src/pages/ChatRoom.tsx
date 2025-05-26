import { useEffect, useRef, useState } from "react";
import ChatBox from "../components/ChatBox";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import { createStompClient, type ChatMessage } from "../hooks/useStompClient";
import Modal from "../components/Modal";
import LoginModal from "../components/LoginModal";
import { getChatMessages, getRoomInfo } from "../api/chat.api";
import { useLocation } from "react-router-dom";

export interface Data {
  content: string;
  createdAt: string;
  nickname?: string;
  isOwner: boolean;
}

const ChatRoom = () => {
  const [modal, setModal] = useState(false);
  const istoken = localStorage.getItem("token");
  const stompRef = useRef<ReturnType<typeof createStompClient> | null>(null);
  const roomId = useLocation().pathname.slice(6);
  const [startId, setStartId] = useState<null | string>(null);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (!istoken) {
      setModal(true);
      return;
    }

    getRoomInfo(roomId).then((data) => {
      setRoomName(data.chatRoomName);
      localStorage.setItem("profile", data.profileImg);
    });
    getMessages();

    // 웹소켓 연결
    const stomp = createStompClient({
      token: istoken,
      chatRoomId: roomId,
      onMessage: (msg: ChatMessage) => {
        addMessage({
          content: msg.content,
          isOwner: msg.isOwner,
          createdAt: msg.createdAt,
          nickname: msg.nickname,
        });
      },
    });

    stomp.activate();
    stompRef.current = stomp;

    return () => {
      stomp.deactivate();
    };
  }, [istoken, roomId]);

  const getMessages = () => {
    getChatMessages(roomId).then((data) => setData(data.messageList));
  };

  const [data, setData] = useState<Data[]>([]);

  const [input, setInput] = useState("");

  const addMessage = (message: Data) => {
    setData((prev) => [...prev, message]);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* 헤더 */}
      <ChatHeader name={roomName} />
      {/* 채팅 구역 */}
      <ChatBox history={data} />
      {/* 입력창 */}
      <ChatInput
        input={input}
        setInput={setInput}
        setData={addMessage}
        stompClient={stompRef.current}
      />
      {modal && (
        <Modal>
          <LoginModal onClose={() => setModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default ChatRoom;

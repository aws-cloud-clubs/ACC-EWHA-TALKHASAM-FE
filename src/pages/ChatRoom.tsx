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
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const stompRef = useRef<ReturnType<typeof createStompClient> | null>(null);
  const roomId = useLocation().pathname.slice(6);
  const [startId, setStartId] = useState<null | string>(null);
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const isOwner = localStorage.getItem("isOwner") == "true";
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) {
      setModal(true);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    console.log("여기", token);

    getRoomInfo(roomId).then((data) => {
      setRoomName(data.chatRoomName);
      localStorage.setItem("profile", data.profileImg);
    });

    getMessages();

    const stomp = createStompClient({
      token,
      chatRoomId: roomId,
      isOwner,
      userId: userId ?? undefined,
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
  }, [token, roomId]);

  const getMessages = () => {
    getChatMessages(roomId, token!).then((data) => {
      setData(data.messageList);
      setStartId(data.lastKey);
      setIsInitialLoad(true);
    });
  };

  const [data, setData] = useState<Data[]>([]);

  const [input, setInput] = useState("");

  const addMessage = (message: Data) => {
    setData((prev) => [...prev, message]);
  };

  const handleReachTop = () => {
    if (isLoading || !startId || !mainRef.current) return;
    setIsLoading(true);

    const scrollContainer = mainRef.current;
    const previousScrollHeight = scrollContainer.scrollHeight;

    getChatMessages(roomId, startId)
      .then((data) => {
        if (data?.messageList?.length) {
          setData((prev) => [...data.messageList, ...prev]);
          setStartId(data.lastKey ?? null);
          setIsInitialLoad(false);

          requestAnimationFrame(() => {
            const newScrollHeight = scrollContainer.scrollHeight;
            scrollContainer.scrollTop = newScrollHeight - previousScrollHeight;
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex h-screen flex-col">
      {/* 헤더 */}
      <ChatHeader name={roomName} />
      {/* 채팅 구역 */}
      <ChatBox
        history={data}
        onReachTop={handleReachTop}
        isInitialLoad={isInitialLoad}
        scrollRef={mainRef}
      />
      {/* 입력창 */}
      <ChatInput
        input={input}
        setInput={setInput}
        setData={addMessage}
        stompClient={stompRef.current}
      />
      {modal && (
        <Modal>
          <LoginModal
            onClose={() => setModal(false)}
            onLoginSuccess={(newToken) => {
              setToken(newToken);
              setModal(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default ChatRoom;

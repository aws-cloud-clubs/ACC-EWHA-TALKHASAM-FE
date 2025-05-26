import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ChatIcon from "../assets/chat.svg?react";
import type { Data } from "../pages/ChatRoom";
import type { Client } from "@stomp/stompjs"; // STOMP Client 타입 추가

interface ChatInputProps {
  input: string;
  setInput: (text: string) => void;
  setData: (message: Data) => void;
  stompClient: Client | null;
}

const ChatInput = ({
  input,
  setInput,
  setData,
  stompClient,
}: ChatInputProps) => {
  const handleMessage = () => {
    if (input.trim() === "") return;

    const now = new Date();
    const time = now.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const nickname = localStorage.getItem("nickname");
    const isOwner = localStorage.getItem("isOwner") === "true";
    const roomId = window.location.pathname.slice(6);

    const messagePayload = {
      nickname,
      isOwner,
      content: input,
    };

    console.log("[📤 SEND MESSAGE]", messagePayload);

    setData({ text: input, type: "user", timestamp: time });

    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/app/chatrooms/${roomId}/messages`,
        body: JSON.stringify(messagePayload),
        headers: {
          "content-type": "application/json",
        },
      });
    } else {
      console.warn("[STOMP] 연결되지 않았습니다.");
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !(e.nativeEvent as any).isComposing) {
      handleMessage();
    }
  };

  return (
    <div className="absolute bottom-4 flex w-full max-w-[500px] items-center gap-2 px-4">
      <input
        className="focus:ring-second_20 text-blue h-10 w-full rounded-[10px] border-[1px] border-solid border-gray-400 px-2 focus:ring-2 focus:outline-none"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        value={input}
      />
      {input === "" ? (
        <ArrowCircleUpRoundedIcon style={{ fontSize: 44, color: "#51a2ff" }} />
      ) : (
        <ChatIcon
          className="h-11 w-11 cursor-pointer"
          onClick={handleMessage}
        />
      )}
    </div>
  );
};

export default ChatInput;

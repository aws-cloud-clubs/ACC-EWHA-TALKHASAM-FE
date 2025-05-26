import SockJS from "sockjs-client";
import type { IMessage, StompSubscription } from "@stomp/stompjs";
import { Client } from "@stomp/stompjs";

export interface ChatMessage {
  nickname: string;
  isOwner: boolean;
  content: string;
  createdAt: string;
}

interface StompClientParams {
  token: string;
  chatRoomId: string;
  onMessage: (payload: ChatMessage) => void;
  isOwner: boolean;
  userId?: string;
}

export function createStompClient({
  token,
  chatRoomId,
  onMessage,
  userId,
  isOwner,
}: StompClientParams): Client {
  const stompClient = new Client({
    webSocketFactory: () =>
      new SockJS(`${import.meta.env.VITE_BASE_URL}/ws-chat`),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    debug: (str) => console.log("[STOMP]", str),
  });

  stompClient.onConnect = () => {
    const destinations: string[] = [];

    if (isOwner) {
      destinations.push(
        `/topic/chatrooms/${chatRoomId}/messages/artist`,
        `/topic/chatrooms/${chatRoomId}/messages/fans`
      );
    } else {
      destinations.push(
        `/topic/chatrooms/${chatRoomId}/messages/artist`,
        `/topic/chatrooms/${chatRoomId}/messages/user/${userId}`
      );
    }

    destinations.forEach((destination) => {
      stompClient.subscribe(destination, (message: IMessage): void => {
        try {
          const payload: ChatMessage = JSON.parse(message.body);
          onMessage(payload);
        } catch (err) {
          console.error("[STOMP] 메시지 파싱 에러:", err);
        }
      });
    });
  };

  stompClient.onStompError = (frame) => {
    console.error("[STOMP ERROR]", frame.headers["message"], frame.body);
  };

  return stompClient;
}

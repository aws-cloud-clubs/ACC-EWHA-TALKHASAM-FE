import SockJS from 'sockjs-client';
import type { IMessage, StompSubscription } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';

export interface ChatMessage {
  nickname: string;
  isOwner: boolean;
  content: string;
}

interface StompClientParams {
  token: string;
  chatRoomId: number;
  onMessage: (payload: ChatMessage) => void;
}

export function createStompClient({ token, chatRoomId, onMessage }: StompClientParams): Client {
  const stompClient = new Client({
    webSocketFactory: () => new SockJS(`${import.meta.env.VITE_BASE_URL}/ws-chat`),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    debug: (str) => console.log('[STOMP]', str),
  });

  stompClient.onConnect = () => {
    const destination = `/topic/chatrooms/${chatRoomId}/messages`;
    stompClient.subscribe(destination, (message: IMessage): StompSubscription | void => {
      try {
        const payload: ChatMessage = JSON.parse(message.body);
        onMessage(payload);
      } catch (err) {
        console.error('[STOMP] 메시지 파싱 에러:', err);
      }
    });
  };

  stompClient.onStompError = (frame) => {
    console.error('[STOMP ERROR]', frame.headers['message'], frame.body);
  };

  return stompClient;
}

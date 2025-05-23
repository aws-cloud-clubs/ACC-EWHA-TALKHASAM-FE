import { useEffect, useRef } from 'react';
import type { Data } from '../pages/ChatRoom';

interface ChatBoxProps {
  history: Data[];
}

const ChatBox = ({ history }: ChatBoxProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="scrollbar-none mt-[62px] mb-[60px] flex h-screen flex-col gap-4 overflow-auto p-4 px-4">
      {history.map((message, idx) =>
        message.type === 'user' ? (
          <div key={idx} className="flex items-end justify-end gap-2">
            <div className="text-xs text-gray-400">{message.timestamp}</div>
            <div className="max-w-[80%] rounded-s-[16px] rounded-tr-[16px] bg-blue-400 px-4 py-3 text-white">
              {message.text}
            </div>
          </div>
        ) : (
          <div key={idx} className="flex items-end justify-start gap-2">
            <div className="max-w-[80%] rounded-e-[16px] rounded-tl-[16px] bg-gray-100 px-4 py-3 text-black">
              {message.text}
            </div>
            <div className="text-xs text-gray-400">{message.timestamp}</div>
          </div>
        ),
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBox;

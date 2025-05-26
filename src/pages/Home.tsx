import Header from "../components/Header";
import banner from "../../public/Group 4.png";
import { useState } from "react";
import Modal from "../components/Modal";
import ChatMessage from "../components/ChatMessage";
import type { Data } from "./ChatRoom";
import CreateRoomModal from "../components/CreateRoomModal";

const Home = () => {
  const [modal, setModal] = useState(false);
  const exampleMessages: Data[] = [
    {
      type: "user",
      text: "점심 먹었어?",
      timestamp: "14:20",
    },
    {
      type: "opponent",
      text: "웅 @@이는?",
      timestamp: "14:21",
    },
    {
      type: "opponent",
      text: "난 못먹었지ㅜㅜ 너는?",
      timestamp: "14:22",
    },
    {
      type: "opponent",
      text: "난 못먹었지ㅜㅜ 너는?",
      timestamp: "14:22",
    },
  ];

  return (
    <div className="flex h-screen flex-col items-center gap-3 pt-[62px] w-full">
      <Header />
      <img src={banner} />
      <div className="w-full px-8 flex flex-col gap-4">
        {exampleMessages.map((message, idx) => (
          <ChatMessage message={message} key={idx} />
        ))}
      </div>

      <button
        className="absolute bottom-6 cursor-pointer rounded-[4px] bg-[#51a2ff] px-28 py-3.5 font-semibold text-white"
        onClick={() => setModal(true)}
      >
        방 만들기
      </button>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <CreateRoomModal onClose={() => setModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Home;

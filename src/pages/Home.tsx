import Header from '../components/Header';
import banner from '../../public/Group 4.png';
import { useState } from 'react';
import Modal from '../components/LoginModal';

const Home = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="flex h-screen flex-col items-center gap-3 pt-[62px]">
      <Header />
      <img src={banner} />
      <button
        className="absolute bottom-8 cursor-pointer rounded-[4px] bg-[#51a2ff] px-28 py-3.5 font-semibold text-white"
        onClick={() => setModal(true)}
      >
        방 만들기
      </button>
      {modal && <Modal onClose={() => setModal(false)} />}
    </div>
  );
};

export default Home;

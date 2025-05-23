import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const ChatHeader = () => {
  const nav = useNavigate();

  return (
    <div className="absolute top-0 flex w-full max-w-[500px] items-center justify-around border-b-2 border-gray-100 px-[6px] py-2">
      <GoArrowLeft size={24} className="m-[10px]" onClick={() => nav(-1)} />
      <div className="flex flex-1 items-center justify-center gap-2">
        {/* <img
          src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800"
          className="h-[30px] w-[30px] rounded-full"
        /> */}
        <h3 className="text-xl font-semibold text-gray-950">홍길동의 방</h3>
      </div>
      <div className="m-[10px] h-6 w-6"></div>
    </div>
  );
};

export default ChatHeader;

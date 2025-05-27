import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
interface ChatHeaderProps {
  name: string;
}

const ChatHeader = ({ name }: ChatHeaderProps) => {
  const nav = useNavigate();

  return (
    <div className="absolute top-0 flex w-full max-w-[400px] items-center justify-around border-b-2 border-gray-100 px-[6px] py-2">
      <GoArrowLeft size={24} className="m-[10px]" onClick={() => nav("/")} />
      <div className="flex flex-1 items-center justify-center gap-2">
        <h3 className="text-xl font-semibold text-gray-950">{name}</h3>
      </div>
      <div className="m-[10px] h-6 w-6"></div>
    </div>
  );
};

export default ChatHeader;

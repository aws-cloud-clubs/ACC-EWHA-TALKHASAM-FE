import logo from "../../public/logo.png";

const ChatHeader = () => {
  return (
    <div className="absolute top-0 flex w-full max-w-[400px] items-center justify-around border-b-2 border-gray-100 bg-white px-[6px] py-2">
      <img src={logo} className="h-11" />
    </div>
  );
};

export default ChatHeader;

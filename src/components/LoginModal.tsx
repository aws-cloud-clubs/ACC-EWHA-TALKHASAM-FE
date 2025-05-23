import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  onClose: () => void;
}

const Modal = ({ onClose }: ModalProps) => {
  const token = localStorage.getItem('token');
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const nav = useNavigate();

  const handleGo = () => {
    if (token) {
      nav('/1');
    } else {
      toast.error('로그인은 필수입니다!');
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-10 mx-auto flex h-screen max-w-[500px] items-center justify-center bg-black/60"
        onClick={handleOutsideClick}
      >
        <div className="flex w-[320px] flex-col items-center justify-center gap-8 rounded-2xl bg-white p-4">
          <p className="text-[18px] font-semibold">로그인 및 회원가입</p>
          <form className="flex w-full flex-col gap-[20px] px-4">
            <div className="flex flex-col gap-1">
              <span className="text-[14px] leading-[26px] font-medium">닉네임</span>
              <input
                placeholder="닉네임을 입력해주세요"
                className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 text-[14px] focus:outline-2 focus:outline-gray-500 focus:outline-none"
                autoComplete="username"
                required
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[14px] leading-[26px] font-medium">비밀번호</span>
              <input
                placeholder="4-8자리의 숫자"
                className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 text-[14px] focus:outline-2 focus:outline-gray-500 focus:outline-none"
                type="password"
                autoComplete="current-password"
                required
              ></input>
            </div>
          </form>
          <div className="flex w-full gap-3 px-4 text-[16px] font-semibold">
            <button
              className="box-border flex-1 rounded-[4px] border border-gray-500 bg-white py-[10px] text-center text-black"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="box-border flex-1 rounded-[4px] bg-blue-400 py-[10px] text-center text-white"
              onClick={handleGo}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

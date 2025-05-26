import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { postCreateRoom } from "../api/chat.api";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

interface ModalProps {
  onClose: () => void;
}

const CreateRoomModal = ({ onClose }: ModalProps) => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [roomName, setRoomName] = useState("");
  const [profile, setProfile] = useState<File>();
  const DEFAULT_IMAGE =
    "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800";
  const [preview, setPreview] = useState(DEFAULT_IMAGE);
  const isDefault = preview === DEFAULT_IMAGE;

  const handleGo = () => {
    if (!roomName || !name || !pw) {
      toast.error("모든 값을 입력해주세요");
      return;
    }

    if (!profile) {
      fetch(DEFAULT_IMAGE)
        .then((res) => res.blob())
        .then((blob) => {
          const defaultFile = new File([blob], "default.jpg", {
            type: blob.type,
          });
          return postCreateRoom(roomName, name, pw, defaultFile);
        })
        .then((data) => {
          if (data) {
            toast.success(`${roomName}방이 생성되었습니다!`);
            nav(`/room/${data.chatRoomId}`);
          }
        });
    } else {
      postCreateRoom(roomName, name, pw, profile).then((data) => {
        if (data) {
          toast.success(`${roomName}방이 생성되었습니다!`);
          nav(`/room/${data.chatRoomId}`);
        }
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setProfile(file);
    }
  };

  return (
    <div className="flex w-[320px] flex-col items-center justify-center gap-8 rounded-2xl bg-white p-4">
      <p className="text-[18px] font-semibold">방 생성하기</p>
      <form className="flex w-full flex-col gap-[20px] px-4">
        <div className="flex flex-col gap-1">
          <span className="text-[14px] leading-[26px] font-medium">
            방 이름
          </span>
          <input
            placeholder="방 이름을 입력해주세요"
            className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 text-[14px] focus:outline-2 focus:outline-gray-500 focus:outline-none"
            autoComplete="username"
            required
            onChange={(e) => setRoomName(e.target.value)}
          ></input>
        </div>
        {/* 프로필 및 닉네임 */}
        <div className="flex gap-4 items-end w-full">
          <label className="relative inline-block w-12 h-12 rounded-full overflow-hidden cursor-pointer">
            <img src={preview} className="w-full h-full object-cover" />
            {isDefault && (
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                <FaPlus className="text-sm text-gray-800" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-[14px] leading-[26px] font-medium">
              닉네임
            </span>
            <input
              placeholder="닉네임을 입력해주세요"
              className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 text-[14px] focus:outline-2 focus:outline-gray-500 focus:outline-none"
              autoComplete="username"
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <span className="text-[14px] leading-[26px] font-medium">
            비밀번호
          </span>
          <input
            placeholder="8-16자리의 영문, 숫자"
            className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 text-[14px] focus:outline-2 focus:outline-gray-500 focus:outline-none"
            type="password"
            autoComplete="current-password"
            required
            onChange={(e) => setPw(e.target.value)}
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
  );
};

export default CreateRoomModal;

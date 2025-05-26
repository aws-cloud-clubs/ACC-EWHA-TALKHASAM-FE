import axios from "axios";
import instance from "./instance";

const token = localStorage.getItem("token");

// 로그인
export const postLogin = async (
  chatRoomId: string,
  nickname: string,
  password: string
) => {
  try {
    const response = await instance.post("/chatusers/login", {
      chatRoomId: chatRoomId,
      nickname: nickname,
      password: password,
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

// 방 생성
export const postCreateRoom = async (
  chatRoomName: string,
  owner: string,
  password: string,
  profileImg: File // 파일 객체로 받아야 함
) => {
  try {
    const formData = new FormData();
    formData.append("chatRoomName", chatRoomName);
    formData.append("owner", owner);
    formData.append("password", password);
    formData.append("profileImg", profileImg); // File 객체

    const response = await instance.post("/chatrooms", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

// 방 조회
export const getRoomInfo = async (chatRoomId: string) => {
  try {
    const response = await instance.get(`chatrooms/${chatRoomId}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

// 메세지 조회
export const getChatMessages = async (chatRoomId: string, startId?: string) => {
  try {
    const url = startId
      ? `https://artichat.r-e.kr/chatrooms/${chatRoomId}/messages?startId=${startId}`
      : `https://artichat.r-e.kr/chatrooms/${chatRoomId}/messages`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

import instance from "./instance";

// 로그인
export const postLogin = async (
  chatRoomId: number,
  nickname: string,
  password: string
) => {
  try {
    const response = await instance.post("/chatusers/login");
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

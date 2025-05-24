import instance from './instance';

export const postLogin = async (chatRoomId: number, nickname: string, password: string) => {
  try {
    const response = await instance.post('/chatusers/login');
    if (response.status == 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

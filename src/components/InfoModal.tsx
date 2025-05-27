const InfoModal = () => {
  return (
    <div className="flex w-[320px] flex-col items-center justify-center gap-7 rounded-2xl bg-white p-[10px] text-center">
      <div className="flex flex-col items-center">
        <h3 className="text-[18px] font-bold">아티스트가 되어보세요!</h3>
        <p className="text-[15px] font-medium text-gray-500">
          방을 만들고 링크를 친구들에게 공유해보세요!
        </p>
      </div>

      <div className="flex items-center">
        <p className="text-[15px] w-full font-medium text-gray-600">
          방장인 나는 모든 메시지를 볼 수 있지만, <br />
          친구들은 서로의 메시지를 볼 수 없고 나의 메시지만 볼 수 있어요.
        </p>
      </div>

      <div className="w-full">
        <p className="text-[16px] leading-[26px] font-bold">주의!</p>
        <p className="text-[15px] font-semibold">링크는 꼭 기억해두세요!</p>
        <p className="text-[14px]">
          방장도 링크가 없으면 방에 다시 들어올 수 없습니다.
        </p>
      </div>

      <div className="w-full">
        <p className="text-[16px] leading-[26px] font-bold">TIP!</p>
        <p className="text-[15px] text-gray-600">
          방장일 때 @@을 입력하면 상대방의 닉네임으로 부를 수 있어요!
        </p>
      </div>
    </div>
  );
};

export default InfoModal;

// tests/performance/ws-load-test.js
import ws from "k6/ws";
import { check } from "k6";

export const options = {
  vus: 500, // 동시 사용자 500명
  duration: "1m", // 1분 동안 유지
};

export default function () {
  const url = "wss://artichat.r-e.kr/ws-chat/websocket";

  const res = ws.connect(url, {}, function (socket) {
    socket.on("open", () => {
      console.log("✅ 연결됨");
      socket.send(JSON.stringify({ type: "ping" }));
    });

    socket.on("message", (msg) => {
      console.log(`📨 수신: ${msg}`);
    });

    socket.setTimeout(() => {
      socket.send(JSON.stringify({ type: "keepalive" }));
    }, 5000);

    socket.setTimeout(() => {
      socket.close();
    }, 10000);
  });

  check(res, {
    "status is 101 (Switching Protocols)": (r) => r && r.status === 101,
  });
}

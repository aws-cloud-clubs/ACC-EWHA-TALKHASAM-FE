import { Client } from "@stomp/stompjs";
import WebSocket from "ws";

const TOTAL_USERS = 400;
const PING_SENDER_INDEX = 0;
const ECHO_DEST = "/app/echo";
const ECHO_TOPIC = "/topic/echo";
const SERVER_URL = "wss://artichat.r-e.kr/ws-chat/websocket";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJpc093bmVyIjp0cnVlLCJzdWIiOiI3MTQ4NzE2OTkyMDcwNzk4ODEiLCJpYXQiOjE3NDgyNzU0OTQsImV4cCI6MTc0ODM2MTg5NH0.5tZ8EwFCGd8hYFkx6MQPCibQVTg44PgasI7oWstG-PM";

let received = 0;
let latencies = [];

const TIMEOUT_MS = 5000; // 5초 후 강제 resolve

function createClient(index) {
  return new Promise((resolve) => {
    let resolved = false;

    const socket = new WebSocket(SERVER_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${TOKEN}`,
      },
      debug: () => {},
      reconnectDelay: 0,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,

      onConnect: () => {
        console.log(`✅ Client ${index} connected`);

        let sentAt;

        client.subscribe(ECHO_TOPIC, (message) => {
          if (resolved) return;
          resolved = true;

          const latency = Date.now() - sentAt;
          latencies.push(latency);
          received++;
          console.log(`📨 Client ${index} received pong in ${latency}ms`);
          client.deactivate();
          resolve();
        });

        if (index === PING_SENDER_INDEX) {
          setTimeout(() => {
            sentAt = Date.now();
            client.publish({
              destination: ECHO_DEST,
              body: JSON.stringify({ type: "ping" }),
            });
            console.log(`📤 Client ${index} sent ping`);
          }, 1000);
        } else {
          sentAt = Date.now();
        }

        // ✅ 강제 타임아웃 처리
        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            console.warn(`⏱️ Client ${index} timed out`);
            client.deactivate();
            resolve();
          }
        }, TIMEOUT_MS);
      },

      onStompError: (frame) => {
        console.error(`❌ STOMP Error (client ${index}):`, frame.body);
        if (!resolved) {
          resolved = true;
          resolve();
        }
      },

      onWebSocketError: (e) => {
        console.error(`❌ WebSocket Error (client ${index}):`, e.message);
        if (!resolved) {
          resolved = true;
          resolve();
        }
      },
    });

    client.activate();
  });
}

async function runTest() {
  console.log(`🚀 1명이 ping 전송, ${TOTAL_USERS - 1}명이 수신 측정 시작...\n`);

  const all = [];
  for (let i = 0; i < TOTAL_USERS; i++) {
    all.push(createClient(i));
  }

  await Promise.all(all);

  const avg =
    latencies.reduce((sum, l) => sum + l, 0) / (latencies.length || 1);
  const max = Math.max(...latencies);
  const min = Math.min(...latencies);

  console.log("\n✅ 테스트 완료");
  console.log(`총 수신자 수: ${latencies.length}/${TOTAL_USERS - 1}`);
  console.log(`평균 지연: ${avg.toFixed(2)}ms`);
  console.log(`최소 지연: ${min}ms`);
  console.log(`최대 지연: ${max}ms`);
}

runTest();

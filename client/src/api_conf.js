import openSocket from "socket.io-client";

const socketAPI =
  process.env.NODE_ENV === "production"
    ? "http://localhost:8081"
    : "http://localhost:5000";

const socket = openSocket(socketAPI);

function listenForCron(cb) {
  socket.on("updated", (data) => cb(null, data));
}

export { listenForCron };

export const api =
  process.env.NODE_ENV === "production" ? "http://localhost:8081" : "";

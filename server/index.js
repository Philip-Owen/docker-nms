const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const db = require("./db");
const cors = require("cors");
require("./cron-jobs")(io);
require("dotenv").config();

const DeviceRouter = require("./routes/device.router");
const PingRouter = require("./routes/ping.router");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/devices", DeviceRouter);
app.use("/api/ping", PingRouter);

io.on("connection", (client) => {
  client.on("subscribeToTimer", (interval) => {
    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", new Date());
    }, interval);
  });
});

server.listen("5000", () => console.log("Listening on port 5000"));

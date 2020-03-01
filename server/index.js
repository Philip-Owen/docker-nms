const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
require("./cron-jobs")();
require("dotenv").config();

const DeviceRouter = require("./routes/device.router");
const PingRouter = require("./routes/ping.router");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/devices", DeviceRouter);
app.use("/api/ping", PingRouter);

app.listen("5000", () => console.log("Listening on port 5000"));

const express = require("express");
const ping = require("ping");
const Device = require("../models/device.model");
const router = express.Router();

router.get("/:ip", async (req, res) => {
  const { ip } = req.params;
  const pingRes = await ping.promise.probe(ip, {
    timeout: 10,
    min_reply: 5
  });
  const devRes = await Device.update(
    { reachability: pingRes.alive, lastChecked: Date.now() },
    { where: { ipAddress: ip } }
  );

  res.sendStatus(200);
});

module.exports = router;

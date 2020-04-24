const cron = require("node-cron");
const ping = require("ping");
const Device = require("../models/device.model");

async function pingAllCronJob() {
  const devices = await Device.findAll({ order: [["id", "ASC"]] });
  if (devices.length > 0) {
    for (const dev of devices) {
      const { ipAddress } = dev.dataValues;
      const pingRes = await ping.promise.probe(ipAddress, {
        timeout: 5,
        min_reply: 5,
      });
      await Device.update(
        { reachability: pingRes.alive, lastChecked: Date.now() },
        { where: { ipAddress: ipAddress } }
      );
    }
  }
}

module.exports = async (io) => {
  cron.schedule("*/15 * * * *", async () => {
    await pingAllCronJob();
    const devices = await Device.findAll({ order: [["id", "ASC"]] });
    io.sockets.emit("updated", devices);
  });
};

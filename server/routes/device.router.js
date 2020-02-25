const express = require("express");
const Device = require("../models/device.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const devRes = await Device.findAll({ order: [["id", "ASC"]] });
    res.send(devRes);
  } catch (error) {
    const { message } = error.errors[0];
    console.log("/ GET Error: ", message);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const devRes = await Device.findAll({ where: { id: id } });
    res.send(devRes);
  } catch (error) {
    const { message } = error.errors[0];
    console.log("/ GET Error: ", message);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  const { hostname, ipAddress, model } = req.body;
  try {
    await Device.create({ hostname, ipAddress, model });
    res.sendStatus(201);
  } catch (error) {
    const { message } = error.errors[0];
    console.log("/ POST Error: ", message);
    res.statusCode = 400;
    res.send({ error: message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const del = await Device.destroy({ where: { id: id } });
    del === 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    const { message } = error.errors[0];
    console.log("/ DELETE Error: ", message);
  }
});

router.put("/:id", async (req, res) => {
  const { hostname, ipAddress, model } = req.body;
  const { id } = req.params;
  try {
    const update = await Device.update(
      { hostname, ipAddress, model },
      { where: { id: id } }
    );
    update[0] === 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    const { message } = error.errors[0];
    console.log("/ PUT Error: ", message);
  }
});

module.exports = router;

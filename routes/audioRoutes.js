const route = require("express").Router();
const { getAudios } = require("../controller/audioController");

route.get("/", (req, res) => {
  res.json({ message: "welcome! This is API endpoint" });
});

route.get("/getAllAudios", getAudios);

module.exports = route;

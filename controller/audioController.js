const db = require("../models");

const getAudios = (req, res) => {
  db.audioDetails.findAll().then((data) => {
    if (!data || data.length === 0) {
      res.json({ message: "No audio details found" });
      return;
    }
    res.json({ data });
  });
};

module.exports = {
  getAudios,
};

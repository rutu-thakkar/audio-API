const db = require("../models");
const { getAudioDurationInSeconds } = require("get-audio-duration");
const getAudios = (req, res) => {
  db.audioDetails.findAll().then((data) => {
    if (!data || data.length === 0) {
      res.json({ message: "No audio details found" });
      return;
    }
    res.json({ data });
  });
};

const addAudio = (req, res) => {
  console.log(req.files);
  if (req.files) {
    var file = req.files["audioFile"];
    console.log(file);
    // var fileName = req.files["audioFile"].name;

    file.mv("./assets/" + req.files["audioFile"].name, function (err) {
      if (err)
        return res
          .status(400)
          .send(JSON.stringify({ failed: "Something went wrong" }));
    });
  } else {
    return res.status(400).send(JSON.stringify({ failed: "No such File" }));
  }
  //   return res.status(400).send(JSON.stringify({ failed: "success" }));

  getAudioDurationInSeconds("./assets/" + req.files["audioFile"].name)
    .then((duration) => {
      db.audioDetails
        .create({
          filename: Date.now() + "-" + req.files["audioFile"].name,
          fileURL: "./assets/" + req.files["audioFile"].name,
          duration: duration,
        })
        .then((data) => {
          res.json({ message: "File Uploaded!", data });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
};

const getAudio = (req, res) => {
  const { filename } = req.params;
  const filePath = "./assets/" + filename;
  res.json({ filePath });
};

module.exports = {
  getAudios,
  addAudio,
  getAudio,
};

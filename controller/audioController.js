const route = require("express").Router();
const fileUpload = require("express-fileupload");
const db = require("../models");
require("dotenv").config();
const cloudinary = require("cloudinary");
const streamifier = require("streamifier");
const { getAudioDurationInSeconds } = require("get-audio-duration");
// route.use(fileUpload());

// {
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   }

cloudinary.config({
  cloud_name: "rutu",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const getAudios = (req, res) => {
  db.audioDetails.findAll().then((data) => {
    if (!data || data.length === 0) {
      res.json({ message: "No audio details found" });
      return;
    }
    res.send(data);
  });
};

const addAudio = (req, res) => {
  if (req.file) {
    var file = req.file;
    console.log(file);
    if (
      req.file.mimetype === "audio/basic" ||
      req.file.mimetype === "audio/mpeg" ||
      req.file.mimetype === "audio/vnd.wav" ||
      req.file.mimetype === "audio/vorbis" ||
      req.file.mimetype === "audio/ogg"
    ) {
      getAudioDurationInSeconds(req.file.path)
        .then((duration) => {
          // if (duration < 60) {
          //   duration = duration;
          //   duration = duration.toFixed(3) + " seconds";
          // } else if (duration > 60) {
          //   duration = duration / 60;
          //   duration = duration.toFixed(2) + " minutes";
          // }

          db.audioDetails
            .create({
              filename: Date.now() + "-" + req.file.originalname,
              fileURL: req.file.path,
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
          // res.json(err);
          res.send(err.message);
        });
    } else {
      res.json({ message: "File type must be audio" });
    }
  }
};

// console.log(req.files.tempFilePath);
// if (req.files) {
//   var file = req.files["audioFile"];
//   console.log(file);
//   // console.log(file.tempFilePath);
//   // var fileName = req.files["audioFile"].name;

//     file.mv("./assets/" + req.files["audioFile"].name, function (err) {
//       if (err)
//         return res
//           .status(400)
//           .send(JSON.stringify({ failed: "Something went wrong" }));
//     });
//   } else {
//     return res.status(400).send(JSON.stringify({ failed: "No such File" }));
//   }

//   return res.status(400).send(JSON.stringify({ failed: "success" }));

//   getAudioDurationInSeconds("./assets/" + req.files["audioFile"].name)
//     .then((duration) => {
//       db.audioDetails
//         .create({
//           filename: Date.now() + "-" + req.files["audioFile"].name,
//           fileURL: "./assets/" + req.files["audioFile"].name,
//           duration: duration,
//         })
//         .then((data) => {
//           res.json({ message: "File Uploaded!", data });
//         })
//         .catch((err) => {
//           res.json(err);
//         });
//     })
//     .catch((err) => {
//       res.json({ err: err.message });
//     });
// };

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

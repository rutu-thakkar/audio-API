const express = require("express");
const route = express.Router();
const fileUpload = require("express-fileupload");
const multer = require("multer");
const {
  getAudios,
  addAudio,
  getAudio,
} = require("../controller/audioController");

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./assets/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.filename);
//   },
// });

route.use(fileUpload());
var upload = multer();

route.get("/", (req, res) => {
  res.json({ message: "welcome! This is API endpoint" });
});

route.get("/getAllAudios", getAudios);
route.post("/addAudio", upload.single("audioFile"), addAudio);
route.get("/getAudio/:filename", getAudio);

module.exports = route;

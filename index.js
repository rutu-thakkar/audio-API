const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./models");
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.options("*", cors());
app.use("/", require("./routes/audioRoutes"));

db.audioDetails
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

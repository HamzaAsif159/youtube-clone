require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");

const app = express();

mongoose.connect(process.env.MONGO_URI).then(
  app.listen(process.env.PORT, () => {
    console.log("Connected to DB & Listening on PORT", process.env.PORT);
  })
);

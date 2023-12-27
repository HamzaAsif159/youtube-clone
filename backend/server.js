require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const express = require("express");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

mongoose.connect(process.env.MONGO_URI).then(
  app.listen(process.env.PORT, () => {
    console.log("Connected to DB & Listening on PORT", process.env.PORT);
  })
);

const express = require("express");

const userRouter = express.Router();

const { signupUser, loginUser } = require("../controllers/userController");

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
}

async function signupUser(req, res, next) {
  const { email, password, username } = req.body;

  try {
    const user = await User.signup(username, email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
}

module.exports = { signupUser, loginUser };

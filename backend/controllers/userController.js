const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
}

async function createUser(req, res) {
  const { email, password, username } = req.body;

  try {
    const user = await UserModel.signup(username, email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { createUser };

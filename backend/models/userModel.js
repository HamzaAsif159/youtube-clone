const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
});

userSchema.statics.signup = async function (username, email, password) {
  if (!validator.isEmail(email)) throw new Error("Invalid Email");
  if (!email || !password || !username)
    throw new Error("All fields must be filled");
  if (!validator.isStrongPassword(password))
    throw new Error("Not a strong password");

  const alreadyexists = await this.findOne({ email });
  if (alreadyexists) throw new Error("Email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hashedPassword });

  return user;
};

module.exports = mongoose.model("UserModel", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required to register"],
    unique: [true, "username should be unique"],
  },
  email: {
    type: String,
    unique: [true, "Email should be unique"],
    required: [true, "Email is required to reigster"],
  },
  password: {
    type: String,
    required: [true, "Password is required to register"],
    select: false,
  },
});

userModel = mongoose.model("user", userSchema);

module.exports = userModel
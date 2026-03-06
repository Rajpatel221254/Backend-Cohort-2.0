const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is needed"],
    unique: [true, "Username is already exist"],
  },
  email: {
    type: String,
    required: [true, "Email is needed"],
    unique: [true, "Email is already exist"],
  },
  password: {
    type: String,
    required: [true, "Password is needed"],
  },
  bio: String,
  imgUrl: {
    type: String,
    default:
      "https://ik.imagekit.io/mbrc221254/default.webp?updatedAt=1770742955116",
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

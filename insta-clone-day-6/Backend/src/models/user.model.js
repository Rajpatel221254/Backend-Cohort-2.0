const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username should be unique"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email should be unique"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  bio: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
    default:
      "https://ik.imagekit.io/mbrc221254/default.webp?updatedAt=1770742955116",
  },
  fullname: {
    type: String,
    default: "",
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

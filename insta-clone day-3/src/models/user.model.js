const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username should be unique"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email should be unique"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
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

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    required: [true, "Image is needed to create a post"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "user is required to create a post"],
  },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;

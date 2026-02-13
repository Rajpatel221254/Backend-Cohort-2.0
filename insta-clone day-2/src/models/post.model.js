const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    required: [true, "img url is required to create a post"],
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User id required to create post"],
  },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;

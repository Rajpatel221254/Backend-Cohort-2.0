const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: Array,
    required: [true, "Image is required to create post"],
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User id required to create post"],
  },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;

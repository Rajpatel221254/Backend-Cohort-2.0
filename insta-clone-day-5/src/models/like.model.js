const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "Username is required to like a post"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "Post id is required to like the post"],
    },
  },
  {
    timestamps: true,
  },
);

likeSchema.index({ user: 1, post: 1 }, { unique: true });

const likeModel = mongoose.model("like", likeSchema);

module.exports = likeModel
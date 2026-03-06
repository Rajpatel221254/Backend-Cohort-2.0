const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  songUrl: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    enum: {
      values: ["happy", "sad", "surprised"],
      message: "Enum this is",
    },
  },
});

const songModel = mongoose.model("song", songSchema);

module.exports = songModel;

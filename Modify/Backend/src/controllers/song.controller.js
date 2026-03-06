const songModel = require("../models/song.model");
const { fileUpload } = require("../services/storage.service");
const id3 = require("node-id3");

async function postSongController(req, res) {
  const songBuffer = req.file.buffer;
  const { mood } = req.body;

  const tags = id3.read(songBuffer);

  const [songFile, posterFile] = await Promise.all([
    fileUpload({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "cohort-2/moodify/songs",
    }),
    fileUpload({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpg",
      folder: "cohort-2/moodify/posters",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    songUrl: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });

  res.status(201).json({
    message: "Song created succesfully",
    song,
  });
}

async function getSongController(req, res) {
  const { mood } = req.query;

  const songs = await songModel.find({ mood: mood });

  res.status(200).json({
    message: "Song fetched succesfully",
    songs,
  });
}

module.exports = { postSongController, getSongController };

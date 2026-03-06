const multer = require("multer");

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 1024 * 1024 * 20, //10MB
  },
});

module.exports = {upload}
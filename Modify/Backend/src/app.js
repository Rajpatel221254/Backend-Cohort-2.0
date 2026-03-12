const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://backend-cohort-2-0.vercel.app",
    credentials: true,
  }),
);

/**
 * Import Routers
 */
const authRouter = require("./routes/auth.routes");
const songRouter = require("./routes/song.routes");

/**
 * Using Routers
 */
app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);

module.exports = app;

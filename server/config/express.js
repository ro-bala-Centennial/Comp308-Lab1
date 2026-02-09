const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

function createApp({ clientOrigin }) {
  const app = express();

  app.use(express.json());

  // CORS must allow credentials so cookies can work
  app.use(
    cors({
      origin: clientOrigin,
      credentials: true,
    })
  );

  app.use(cookieParser());

  return app;
}

module.exports = { createApp };

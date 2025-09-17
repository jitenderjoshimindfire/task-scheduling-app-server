const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRouter = require('./src/router/auth')

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", authRouter);

module.exports = app;
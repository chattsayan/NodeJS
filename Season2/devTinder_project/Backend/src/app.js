const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
require("dotenv").config();
const app = express();

// ----- CRON JOB for scheduling task -----
// require("./utils/cronjob");

// ----- MIDDLEWARE -----
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ----- IMPORT ROUTER -----
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");
const userRouter = require("./routes/userRouter");
const chatRouter = require("./routes/chatRouter");
const initializeSocket = require("./utils/socket");
// const paymentRouter = require("./routes/paymentRouter");

// ----- using ROUTER -----
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
// app.use("/", paymentRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
// Initialize WebSocket server
initializeSocket(server);

// ----- CONNECT TO DATABASE -----
connectDB()
  .then(() => {
    console.log("DB Connection Established...");

    // ----- LISTENING TO SERVER -----
    // app.listen(process.env.PORT, () => {

    // as we are using socket.io, we need to listen to server instead of app
    server.listen(process.env.PORT, () => {
      console.log(
        `server is successfully listening on port ${process.env.PORT}...`
      );
    });
  })
  .catch((err) => {
    console.error("DB Connection Failed- ", err);
  });

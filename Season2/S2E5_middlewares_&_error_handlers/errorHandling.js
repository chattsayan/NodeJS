const express = require("express");

const app = express();

// ----- MIDDLEWARE -----
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong!");
  }
});

app.get("/getUserData", (req, res) => {
  throw new Error("xyzerror");
  res.send("data sent");
});

app.listen(7777, () => {
  console.log("server is successfully listening on port 7777...");
});

const express = require("express");

const app = express();

// the function inside is know as request handler
app.get("/", (req, res) => {
  res.send("Welcome to Dashboard");
});

app.get("/hello", (req, res) => {
  res.send("hello everyone!");
});

app.get("/test", (req, res) => {
  res.send("hello from the server");
});

app.listen(7777, () => {
  console.log("server is successfully listening on port 7777...");
});

const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// ----- MIDDLEWARE -----
app.use("/admin", adminAuth);

app.use("/user/login", (req, res) => {
  res.send("user logged in");
});

app.get("/user", userAuth, (req, res) => {
  res.send("user data sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("all data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("user deleted");
});

app.listen(7777, () => {
  console.log("server is successfully listening on port 7777...");
});

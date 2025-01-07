const express = require("express");

const app = express();

app.get("/user/:userId/:pass", (req, res) => {
  // /user/102/sayan
  console.log(req.params); // op.- { userId: 102, pass: 'sayan' }

  res.send("request sent");
});

app.listen(7777, () => {
  console.log("server is successfully listening on port 7777...");
});

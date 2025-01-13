const express = require("express");
const { userAuth } = require("../middlewares/auth");

const router = express.Router();

router.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  console.log("sending a connection request");

  res.send(user.firstName + " sent the connection request!");
});

module.exports = router;

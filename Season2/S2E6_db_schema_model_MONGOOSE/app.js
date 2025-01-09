const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // ----- INSTANCE -----
  // creating a new instance of the User model
  // This creates a new instance of the User model, filling in fields like firstName, email, etc.
  const user = new User({
    firstName: "Virat",
    lastName: "Koli",
    email: "koli@virat.com",
    password: "virat@123",
    age: 38,
    gender: "Male",
  });

  try {
    // Saving the User to the Database
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.send(400).send("Error saving the User: " + err.message);
  }
});

// ----- CONNECT TO DATABASE -----
connectDB()
  .then(() => {
    console.log("DB Connection Established...");

    // ----- LISTENING TO SERVER -----
    app.listen(7777, () => {
      console.log("server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("DB Connection Failed- ", err);
  });

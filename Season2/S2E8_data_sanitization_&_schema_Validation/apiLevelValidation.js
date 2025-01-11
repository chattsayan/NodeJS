const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    // Saving the User to the Database
    await user.save();
    res.status(201).send({ message: "User added successfully!", user });
  } catch (err) {
    res.status(400).send("Error saving the User: " + err.message);
  }
});

// get user by email
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ error: "Server error", details: err.message });
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to fetch users", details: err.message });
  }
});

// delete by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send({ message: "User deleted successfully", user });
  } catch (err) {
    res
      .status(500)
      .send({ error: "User deletion failed", details: err.message });
  }
});

// update by id
app.patch("/user/:_id", async (req, res) => {
  const userId = req.params?._id;
  const data = req.body;

  try {
    // ----- API LEVEL VALIDATION -----
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdatedAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isUpdatedAllowed) {
      // res.send(400).send("Update not allowed");
      return res.status(400).send({ error: "Update contains invalid fields" });
    }

    // validating skills, that should not reach more than 10
    if (data?.skills.length > 10) {
      // res.send(400).send("Maximum 10 skills allowed");
      return res.status(400).send({ error: "Maximum 10 skills allowed" });
    }
    // ----- API LEVEL VALIDATION -----

    const user = await User.findByIdAndUpdate(userId, data, {
      // options here shows which updated data need to be displayed, ie., before / after updation
      // if no options provided, previous data before updation will be displayed
      returnDocument: "after",
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).send({ error: "User update failed", details: err.message });
  }
});

// user update by email
app.patch("/user", async (req, res) => {
  const { emailId, data } = req.body;

  try {
    const user = await User.findOneAndUpdate(emailId, { $set: data });

    if (!data) {
      return res.status(404).send({ error: "User not found" });
    } else {
      // res.send(user);
      res.send({ message: "User updated successfully", user });
    }
  } catch (err) {
    res.status(500).send({ error: "User update failed", details: err.message });
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

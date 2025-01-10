const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// reads the JSON object, converts it into JS object and adds the JS object back to req
app.use(express.json());

app.post("/signup", async (req, res) => {
  // ----- INSTANCE -----
  // creating a new instance of the User model
  // This creates a new instance of the User model, filling in fields like firstName, email, etc.
  // ----- DYNAMIC API (data stored in postman) -----
  const user = new User(req.body);

  // ----- STATIC DATA -----
  // const user = new User({
  //   firstName: "Virat",
  //   lastName: "Koli",
  //   email: "koli@virat.com",
  //   password: "virat@123",
  //   age: 38,
  //   gender: "Male",
  // });

  try {
    // Saving the User to the Database
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.send(400).send("Error saving the User: " + err.message);
  }
});

// get user by email
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const users = await User.findOne({ email: userEmail });
    res.send(users);
  } catch (err) {
    res.status(400).send("No such email exists");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong- " + err.message);
  }
});

// delete by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send(user + ": user deleted successfully");
  } catch (err) {
    res.send(400).send("User Deletion failed");
  }
});

// update by id
app.patch("/user", async (req, res) => {
  const userId = req.body._id;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      // options here shows which updated data need to be displayed, ie., before / after updation
      // if no options provided, the previous data before updation will be displayed
      returnDocument: "after",
    });
    res.send(`User Updated Successfully: \n${user}`);
  } catch (err) {
    res.send(400).send("User Update failed");
  }
});

// user update by email
app.patch("/user", async (req, res) => {
  const { emailId, data } = req.body;

  try {
    const user = await User.findOneAndUpdate(emailId, { $set: data });

    if (!data) {
      res.send(400).send("Data not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.send(400).send("User Update failed");
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

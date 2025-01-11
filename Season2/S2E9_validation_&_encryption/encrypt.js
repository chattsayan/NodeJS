const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: "Too many login attempts. Please try again later.",
});

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // the moment user signup below things to happen:
    // (1). Validation of User, without which not to proceed
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    // (2). Encrypt Password using bcrypt library
    const encryptPassword = await bcrypt.hash(password, 10);

    // (3). then only store user into DB
    // creating new user
    // const user = new User(req.body); - using previously
    const user = new User({
      firstName,
      lastName,
      email,
      password: encryptPassword,
    });

    // Saving the User to the Database
    await user.save();
    res.status(201).send({ message: "User added successfully!", user });
  } catch (err) {
    res.status(400).send(`SignUp Error: ${err.message}`);
  }
});

app.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials.");
    }

    // user.password is the hash parameter
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.status(200).send("Login Successful!!!");
    } else {
      throw new Error("Invalid Credentials.");
    }
  } catch (err) {
    res.status(401).send(`Login Error: ${err.message}`);
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

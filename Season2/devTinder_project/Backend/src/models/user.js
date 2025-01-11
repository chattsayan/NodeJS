const mongoose = require("mongoose");
const validator = require("validator");

// ----- CREATING SCHEMA -----
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [1, "First name must be at least 1 character"],
      maxLength: 80,
    },
    lastName: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(`Invalid email address: ${value}`);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(`Enter a strong password: ${value}`);
        }
      },
    },
    age: { type: Number, min: [18, "Age must be atleast 18"] },
    gender: {
      type: String,
      // ----- CUSTOM VALIDATION -----
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data is not valid.");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3BmLWljb240LWppcjIwNjItcG9yLWwtam9iNzg4LnBuZw.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error(`Invalid photo URL: ${value}`);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the User!",
    },
    skills: {
      type: [String],
    },
  },
  {
    // this will create both updated and created time date
    timestamps: true,
  }
);

// ----- CREATING MODEL -----
module.exports = mongoose.model("User", userSchema);

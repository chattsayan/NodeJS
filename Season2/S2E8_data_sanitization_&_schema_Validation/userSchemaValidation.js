const mongoose = require("mongoose");

// ----- CREATING SCHEMA -----
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 1, maxLength: 80 },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: true, unique: true },
    age: { type: Number, min: 18 },
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

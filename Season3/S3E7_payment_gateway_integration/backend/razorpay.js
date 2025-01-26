const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // consider this as username
  key_secret: process.env.RAZORPAY_KEY_SECRET, // consider this as password
});

module.exports = instance;

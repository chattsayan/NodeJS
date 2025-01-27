const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/paymentOrders");
const { membershipAmount } = require("../utils/constants");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

router.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, email } = req.user;

    // Create an order
    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100, // paise
      currency: "INR",
      receipt: "receipt#1", // order ID
      notes: {
        firstName,
        lastName,
        email,
        membershipType: membershipType, // "silver" or "gold"
      },
    });

    // save the order in the database
    const newOrder = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayments = await newOrder.save();

    // send the order to the client (frontend)
    res
      .status(200)
      .json({ ...savedPayments.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/payment/create", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");

    const isValidSignature = validateWebhookSignature(
      JSON.stringify(req.body), // webhookBody = req.body
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isValidSignature) {
      return res.status(400).json({ message: "Invalid Signature" });
    }

    // update the payment status in the database
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();

    // update user as a premium user
    if (req.body.event === "payment.captured") {
      console.log("Payment Captured");
    }

    if (req.body.event === "payment.failed") {
      console.log("Payment Failed");
    }

    // return a response to the razorpay server
    return res.status(200).json({ message: "Webhook received" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/premium/verify", userAuth, async (req, res) => {
  try {
    const user = req.user.toJSON();
    if (user.isPremium) {
      return res
        .status(200)
        .json({ isPremium: true, membershipType: user.membershipType });
    }

    return res.status(200).json({ isPremium: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

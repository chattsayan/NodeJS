const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./email/sendEmail");
const ConnectionRequest = require("../models/connectionRequest");

// this job will run at 8:00 AM everyday
cron.schedule("0 8 * * *", async () => {
  //   console.log("Running a task every minute" + new Date());
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lte: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.email)),
    ];

    for (const email of listOfEmails) {
      // send email
      try {
        const res = await sendEmail.run({
          to: email,
          subject: "Pending Connection Request",
          text: `You have pending connection requests. Please login to your account to check.`,
        });
      } catch (err) {
        console.error("Error in sending email: ", err);
      }
    }
  } catch (err) {
    console.error("Error in cronjob: ", err);
  }
});

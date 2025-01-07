const express = require("express");

const app = express();

// ----- ROUTE PATTERNS -----
app.get(/.*fly$/, (req, res) => {
  res.send("request sent");
});

// "/ab?c" - b is optional, /ac, /abc both will work
// "/ab+c" - b can put n no. of times b/w a & c
// "/ab*cd" - b/w ab & cd anything can be put an that will work
// "/a(bc)?d" - grouping elements, bc is optional, /ad, /abcd will work
// ----- REGEX -----
// /a/ - a found anywhere, it will work
// /.*fly$/ - starts wil anything, ends with fly

// ----- DYNAMIC PATTERN -----
// type 1 - query params
app.get("/user", (req, res) => {
  // /user?userId=101&pass=testing
  console.log(req.query); // op.- { userId: 101, pass: 'testing' }

  res.send("request sent");
});

// type 2 - dynamic route
app.get("/user/:userId/:pass", (req, res) => {
  // /user/102/sayan
  console.log(req.params); // op.- { userId: 102, pass: 'sayan' }

  res.send("request sent");
});

/* 
----- HANDLING DIFFERENT METHODS -----

// app.use() - this will ignore all subsequesnt routes as put in top of all routes
// app.use("/user", (req, res) => {
//   res.send("order matters in route, hence i will ignore all subsequent routes");
// });

app.get("/user", (req, res) => {
  res.send({ firstName: "sayan", lastName: "chatterjee" });
});

app.post("/user", (req, res) => {
  // saving data to DB
  res.send("data successfully saved to DB");
});

app.put("/user", (req, res) => {
  res.send("data fully updated");
});

app.patch("/user", (req, res) => {
  res.send("data partially updated");
});

app.delete("/user", (req, res) => {
  res.send("data deleted successfully!");
});

app.use("/test", (req, res) => {
  res.send("hello from the server");
});

----- ORDER OF ROUTES MATTERS -----

// ----- the function inside is know as request handler -----
app.use("/hello/2", (req, res) => {
  res.send("2 hello everyone!");
});

app.use("/hello", (req, res) => {
  res.send("hello everyone!");
});

app.use("/test", (req, res) => {
  res.send("hello from the server");
});

app.use("/", (req, res) => {
  res.send("Welcome to Dashboard");
});

*/

app.listen(7777, () => {
  console.log("server is successfully listening on port 7777...");
});

const { log } = require("console");
const express = require("express");

const app = express();

// importing modules for TYPE 9
const { adminAuth, userAuth } = require("./auth");

// ----- TYPE 1 -----
app.use("/user", (req, res) => {
  console.log("route user 1");
  //   res.send("response 1");
});

// as no response is sent, it will run an infinite loop

// ----- TYPE 2 -----
app.use(
  "/user",
  (req, res, next) => {
    console.log("route user 1");
    // res.send("response 1");
    next();
  },
  (req, res) => {
    console.log("route user 2");
    res.send("response 2");
  }
);

// in case of multiple route handler, here as first response is not sent, it will run an infinite loop and will not go to the next response. In order to acheive to go to the next response, a third argument 'next' to be used and next() function to be called

// ----- TYPE 3 -----
app.use(
  "/user",
  (req, res, next) => {
    console.log("route user 1");
    res.send("response 1");
    next();
  },
  (req, res) => {
    console.log("route user 2");
    res.send("response 2");
  }
);

// here, logs "route user 1", sends "response 1", goes to next route handler, logs "route user 2" and when sending "response 2", it will throw an error of "Cannot set headers after they are sent to the client" as it cannot send response from same URL, as it already sent response to client and it cannot change the request
// output --
// route user 1
// API - response 1
// route user 2
// error for executing response 2

// ----- TYPE 4 -----
app.use(
  "/user",
  (req, res, next) => {
    console.log("route user 1");
    next();
    res.send("response 1");
  },
  (req, res) => {
    console.log("route user 2");
    res.send("response 2");
  }
);

// here, logs "route user 1", then goes to next route handler, logs "route user 2" and sends "response 2", after that it tries to send "response 1", and it will throw an error of "Cannot set headers after they are sent to the client" as it cannot send response from same URL, as it already sent response to client and it cannot change the request
// output --
// route user 1
// route user 2
// API - response 2
// error for executing response 1

// ----- TYPE 5 -----
app.use(
  "/user",
  (req, res, next) => {
    console.log("route user 1");
    next();
    // res.send("response 1");
  },
  (req, res, next) => {
    console.log("route user 2");
    // res.send("response 2");
    next();
  },
  (req, res, next) => {
    console.log("route user 3");
    // res.send("response 3");
    next();
  }
);

// this code will break and will send a response as Cannot GET /user, as there are no response mentioned but, next() is called
// output --
// route user 1
// route user 2
// route user 3
// API - Cannot GET /user

// ----- TYPE 6 -----
app.use(
  "/user",
  (req, res, next) => {
    console.log("route user 1");
    next();
  },
  (req, res, next) => {
    console.log("route user 2");
    next();
  },
  (req, res, next) => {
    console.log("route user 3");
    // next();
  }
);

// this will run an infinite loop in server
// output --
// route user 1
// route user 2
// route user 3
// API - infinite loop, as no response sent to server and server is searching for it

// ----- TYPE 7 -----
// all/ some functions can be wrapped inside an array also
app.use(
  "/user",
  (req, res, next) => {
    console.log("route user 1");
    next();
  },
  [
    (req, res, next) => {
      console.log("route user 2");
      next();
    },
    (req, res, next) => {
      console.log("route user 3");
      // next();
    },
  ]
);

// ----- TYPE 7 -----
// independent routes
app.get("/user", (req, res, next) => {
  console.log("route user 1");
  next();
});

app.get("/user", (req, res, next) => {
  console.log("route user 2");
  res.send("response 2");
});

// ----- TYPE 8 -----
// MIDDLEWARE
app.use("/", (req, res, next) => {
  //   res.send("handling '/' route");
  next();
});

// separate route handler
app.get(
  "/user",
  (req, res, next) => {
    console.log("handling /user route");
    next();
  },
  (req, res, next) => {
    res.send("1st route handler");
  }
);

// ----- TYPE 9 -----
// ----- MIDDLEWARE -----
app.use("/admin", adminAuth);

app.use("/user/login", (req, res) => {
  res.send("user logged in");
});

app.get("/user", userAuth, (req, res) => {
  res.send("user data sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("all data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("user deleted");
});

app.listen(7777, () => {
  console.log("server is successfully listening on port 7777...");
});

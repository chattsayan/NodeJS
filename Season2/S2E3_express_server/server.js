const express = require("express");

// setting up an Express application
// Creates an Instance of Express
/**
 * express() function initializes an Express application.
 * app instance represents your web server and is used to define routes, configure middleware, and handle HTTP requests.
 * app instance provides all the HTTP methods
 */
const app = express();

// app.get: Handles GET requests to the root (/) route.
app.get("/", (req, res) => {
  // res.send: Sends a response to the client.
  res.send("request sent");
});

// app.listen: Starts the server on port 3000.
app.listen(3000, () => {
  console.log("server is successfully listening on port 7777...");
});

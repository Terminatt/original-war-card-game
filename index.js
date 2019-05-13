const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(path.join(__dirname, "app")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "app", "index.html"));
});

app.listen(port, () => {
  console.log("Server is up and running on port:", port);
});

module.exports = { app };

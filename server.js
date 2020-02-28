var express = require("express");
var path = require("path");
var xorshift = require("xorshift");

var app = express();

app.use(express.static(path.join(__dirname, "/assets")));

var PORT = process.env.PORT || 8080;

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

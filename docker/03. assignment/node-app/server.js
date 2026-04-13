const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, (error) => {
  if (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
  console.log("Server is running on port 3000");
});

const PORT = 3000;

const fs = require("fs");
const express = require("express");

const app = express();

app.get("/api/v1/tours", (req, res) => {});

app.listen(PORT, () => {
  console.log(`App is running on the port ${PORT}...`);
});

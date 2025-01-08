const PORT = 3000;

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello From the server",
    app: tourNext,
  });
});

app.listen(PORT, () => {
  console.log(`App is running on the port ${PORT}...`);
});

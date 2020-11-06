// # ExpressJS
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers
const pollRouter = require("./routes/pollRouter");
const cuisineRouter = require("./routes/cuisineRouter");

app.use("/api/poll", pollRouter);
app.use("/api/cuisine", cuisineRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

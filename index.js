const PORT = 8080;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json(process.env.API_KEY); //not actually what to do, just for testing
});

app.get("/posts", (req, res) => {});

app.listen(8080, () => console.log("server is running on port " + PORT));

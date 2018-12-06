const express = require("express");
const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use(require("./routes"));

module.exports = app;
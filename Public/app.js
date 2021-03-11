const express = require("express");

const Routes = require("../Routes/api");

const app = express();

app.use(express.json());

app.use(Routes);

module.exports = app;
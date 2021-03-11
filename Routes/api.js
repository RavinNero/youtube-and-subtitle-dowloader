const express = require("express");
const OrchestratorController = require("../Src/App/Controllers/OrchestratorController");

const Route = express.Router();

Route.post("/", OrchestratorController.dowloadVideoAndCaptions);

module.exports = Route;
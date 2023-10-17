import express from "express";
const router = express.Router();
const apiController = require("../controllers/api");
const mainController = require("../controllers/main");

// Main app page
router.get("/", mainController.home);

module.exports = router;

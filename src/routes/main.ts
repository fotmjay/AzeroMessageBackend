import express from "express";
const router = express.Router();
const mainController = require("../controllers/main");

// Main app page
router.get("/:address", mainController.home);

module.exports = router;

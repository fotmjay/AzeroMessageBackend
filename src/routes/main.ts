import express from "express";
const router = express.Router();
const mainController = require("../controllers/main");

// Main app page

router.get("/docs", mainController.getDocumentation);
router.get("/**", mainController.getHome);

module.exports = router;

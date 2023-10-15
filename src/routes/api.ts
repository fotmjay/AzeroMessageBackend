import express from "express";
const router = express.Router();
const apiController = require("../controllers/api");

// Main app page
router.get("/messages/receiver/:address", apiController.getMessagesByReceiver);
router.get("/messages/sender/:address", apiController.getMessagesBySender);

module.exports = router;

import express from "express";
const router = express.Router();
const apiController = require("../controllers/api");

// Main app page
router.get("/messages/receiver/:address", apiController.getMessagesByReceiver);
router.get("/messages/sender/:address", apiController.getMessagesBySender);

// CREATE ADDRESS AND TENANT ROUTES
router.post("/updateMessagesCollection", apiController.updateMessagesCollection);

module.exports = router;

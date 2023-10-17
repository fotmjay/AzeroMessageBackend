import express from "express";
import { runDatabaseUpdate } from "../helpers/requestEventOnChain";
const router = express.Router();
const apiController = require("../controllers/api");

// Main app page
router.get("/messages/receiver/:address", runDatabaseUpdate, apiController.getMessagesByReceiver);
router.get("/messages/sender/:address", runDatabaseUpdate, apiController.getMessagesBySender);

module.exports = router;

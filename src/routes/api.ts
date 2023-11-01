import express from "express";
import { runDatabaseUpdate } from "../helpers/requestEventOnChain";
const router = express.Router();
const apiController = require("../controllers/api");

// Latest messages
router.get("/messages/latest", runDatabaseUpdate, apiController.getLatestMessages);

// Target = sender || receiver
router.get("/messages/:target/:address", runDatabaseUpdate, apiController.getMessagesByTarget);

// Return encryption key from database.
router.get("/publickey/:address", apiController.getPublicEncryptionKey);

module.exports = router;

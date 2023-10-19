import express from "express";
const router = express.Router();
const authController = require("../controllers/authentication");
const { ensureAuth } = require("../middleware/auth");

router.get("/generateNonce/:address", authController.generateNonce);
// failsafe with error message if reached
router.get("/generateNonce", authController.generateNonce);

router.post("/confirmWallet", authController.confirmWallet);
router.post("/setPassword", ensureAuth, authController.setPassword);

module.exports = router;

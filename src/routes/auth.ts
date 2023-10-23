import express from "express";
const router = express.Router();
const authController = require("../controllers/authentication");

// Get nonce (message to sign) to prove ownership with signature,
// usually response is followed by a request to /confirmWallet or /setPassword
router.get("/getNonce/:address", authController.getNonce);

// Used to get encrypted private key WITHOUT changing password
router.post("/confirmWallet", authController.confirmWallet);

// Used to SET encrypted private key (enable encryption or change password)
// with a fresh password
router.post("/setPassword", authController.setPassword);

module.exports = router;

import express from "express";
const router = express.Router();
const authController = require("../controllers/authentication");
const { ensureAuth } = require("../middleware/auth");

router.get("/generateNonce/:address", authController.generateNonce);
router.get("/generateNonce", authController.generateNonce);

router.post("/confirmWallet", authController.confirmWallet);
router.post("/setPassword", ensureAuth, authController.setPassword);

module.exports = router;

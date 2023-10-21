import express from "express";
const router = express.Router();
const authController = require("../controllers/authentication");
const { ensureAuth } = require("../middleware/auth");

router.get("/getNonce/:address", authController.getNonce);
// failsafe with error message if reached
router.get("/getNonce", authController.getNonce);

router.post("/confirmWallet", authController.confirmWallet);
router.post("/setPassword", authController.setPassword);

module.exports = router;

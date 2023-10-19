import { Request, Response } from "express";
import User from "../models/User";
import { validateSignature, addressFormatValidation } from "../helpers/validations";
import { CONSTANT } from "../constants/constants";
import { createKeyPair } from "../helpers/encryption";
const jwt = require("jsonwebtoken");

module.exports = {
  generateNonce: async (req: Request, res: Response) => {
    const walletAddress = req.params.address;
    if (!addressFormatValidation(walletAddress)) {
      res
        .status(CONSTANT.HTTPRESPONSE.CODE.BADREQUEST)
        .json({ success: false, error: "The address you are trying to use is not valid." });
      return;
    }
    try {
      const exists = await User.findOne({ relatedWalletAddress: walletAddress });
      if (exists) {
        res.status(200).json({ success: true, randomNonce: exists.randomNonce });
      } else {
        const newUser = await User.create({
          relatedWalletAddress: walletAddress,
          randomNonce: Math.ceil(Math.random() * 1_000_000_000).toString(),
        });
        res.status(200).json({ success: true, randomNonce: newUser.randomNonce });
        return;
      }
    } catch (err) {
      console.error(err);
      res
        .status(CONSTANT.HTTPRESPONSE.CODE.INTERNAL_ERROR)
        .json({ success: false, error: "Error creating a random nonce." });
    }
  },
  confirmWallet: async (req: Request, res: Response) => {
    const signature = req.body.signature;
    const walletAddress = req.body.walletAddress;
    try {
      const exists = await User.findOne({ relatedWalletAddress: walletAddress });
      if (!exists) {
        res.status(CONSTANT.HTTPRESPONSE.CODE.BADREQUEST).json({
          success: false,
          error: "Provided address could not be found.  Please use /auth/generateNonce/your_address first.",
        });
        return;
      } else {
        const valid = await validateSignature(exists.randomNonce, signature, walletAddress);
        if (valid) {
          const token = jwt.sign(
            { id: exists._id, walletAddress: exists.relatedWalletAddress },
            process.env.SECRET_JWT_CODE,
            { expiresIn: process.env.JWT_EXPIRATION }
          );
          exists.randomNonce = Math.ceil(Math.random() * 1_000_000_000).toString();
          await exists.save();
          res
            .status(CONSTANT.HTTPRESPONSE.CODE.OK)
            .json({ success: true, token: token, message: "You are logged in." });
          return;
        } else {
          res.status(CONSTANT.HTTPRESPONSE.CODE.UNAUTHORIZED).end("Signed message invalid.");
        }
      }
    } catch (err) {}
  },
  setPassword: async (req: Request, res: Response) => {
    const password = req.body.password;
    try {
      const keypair = await createKeyPair(password);
      res.locals.user.encryptedPrivateKey = keypair.privateKey;
      res.locals.user.publicKey = keypair.publicKey;
      const saved = await res.locals.user.save();
      if (saved) {
        res
          .status(CONSTANT.HTTPRESPONSE.CODE.OK)
          .json({ success: true, token: res.locals.token, message: "Password successfully set." });
      } else {
        res
          .status(CONSTANT.HTTPRESPONSE.CODE.INTERNAL_ERROR)
          .json({ success: false, token: res.locals.token, error: "Your password could not be saved." });
      }
    } catch (err) {
      console.error(err);
    }
  },
};

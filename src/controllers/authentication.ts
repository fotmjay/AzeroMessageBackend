import { Request, Response } from "express";
import User from "../models/User";
import { validateSignature, addressFormatValidation } from "../helpers/validations";
import { CONSTANT } from "../constants/constants";
import { createKeyPair } from "../helpers/encryption";
const jwt = require("jsonwebtoken");

module.exports = {
  getNonce: async (req: Request, res: Response) => {
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
          error: "Provided address could not be found.  Please use /auth/getNonce/your_address first.",
        });
        return;
      } else {
        const valid = await validateSignature(exists.randomNonce, signature, walletAddress);
        if (valid) {
          exists.randomNonce = Math.ceil(Math.random() * 1_000_000_000).toString();
          await exists.save();
          const secretKeyExists = exists.encryptedPrivateKey !== undefined ? true : false;
          res.status(CONSTANT.HTTPRESPONSE.CODE.OK).json({
            success: true,
            hasKey: secretKeyExists,
            encryptedPrivateKey: exists.encryptedPrivateKey || undefined,
            message: `Successfully confirmed ownership${secretKeyExists && ", encrypted key sent"}.`,
          });
          return;
        } else {
          res.status(CONSTANT.HTTPRESPONSE.CODE.UNAUTHORIZED).end("Signed message invalid.");
        }
      }
    } catch (err) {}
  },
  setPassword: async (req: Request, res: Response) => {
    const encryptedPrivateKey = req.body.encryptedPrivateKey;
    const publicKey = req.body.publicKey;
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
          exists.randomNonce = Math.ceil(Math.random() * 1_000_000_000).toString();
          exists.encryptedPrivateKey = encryptedPrivateKey;
          exists.publicKey = publicKey;
          await exists.save();
          res.status(CONSTANT.HTTPRESPONSE.CODE.OK).json({
            success: true,
            hasKey: true,
            encryptedPrivateKey: exists.encryptedPrivateKey || undefined,
            publicKey: exists.publicKey,
            message: "Successfully confirmed ownership, encrypted private key saved.",
          });
          return;
        } else {
          res.status(CONSTANT.HTTPRESPONSE.CODE.UNAUTHORIZED).end("Signed message invalid.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  },
};

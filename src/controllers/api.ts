import Message from "../models/Message";
import User from "../models/User";
import { Request, Response } from "express";
import { CONSTANT } from "../constants/constants";
import { addressFormatValidation } from "../helpers/validations";

module.exports = {
  getMessagesByTarget: async (req: Request, res: Response) => {
    const address = req.params.address;
    if (req.params.target !== "receiver" && req.params.target !== "sender") {
      res
        .status(CONSTANT.HTTPRESPONSE.CODE.BADREQUEST)
        .json({ success: false, error: `Use /api/messages/(receiver:sender)/:address to query the API.` });
      return;
    } else if (!addressFormatValidation(address)) {
      res.status(CONSTANT.HTTPRESPONSE.CODE.BADREQUEST).json({ success: false, error: `Address format is invalid.` });
      return;
    }
    const target = req.params.target === "receiver" ? "to" : "from";
    try {
      const messagesForTarget = await Message.find({ [target]: address })
        .sort("-timestamp")
        .lean();
      res.status(200).json({ success: true, data: messagesForTarget });
    } catch (err) {
      res.status(CONSTANT.HTTPRESPONSE.CODE.INTERNAL_ERROR).json({ success: false, error: `${err._message}.` });
    }
  },
  getPublicEncryptionKey: async (req: Request, res: Response) => {
    const address = req.params.address;
    if (!addressFormatValidation(address)) {
      res.status(CONSTANT.HTTPRESPONSE.CODE.BADREQUEST).json({ success: false, error: `Address format is invalid.` });
      return;
    }
    try {
      const userFound = await User.findOne({ relatedWalletAddress: address });
      if (userFound.publicKey !== undefined) {
        res.status(CONSTANT.HTTPRESPONSE.CODE.OK).json({ success: true, message: userFound.publicKey });
        return;
      } else {
        res
          .status(CONSTANT.HTTPRESPONSE.CODE.NOTFOUND)
          .json({ success: false, error: `The owner has not yet activated encryption on this address.` });
      }
    } catch (err) {
      console.error(err);
    }
  },
  getEncryptedPrivateKey: async (req: Request, res: Response) => {},
};

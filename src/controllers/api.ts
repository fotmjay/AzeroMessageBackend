import Message from "../models/Message";
import { Request, Response } from "express";
import { fetchLatestWasmTransactions } from "../helpers/fetchLatestWasmTransactions";
import { requestEventOnChain } from "../helpers/requestEventOnChain";
import { TimestampBlock } from "sample-polkadotjs-typegen/types/ApiTypes";
import { CONSTANT } from "../constants/constants";

module.exports = {
  getMessagesByReceiver: async (req: Request, res: Response) => {
    try {
      const receiver = req.params.address;
      const messagesForReceiver = await Message.find({ to: receiver }).sort("-timestamp").lean();
      res.status(200).json({ success: true, data: messagesForReceiver });
    } catch (err) {
      res.status(CONSTANT.HTTPRESPONSE.CODE.INTERNAL_ERROR).json({ success: false, error: `${err._message}.` });
    }
  },
  getMessagesBySender: async function (req: Request, res: Response) {
    try {
      const sender = req.params.address;
      const messagesForSender = await Message.find({ from: sender }).sort("-timestamp").lean();
      res.status(200).json({ success: true, data: messagesForSender });
    } catch (err) {
      res.status(CONSTANT.HTTPRESPONSE.CODE.INTERNAL_ERROR).json({ success: false, error: `${err._message}.` });
    }
  },
};

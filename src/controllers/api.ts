const Message = require("../models/Message");
import { Request, Response } from "express";
import { fetchLatestWasmTransactions } from "../helpers/fetchLatestWasmTransactions";
import { requestEventOnChain } from "../helpers/requestEventOnChain";

module.exports = {
  getMessagesByReceiver: async (req: Request, res: Response) => {
    console.log("received");
    const data: number[] = await fetchLatestWasmTransactions();
    requestEventOnChain(data);
    res.send("end");
    //   const data = await Message.find({ owner: user.id }).sort({ firstName: "asc" }).lean();
    //   res
    //     .status(200)
    //     .json({ success: true, refreshToken: refreshToken, message: "Tenant data available sent.", data: data });
  },
  getMessagesBySender: async function (req, res, next) {},
  updateMessagesCollection: async (req, res) => {
    //   const messageToSave = req.body.data;
    //   const messageFrom = messageToSave.from;
    //   const messageTo = messageToSave.to;
    //   const messageText = messageToSave.text;
    //   try {
    //     const newMessage = new Message({
    //       from: messageFrom,
    //       to: messageTo,
    //       text: messageText,
    //     });
    //     const saveToDb = await newMessage.save();
    //     if (saveToDb) {
    //       res.status(200).json({ success: true });
    //     }
    //   } catch (err) {
    //     console.error(err);
    //     res.status(400).json({ success: false, error: `${err._message}.` });
    //   }
  },
};

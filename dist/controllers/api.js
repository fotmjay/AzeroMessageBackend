"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message = require("../models/Message");
const fetchLatestWasmTransactions_1 = require("../helpers/fetchLatestWasmTransactions");
const requestEventOnChain_1 = require("../helpers/requestEventOnChain");
module.exports = {
    getMessagesByReceiver: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("received");
        const data = yield (0, fetchLatestWasmTransactions_1.fetchLatestWasmTransactions)();
        (0, requestEventOnChain_1.requestEventOnChain)();
        const text = JSON.stringify(data);
        console.log(text);
        res.send(text);
        //   const data = await Message.find({ owner: user.id }).sort({ firstName: "asc" }).lean();
        //   res
        //     .status(200)
        //     .json({ success: true, refreshToken: refreshToken, message: "Tenant data available sent.", data: data });
    }),
    getMessagesBySender: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    },
    updateMessagesCollection: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
};

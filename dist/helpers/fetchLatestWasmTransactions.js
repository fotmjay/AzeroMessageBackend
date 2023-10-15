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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLatestWasmTransactions = void 0;
const axios_1 = require("../config/axios");
const endpointForApi_1 = require("../constants/endpointForApi");
const constants_1 = require("../constants/constants");
const Message_1 = __importDefault(require("../models/Message"));
const fetchLatestWasmTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const allTransactions = [];
    try {
        const latestAdded = yield Message_1.default.findOne().sort("-blockNumber"); // give me the most recent one
        const receivedTxList = yield axios_1.axiosInstance.post(endpointForApi_1.APIENDPOINTS.contractTransactions, {
            contract: constants_1.CONSTANT.CONTRACTADDRESS,
            row: 100,
            page: 0,
        });
        if (receivedTxList) {
            receivedTxList.data.data.list.forEach((tx) => {
                const block = parseInt(tx.extrinsic_index, 10);
                if (latestAdded === null || block > latestAdded.blockNumber) {
                    allTransactions.push(tx);
                }
            });
            return allTransactions;
        }
    }
    catch (err) {
        console.error(err);
    }
});
exports.fetchLatestWasmTransactions = fetchLatestWasmTransactions;

import { axiosInstance } from "../config/axios";
import { APIENDPOINTS } from "../constants/endpointForApi";
import { CONSTANT } from "../constants/constants";
import Message from "../models/Message";
import { requestEventOnChain } from "./requestEventOnChain";

export const fetchLatestWasmTransactions = async () => {
  const allBlocksWithTransactions = [];
  try {
    const latestAdded = await Message.findOne().sort("-blockNumber"); // give me the most recent one
    const receivedTxList = await axiosInstance.post(APIENDPOINTS.contractTransactions, {
      contract: CONSTANT.CONTRACTADDRESS,
      row: 100,
      page: 0,
    });
    if (receivedTxList) {
      receivedTxList.data.data.list.forEach((tx) => {
        const block = parseInt(tx.extrinsic_index, 10);
        if (latestAdded === null || block > latestAdded.blockNumber) {
          allBlocksWithTransactions.push(block);
        }
      });
      return allBlocksWithTransactions;
    }
  } catch (err) {
    console.error(err);
  }
};

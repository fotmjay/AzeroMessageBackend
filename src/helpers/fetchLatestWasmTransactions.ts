import { axiosInstance } from "../config/axios";
import { APIENDPOINTS } from "../constants/endpointForApi";
import { CONSTANT } from "../constants/constants";
import Message from "../models/Message";
import { requestEventOnChain } from "./requestEventOnChain";
import type { ContractTransactions, TimestampBlock } from "sample-polkadotjs-typegen/types/ApiTypes";

export const fetchLatestWasmTransactions = async () => {
  const allBlocksWithTransactions: TimestampBlock[] = [];
  try {
    const latestAdded = await Message.findOne().sort("-timestamp"); // give me the most recent one
    const transactionData = await axiosInstance.post(APIENDPOINTS.contractTransactions, {
      contract: CONSTANT.CONTRACT.ADDRESS,
      row: 100,
      page: 0,
    });
    if (transactionData) {
      const txList = transactionData.data.data.list;
      txList.forEach((tx) => {
        const blockNumber = parseInt(tx.extrinsic_index, 10);
        const extrinsic_index = tx.extrinsic_index;
        const blockTimestamp = tx.block_timestamp;
        if (latestAdded === null || blockTimestamp >= latestAdded.timestamp) {
          allBlocksWithTransactions.push({ blockNumber, blockTimestamp, extrinsic_index });
        }
      });
      return allBlocksWithTransactions;
    }
  } catch (err) {
    console.error(err);
  }
};

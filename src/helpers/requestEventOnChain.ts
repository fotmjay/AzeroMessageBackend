import metadata = require("../assets/azero_message.json");
import { Abi } from "@polkadot/api-contract";
import { ApiDecoration } from "@polkadot/api/types";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { CONSTANT } from "../constants/constants";
import { EventRecord } from "@polkadot/types/interfaces";
import { TimestampBlock } from "sample-polkadotjs-typegen/types/ApiTypes";
import { writeToDatabase } from "../middleware/writeToDatabase";
import { explorerLinkFormatter } from "./explorerLinkFormatter";
import { fetchLatestWasmTransactions } from "./fetchLatestWasmTransactions";
const connectDB = require("../config/database");

export const runDatabaseUpdate = async (req, res, next) => {
  try {
    await connectDB();
    const data: TimestampBlock[] = await fetchLatestWasmTransactions();
    await requestEventOnChain(data);
    console.log("Updating database");
  } catch (err) {
    console.error(err);
  }
  next();
};

export const requestEventOnChain = async (blocks: TimestampBlock[]) => {
  const provider = new WsProvider(CONSTANT.PROVIDER);
  const api = new ApiPromise({ provider: provider, noInitWarn: true });
  try {
    await api.isReady;
    const blockHashes = [];
    blocks.forEach(async ({ blockTimestamp, blockNumber, extrinsic_index }) => {
      const blockHash = await getBlockHashFromBlockNumber(blockNumber, api);
      const fullBlock = await getFullBlockFromBlockHash(blockHash, api);
      getDecodedEmittedEventsFromFullBlock(fullBlock, blockTimestamp, extrinsic_index, api);
    });
  } catch (err) {
    console.error(err);
  }
};

const getBlockHashFromBlockNumber = async (blockNumber: number, api: ApiPromise) => {
  try {
    const blockHash = (await api.rpc.chain.getBlockHash(blockNumber)).toString();
    return blockHash;
  } catch (err) {
    console.error(err);
  }
};

const getFullBlockFromBlockHash = async (blockHash: string, api: ApiPromise) => {
  try {
    const fullBlock = await api.at(blockHash);
    return fullBlock;
  } catch (err) {
    console.error(err);
  }
};

const getDecodedEmittedEventsFromFullBlock = async (
  fullBlock: ApiDecoration<"promise">,
  blockTimestamp: number,
  extrinsic_index,
  api: ApiPromise
) => {
  try {
    const eventCache = [];
    const events = await fullBlock.query.system.events<EventRecord[]>();
    events.forEach(({ event }) => {
      if (api.events.contracts.ContractEmitted.is(event)) {
        const [account_id, contract_evt] = event.data;
        if (account_id.toHuman() === CONSTANT.CONTRACT.ADDRESS) {
          // @ts-ignore
          const decoded = new Abi(metadata).decodeEvent(contract_evt);
          if (decoded.event.identifier === CONSTANT.CONTRACT.METHODS.MESSAGESENT) {
            const explorerLink = explorerLinkFormatter(
              CONSTANT.EXPLORER.URL,
              CONSTANT.EXPLORER.ENDPOINTS.EXTRINSIC,
              extrinsic_index
            );
            const emittedEventToSave = {
              from: decoded.args[0].toString(),
              to: decoded.args[1].toString(),
              text: decoded.args[2].toString(),
              encrypted: decoded.args[3].toString(),
            };
            if (
              eventCache.findIndex(
                (event) =>
                  event.from === emittedEventToSave.from &&
                  event.to === emittedEventToSave.to &&
                  event.text === emittedEventToSave.text
              ) === -1
            ) {
              eventCache.push(emittedEventToSave);
              writeToDatabase(emittedEventToSave, blockTimestamp, explorerLink);
            }
          }
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
};

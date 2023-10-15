import { Abi } from "@polkadot/api-contract";
import metadata = require("../assets/metadata.json");
import { ApiPromise, WsProvider } from "@polkadot/api";
import { CONSTANT } from "../constants/constants";

export const requestEventOnChain = async (blocks: number[]) => {
  const provider = new WsProvider(CONSTANT.PROVIDER);
  const api = new ApiPromise({ provider: provider });
  await api.isReady;
  const blockHashes = [];
  blocks.forEach((blockNumber) => {
    api.rpc.chain.getBlockHash(blockNumber).then((hash) => blockHashes.push(hash));
  });

  // const blockHash = await api.rpc.chain.getBlockHash(60563574);
  // const block = await api.at(blockHash);
  // const events = await block.query.system.events();
  // @ts-ignore
  // events.forEach(({ event }) => {
  //   if (api.events.contracts.ContractEmitted.is(event)) {
  //     const [account_id, contract_evt] = event.data;
  //     // @ts-ignore
  //     const decoded = new Abi(metadata).decodeEvent(contract_evt);
  //     console.log(decoded);
  //     console.log(decoded.args[0].toPrimitive());
  //     console.log(decoded.args[1].toPrimitive());
  //     console.log(decoded.args[2].toPrimitive());
  //   }
  // });
};

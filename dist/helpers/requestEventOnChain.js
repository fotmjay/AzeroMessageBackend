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
exports.requestEventOnChain = void 0;
const api_contract_1 = require("@polkadot/api-contract");
const metadata = require("../assets/metadata.json");
const api_1 = require("@polkadot/api");
const constants_1 = require("../constants/constants");
const requestEventOnChain = () => {
    const wsProvider = new api_1.WsProvider(constants_1.CONSTANT.PROVIDER);
    api_1.ApiPromise.create({ provider: wsProvider }).then((api) => {
        requests(api);
    });
    //   const contractAddress = "5GEDATiqzWkVu98jdSi2EuJ2Xtee2KoB7fMoRnJPTVAvqoVq";
    //   const blockHash = await api.rpc.chain.getBlockHash(60563574);
    //   const block = await api.at(blockHash);
    //   const events = await block.query.system.events();
    //   console.log("here");
    //   events.forEach(({ event, phase }) => {
    //     if (provider.api.events.contracts.ContractEmitted.is(event)) {
    //       const [account_id, contract_evt] = event.data;
    //       const decoded = new Abi(metadata).decodeEvent(contract_evt);
    //       console.log(decoded);
    //       console.log(decoded.args[0].toPrimitive());
    //       console.log(decoded.args[1].toPrimitive());
    //       console.log(decoded.args[2].toPrimitive());
    //     }
    //   });
    // const data = await provider.api.query.system.account(contractAddress);
    // console.log(data);
};
exports.requestEventOnChain = requestEventOnChain;
const requests = (api) => __awaiter(void 0, void 0, void 0, function* () {
    const blockHash = yield api.rpc.chain.getBlockHash(60563574);
    const block = yield api.at(blockHash);
    const events = yield block.query.system.events();
    console.log("here");
    events.forEach(({ event, phase }) => {
        if (api.events.contracts.ContractEmitted.is(event)) {
            const [account_id, contract_evt] = event.data;
            const decoded = new api_contract_1.Abi(metadata).decodeEvent(contract_evt);
            console.log(decoded);
            console.log(decoded.args[0].toPrimitive());
            console.log(decoded.args[1].toPrimitive());
            console.log(decoded.args[2].toPrimitive());
        }
    });
});

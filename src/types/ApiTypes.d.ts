export type TimestampBlock = {
  blockNumber: number;
  blockTimestamp: number;
  extrinsic_index: string;
};

export type ContractTransactions = {
  extrinsic_index: string;
  contract_address: { address: string };
  account_display: { address: string };
  block_timestamp: number;
  success: boolean;
};

import { createConfig } from "ponder";
import { MancerFlowAbi } from "./abis/MancerFlowAbi";

export default createConfig({
  chains: {
    eduChainTestnet: {
      id: 656476,
      rpc: process.env.PONDER_RPC_URL_1!,
    },
  },
  contracts: {
    MancerFlow: {
      chain: "eduChainTestnet",
      abi: MancerFlowAbi,
      address: "0x0fe44adB7854Cad8F11521e6D7C5eb5B7118EC0b",
      startBlock: 33864686,
    },
  },
});

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import { http } from "wagmi";
import { eduChainTestnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "MancerFlow",
  projectId: process.env.VITE_WALLETCONNECT_PROJECT_ID!,
  chains: [eduChainTestnet],
  transports: {
    [eduChainTestnet.id]: http("https://rpc.open-campus-codex.gelato.digital"),
  },
});

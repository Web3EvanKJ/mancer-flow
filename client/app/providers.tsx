"use client";

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/config";
import { apolloClient } from "@/apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apolloClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

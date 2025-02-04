'use client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains'; // add baseSepolia for testing
import { createConfig } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { http } from 'viem';
import { baseSepolia } from 'wagmi/chains';

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
    chains: [baseSepolia],
    connectors: [
      coinbaseWallet({
        appName: 'onchainkit',
      }),
    ],
    ssr: true,
    transports: {
      [baseSepolia.id]: http(),
    },
  });
 
export function Providers(props: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          config={{ appearance: { theme: 'base' } }}
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
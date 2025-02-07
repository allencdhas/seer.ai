'use client';
import React from 'react';
import { useAccount } from 'wagmi';
import { WalletDefault } from '@coinbase/onchainkit/wallet';

export const Header = () => {
  return (
    <header className="p-4 border-b">
      <nav>
        <section className='flex w-full flex-col md:flex-row'>
          <div className='flex w-full flex-row items-center justify-between gap-2 md:gap-0'>
            <p className="text-4xl font-bold text-blue-500">
          seer.AI
            </p>
            <div className="flex items-center gap-3">
              <WalletDefault />
            </div>
          </div>
        </section>
      </nav>
    </header>
  );
};
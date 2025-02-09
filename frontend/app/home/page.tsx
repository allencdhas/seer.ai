'use client';


import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom/client'


import { Header } from "@/components/Header";
import NFTCards from "@/components/nftCard";

import { Swap, SwapDefault } from "@coinbase/onchainkit/swap";
import { NFTData } from "@/components/nftCard";
import ElizaChat from "@/components/ElizaChat";
import type { Token } from '@coinbase/onchainkit/token';
import OpenSeaSearch from "@/components/openseaAPIsearch";
import { NextResponse } from 'next/server';

const eth: Token = {
  name: 'ETH',
  address: '',
  symbol: 'ETH',
  decimals: 18,
  image:
    'https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png',
  chainId: 8453,
};
 
const usdc: Token = {
  name: 'USDC',
  address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
  symbol: 'USDC',
  decimals: 6,
  image:
    'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/44/2b/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213-ZWUzYjJmZGUtMDYxNy00NDcyLTg0NjQtMWI4OGEwYjBiODE2',
  chainId: 8453,
};

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')


    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
                {/* Left side - NFT collection */}
                <div className="w-1/2 p-4 overflow-y-auto">
                    <OpenSeaSearch />
                </div>
                
                <div className="border-l-2 border-t-2 border-r-4 border-b-4 border-slate-500 rounded-lg p-4 w-1/2 m-4 overflow-y-auto relative max-h-[calc(100vh-8rem)]">
                    <ElizaChat />
                </div>
            </div>
        </div>
    )
}

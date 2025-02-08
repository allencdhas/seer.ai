import { NFTCardDefault } from "@coinbase/onchainkit/nft"
import { useState } from "react"

// Define types for our props and NFT data
interface NFTCardProps {
  onNFTClick: (nft: NFTData) => void;
}

export interface NFTData {
  contractAddress: string;
  tokenId: string;
  title: string;
  imageUrl: string;
}

// Mock NFT data - replace with your actual NFT data source
const mockNFTs: NFTData[] = [
  {
    contractAddress: '0xb4703a3a73aec16e764cbd210b0fde9efdab8941',
    tokenId: '1',
    title: 'NFT #1',
    imageUrl: 'https://example.com/image1.png',
  },
  {
    contractAddress: '0xb4703a3a73aec16e764cbd210b0fde9efdab8941',
    tokenId: '2',
    title: 'NFT #2',
    imageUrl: 'https://example.com/image2.png',
  },
  // Add more NFTs as needed
];

function useNFTData(nft: NFTData) {
  return {
    title: nft.title,
    imageUrl: nft.imageUrl,
  }
}

export default function NFTCards({ onNFTClick }: NFTCardProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {mockNFTs.map((nft) => (
        <div 
          key={`${nft.contractAddress}-${nft.tokenId}`}
          onClick={() => onNFTClick(nft)}
          className="cursor-pointer hover:opacity-80 transition-opacity relative group"
        >
          <div className="relative">
            <NFTCardDefault
              contractAddress={nft.contractAddress}
              tokenId={nft.tokenId}
              useNFTData={() => useNFTData(nft)}
            />
            <div className="absolute inset-0 border-r-4 border-b-4 rounded-lg border-slate-500 translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
          </div>
        </div>
      ))}
    </div>
  );
}
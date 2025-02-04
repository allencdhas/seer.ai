import { WalletDefault } from "@coinbase/onchainkit/wallet";
import Image from "next/image";
import { WalletComponents } from "@/components/WalletComponents";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center flex-col min-h-screen">
        <p className="text-4xl font-bold pb-5 text-blue-500">
          seer.AI
        </p>
        <div className="flex justify-center items-center flex-col border-2 border-gray-300 rounded-lg p-5">
          <h1 className="text-2xl font-bold pb-5">Connect your wallet</h1>
          <WalletComponents />
        </div>
      </div>
    </>
  );
}

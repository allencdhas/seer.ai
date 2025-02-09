import { WalletDefault } from "@coinbase/onchainkit/wallet";
import Image from "next/image";
import { WalletComponents } from "@/components/WalletComponents";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Header />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="flex justify-center items-center flex-col">
          <p className="text-4xl font-bold pb-5 text-slate-300">
            seer.AI
          </p>
          <div className="flex justify-center items-center flex-col border-4 border-neutral-500 rounded-lg p-5">
            <h1 className="text-2xl font-bold pb-5 text-slate-500 text-center">Connect your wallet</h1>
            <WalletComponents />
          </div>
        </div>
      </div>
    </div>
  );
}

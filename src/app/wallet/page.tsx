'use client';

import { Page } from "@/components/Page";
import Link from "next/link";
import { useState } from "react";

export default function WalletPage() {
    const [activeTab, setActiveTab] = useState<'balance' | 'history'>('balance');

    return (
        <Page>
            <div className="flex flex-col items-center mt-20 h-full">
                <h1 className="text-white text-3xl font-bold">Vibe and get real</h1>
                <span className="text-white text-xl mt-2">The Dao</span>
                <button disabled className="bg-blue-700 text-white hover:bg-blue-700 hover:text-white transition-all duration-75 py-4 px-6 rounded-full shadow border mt-12 disabled:bg-gray-400 disabled:text-gray-600 disabled:border-gray-400">
                    <span className="text-sm font-semibold">Connect Wallet (Coming Soon)</span>
                </button>

                {/* Tab Content */}
                <div className="flex flex-col gap-2 w-full mt-6 overflow-y-auto relative">
                    <div style={{backgroundImage:"url('/assets/wallet-frame.png')", backgroundSize:"contain", backgroundPosition:"center", backgroundRepeat:"no-repeat"}} className='w-full h-80'/>
                    <div className="absolute top-0 left-0 w-full h-full  flex justify-center">
                        <div className="flex gap-4 mt-6 w-full max-w-[80vw] h-12">
                            <button 
                                onClick={() => setActiveTab('balance')}
                                className={`flex-1 py-2 px-4 rounded-full text-white font-medium ${
                                    activeTab === 'balance' ? 'bg-blue-700' : 'bg-gray-700'
                                }`}
                            >
                                Balance
                            </button>
                            <button 
                                onClick={() => setActiveTab('history')}
                                className={`flex-1 py-2 px-4 rounded-full text-white font-medium ${
                                    activeTab === 'history' ? 'bg-blue-700' : 'bg-gray-700'
                                }`}
                            >
                                History
                            </button>
                        </div>
                        <div className="w-full flex justify-start absolute top-24 left-10">
                            {
                                activeTab === 'balance' && (
                                    <div className="text-start flex flex-row gap-10 items-center w-full">
                                        <div className="flex flex-row gap-2 items-center">
                                            <img src="/assets/ape2.jpg" alt="VIBE" className="w-10 h-10 rounded-full" />
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold">APE KING KONG</span>
                                                <span className="text-white text-sm font-bold">0.00</span>
                                            </div>
                                        </div>
                                        <Link href="/" className="p-2 px-4 pb-2 pt-1 bg-blue-700 text-white rounded-full">
                                            <span className="text-xs font-semibold">Ready to Farm</span>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                        <div className="w-full flex justify-center items-center absolute top-32 left-0">
                            {
                                    activeTab === 'history' && (
                                        <div className="flex flex-row justify-center items-center gap-2">
                                            <img src="/assets/icon/svg/clock.svg" alt="History" width={20} height={20} />
                                            <span className="text-white text-lg font-semibold">Coming Soon</span>
                                        </div>
                                    )
                                }
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
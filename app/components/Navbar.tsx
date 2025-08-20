"use client";
import { useState } from "react";
import { createThirdwebClient } from "thirdweb";
import {  ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { bscTestnet } from "thirdweb/chains";
import Link from "next/link";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const thirdwebKey = process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY;

export default function DynamicNavbar() {
  const client = createThirdwebClient({ clientId, secretKey: thirdwebKey || "" });
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  const wallets = [
    inAppWallet(),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ];

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <nav 
        className={`
          transition-all duration-300 ease-in-out
          bg-gray-900/80 backdrop-blur-xl 
          border border-gray-700/50
          shadow-2xl shadow-black/20
          text-white text-sm
          ${isExpanded 
            ? 'rounded-3xl px-6 py-3 min-w-[600px]' 
            : 'rounded-full px-8 py-3 min-w-[200px]'
          }
        `}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Compact State */}
        {!isExpanded && (
          <div className="flex items-center justify-center gap-3">
            <span className="font-bold text-lg bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Primordium
            </span>
          </div>
        )}

        {/* Expanded State */}
        {isExpanded && (
          <div className="flex items-center justify-between gap-6">
            {/* Left Navigation */}
            <div className="flex items-center gap-6">
              <span className="font-bold text-lg bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Primordium
              </span>
              <Link
                href="/" 
                className="hover:text-teal-300 transition-colors duration-200 font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/data" 
                className="hover:text-teal-300 transition-colors duration-200 font-medium"
              >
                0G Upload
              </Link>
            </div>

            {/* Right Wallet Connection */}
            <div className="flex items-center">
                <ConnectButton 
                  client={client} 
                  chain={bscTestnet} 
                  wallets={wallets}
                  connectButton={{
                    style: {
                      background: 'rgba(20, 184, 166, 0.2)',
                      border: '1px solid rgba(20, 184, 166, 0.3)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '14px',
                      padding: '8px 16px',
                    }
                  }}
                />
            </div>
          </div>
        )}

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </nav>
    </div>
  );
}
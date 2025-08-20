"use client";

import { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from "@apollo/client";
import { useActiveAccount } from "thirdweb/react";
import Image from "next/image";
import Link from "next/link";
import Silk from "./components/ui/silk";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <Silk />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.jpg"
              alt="Primordium Logo"
              width={300}
              height={300}
              className="rounded-full shadow-2xl"
            />
          </div>

          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Welcome to Primordium
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Long gone are the days when one had to lose all their data to private companies, losing their autonomy over it, and risking their privacy. With primordium, you can now be in the ownership of when and where your data gets used, and get paid for its usage. With our teck-stack using 0g storage and 0g-AI, we will make you the owner of your data, refine it for industrial use and reward you with an iNFT to mark your ownership over the data.
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link href="/data">
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-full text-lg font-bold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Start Uploading Your Data
              </div>
            </Link>
          </div>

          {/* Milestones Section */}
          <div className="mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Development Milestones
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Wavehack 1 */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border-2 border-green-400/50 p-6 shadow-2xl hover:shadow-green-400/25 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-300">Wavehack 1</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Create a mockup webpage that demonstrates our idea, utilizes 0g storage, optimizes the storage usage such that data indexing and DA(availability) is done properly.
                </p>
              </div>

              {/* Wavehack 2 */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border-2 border-white/20 p-6 shadow-2xl hover:shadow-white/25 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Wavehack 2</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Integrate iNFTs and on-chain directory with the data to keep a record of our contributors for fee/reward distribution in the end.
                </p>
              </div>

              {/* Wavehack 3 */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border-2 border-white/20 p-6 shadow-2xl hover:shadow-white/25 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Wavehack 3</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Use 0g Compute to eventually run a model with the custom data on a specific topic. Use ocr to clean the data and store in more data-friendly files.
                </p>
              </div>

              {/* Wavehack 4 */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border-2 border-white/20 p-6 shadow-2xl hover:shadow-white/25 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Wavehack 4</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Complete the end-to-end flow where all the data is properly cleaned, kept in the backend until the size goal is reached, then packed up and made available for the world to use and then distribute usage rewards to our users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
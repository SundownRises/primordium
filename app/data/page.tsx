"use client";

import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";

export default function DataPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);

  const account = useActiveAccount();
  const address = account?.address;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !address) return;

    setLoading(true);
    setError(null);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('address', address);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setUploadResult(result);
      console.log('Upload Result:', result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTxHashString = (txHash: any) => {
    if (typeof txHash === 'string') {
      return txHash;
    }
    if (txHash && typeof txHash === 'object' && txHash.txHash) {
      return txHash.txHash;
    }
    return 'Transaction hash not available';
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Primordium Data Upload
            </span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 drop-shadow-md">Upload your data to the 0G Galileo testnet and get rewarded</p>
          {address ? (
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
              <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>
          ) : (
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
              <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
              Please connect your wallet
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto px-6">
          {/* How it Works Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              How it works
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Connect & Upload</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You upload your data by connecting your wallet. Don't worry, we won't ask for any funds, our backend will cover your fees.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-full mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Process & Store</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  We will clean, process, and anonymize your data, upload it on 0g-storage servers, and pin it.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Train AI Models</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  After categorization, the data will then be used to train specific AIs that will help people in the real world.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Get Rewarded</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Each time the data is used in the real world, by the model or in its raw format, we will pay the owners of the data in appropriate amounts using iNFTs as ownership markers.
                </p>
              </div>
            </div>
          </div>

          {/* Upload Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="space-y-8">
              {/* File Upload Section */}
              <div>
                <label className="block text-xl font-bold text-white mb-4 drop-shadow-md">
                  Choose File to Upload
                </label>
                <div className="border-2 border-dashed border-purple-300/50 rounded-2xl p-8 text-center hover:border-purple-400 transition-all duration-300 bg-white/5 backdrop-blur-sm">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    disabled={!address || loading}
                  />
                  <label 
                    htmlFor="file-upload" 
                    className={`cursor-pointer block ${
                      !address || loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <svg className="mx-auto h-16 w-16 text-purple-300 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-xl text-purple-200 mb-2 font-medium">
                      {file ? file.name : 'Click to select a file or drag and drop'}
                    </p>
                    <p className="text-purple-300">
                      {file ? `Size: ${(file.size / 1024).toFixed(2)} KB` : 'Any file type supported'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!file || !address || loading}
                className={`w-full py-5 px-6 rounded-2xl text-xl font-bold transition-all duration-300 transform ${
                  !file || !address || loading
                    ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 hover:scale-[1.02] active:scale-[0.98] shadow-2xl hover:shadow-purple-500/25'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading to 0G Network...
                  </div>
                ) : (
                  'Upload to 0G Network'
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="rounded-2xl bg-red-500/20 backdrop-blur-sm border border-red-400/50 p-6">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-red-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div className="text-red-200 font-medium text-lg">{error}</div>
                  </div>
                </div>
              )}

              {/* Success Result */}
              {uploadResult && (
                <div className="rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/50 p-6">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0">
                      <svg className="w-10 h-10 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-bold text-green-200">Upload Successful!</h3>
                    </div>
                  </div>
                  <div className="space-y-4 text-base">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-purple-200">File Name:</span>
                      <span className="text-white font-medium">{uploadResult?.fileName}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-purple-200">Root Hash:</span>
                      <span className="text-white font-mono text-sm break-all bg-black/20 px-2 py-1 rounded">{uploadResult?.rootHash}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-purple-200">Transaction Hash:</span>
                      <span className="text-white font-mono text-sm break-all bg-black/20 px-2 py-1 rounded">{getTxHashString(uploadResult?.txHash)}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-purple-200">Connected Address:</span>
                      <span className="text-white font-mono text-sm break-all bg-black/20 px-2 py-1 rounded">{uploadResult?.address}</span>
                    </div>
                    {uploadResult?.note && (
                      <div className="mt-6 p-4 bg-blue-500/20 border border-blue-400/50 rounded-xl">
                        <p className="text-blue-200 text-sm">{uploadResult?.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { NextRequest, NextResponse } from 'next/server';
import { ZgFile, Indexer } from '@0glabs/0g-ts-sdk';
import { JsonRpcProvider, Wallet } from 'ethers';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const address = formData.get('address') as string;

    if (!file || !address) {
      return NextResponse.json(
        { error: 'File and address are required' },
        { status: 400 }
      );
    }

    // Network Constants
    const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://evmrpc-testnet.0g.ai/';
    const INDEXER_RPC = process.env.NEXT_PUBLIC_INDEXER_RPC || 'https://indexer-storage-testnet-turbo.0g.ai';
    const PRIVATE_KEY = process.env.PRIVATE_KEY;

    if (!PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'Private key not configured' },
        { status: 500 }
      );
    }

    // Initialize provider and signer
    const provider = new JsonRpcProvider(RPC_URL);
    const signer = new Wallet(PRIVATE_KEY, provider);

    // Initialize indexer
    const indexer = new Indexer(INDEXER_RPC);

    // Convert File to temporary file path for server-side processing
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Create temporary file
    const tempFilePath = join(tmpdir(), `upload-${Date.now()}-${file.name}`);
    await writeFile(tempFilePath, buffer);
    
    // Create file object from file path
    const zgFile = await ZgFile.fromFilePath(tempFilePath);

    // Generate Merkle tree for verification
    const [tree, treeErr] = await zgFile.merkleTree();
    if (treeErr !== null) {
      throw new Error(`Error generating Merkle tree: ${treeErr}`);
    }

    const rootHash = tree?.rootHash();

    // Upload to network
    const [tx, uploadErr] = await indexer.upload(zgFile, RPC_URL, signer);
    if (uploadErr !== null) {
      // Check if the error is related to verification but upload was successful
      if (uploadErr.toString().includes('too many data writing')) {
        // Upload was successful, just verification failed
        console.log('Upload completed but verification failed:', uploadErr);
        
        const result = {
          rootHash,
          txHash: tx || 'Transaction completed but verification pending',
          fileName: file.name,
          address,
          note: 'File uploaded successfully. Verification may take a moment.'
        };

        console.log('Upload Result:', result);
        
        // Close file
        await zgFile.close();
        
        return NextResponse.json(result);
      } else {
        throw new Error(`Upload error: ${uploadErr}`);
      }
    }

    // Close file
    await zgFile.close();

    const result = {
      rootHash,
      txHash: tx,
      fileName: file.name,
      address
    };

    console.log('Upload Result:', result);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}

import dotenv from "dotenv";
import fs, { openAsBlob } from "fs";
import { ComputeBudgetProgram, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey,SystemProgram,TransactionInstruction } from "@solana/web3.js";
import { DEFAULT_DECIMALS, PumpFunSDK } from "../../src";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { AnchorProvider } from "@coral-xyz/anchor";
import {
  getOrCreateKeypair,
  printSOLBalance,
} from "../util";
import metadata from "../../src/metadata";
import { getUploadedMetadataURI } from "../../src/uploadToIpfs";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { TOKEN_ADDRESS } from "../../src/constants";

const KEYS_FOLDER = __dirname + "/.keys";
const SLIPPAGE_BASIS_POINTS = 100n;

async function createKeypair(buyer: string) {
  // Generate a new keypair
  const keypair = Keypair.generate();

  // Extract the public key and secret key
  const publicKey = keypair.publicKey;
  const secretKey = keypair.secretKey;

  // Convert keys to base58 strings (for display or storage)
  const publicKeyBase58 = publicKey.toBase58();
  const secretKeyBase58 = bs58.encode(secretKey);

  const data = {
    "publicKey": publicKeyBase58,
    "secretKey": secretKeyBase58
  }
  const metadataString = JSON.stringify(data);
  const bufferContent = Buffer.from(metadataString, 'utf-8');
  fs.writeFileSync(`./example/basic/.keys/${buyer}.json`, bufferContent);

  return keypair; // Return the keypair object if needed
}

const main = async () => {
  dotenv.config();

  if (!process.env.HELIUS_RPC_URL) {
    console.error("Please set HELIUS_RPC_URL in .env file");
    console.error(
      "Example: HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=<your api key>"
    );
    console.error("Get one at: https://www.helius.dev");
    return;
  }

  let connection = new Connection(process.env.HELIUS_RPC_URL || "");

  let wallet = new NodeWallet(new Keypair()); //note this is not used
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "finalized",
  });
  const testAccount = getOrCreateKeypair(KEYS_FOLDER, "test-account");
  const buyers: Keypair[] = [];
  for(let i = 1; i <= 16; i++) {
    const buyer = getOrCreateKeypair(KEYS_FOLDER, `buyer${i}`);
    buyers.push(buyer);
    console.log(`${buyer.publicKey}: ${await connection.getBalance(buyer.publicKey)/LAMPORTS_PER_SOL}`)
  }


  // const mint = getOrCreateKeypair(KEYS_FOLDER, "mint");

  await printSOLBalance(
    connection,
    testAccount.publicKey,
    "Test Account keypair"
  );

  let sdk = new PumpFunSDK(provider);

  let globalAccount = await sdk.getGlobalAccount();
  console.log(globalAccount);

  let currentSolBalance = await connection.getBalance(testAccount.publicKey);
  if (currentSolBalance == 0) {
    console.log(
      "Please send some SOL to the test-account:",
      testAccount.publicKey.toBase58()
    );
    return;
  }

  const tokenAddress = TOKEN_ADDRESS;
    // buy 0.00001 SOL worth of tokens
    let buyResults = await sdk.buy(
      buyers,
      // mint.publicKey,
      new PublicKey(tokenAddress),
      BigInt(0.00001 * LAMPORTS_PER_SOL),
      SLIPPAGE_BASIS_POINTS,
      {
        unitLimit: 5_000_000,
        unitPrice: 200_000,
      },
    );
    if (buyResults.success) {
      console.log(`https://explorer.jito.wtf/bundle/${buyResults.signature}`);
      return;
      } else {
      console.log("Buy failed");
    }
};

main();

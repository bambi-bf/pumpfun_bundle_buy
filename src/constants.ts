import dotenv from "dotenv";
dotenv.config();

export const RPC_ENDPOINT = process.env.HELIUS_RPC_URL;
export const RPC_WEBSOCKET_ENDPOINT = process.env.HELIUS_RPC_URL_WSS
export const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
export const JITO_FEE = 5000000
export const COMMITMENT_LEVEL = "confirmed"
export const JITO_KEY="66xqL9aFZJ8k9YpjNBexNASfuoDgNE1ZpGRXB28zoTfS4u2czzVBhMNMqgZYFeMN8FnUi6gMzXWgVYRHkTZ6yuLC"
export const BLOCKENGINE_URL="tokyo.mainnet.block-engine.jito.wtf"
export const JITO_AUTH_KEYPAIR = "66xqL9aFZJ8k9YpjNBexNASfuoDgNE1ZpGRXB28zoTfS4u2czzVBhMNMqgZYFeMN8FnUi6gMzXWgVYRHkTZ6yuLC"
export const CHECK_FILTER=true
export const CHECK_SOCIAL=true
export const CHECK_NAMEWHITELIST=false
export const CHECK_NAMEBLACKLIST=false
export const CHECK_WALLETWHITELIST=false
export const CHECK_WALLETBLACKLIST=false
export const CHECK_SOLDBALANCE=true
export const USE_SNIPE_LIST=false
export const JITO_MODE = true
export const JITO_ALL = false
export const stop_loss=-0.1
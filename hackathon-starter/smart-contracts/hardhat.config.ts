import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";
const RPC_URL = process.env.RPC_URL ?? "https://testnet-rpc.clayer.io";

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.24",
        settings: {
            optimizer: { enabled: true, runs: 200 }
        }
    },
    networks: {
        circle_testnet: {
            url: RPC_URL,
            accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
        }
    }
};

export default config;
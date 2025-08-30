# Core Layer Hackathon Starter

Kickstart your Core Layer hackathon project with this ready-to-use starter that includes:

- Smart contracts (Hardhat + TypeScript)
- Minimal React frontend (Vite + Ethers.js)
- One-command deploy to Core Layer Testnet
- Environment variables template and end-to-end instructions

## What’s inside

```
hackathon-starter/
├── smart-contracts/        # Hardhat project with a simple Counter contract
├── web/                    # Vite + React app using Ethers.js
└── env.example             # Shared env template (copy into both subprojects)
```

## Prerequisites

- Node.js 18+
- npm or yarn
- A wallet with test funds from the Core Layer Faucet

Useful links:
- Docs: https://docs.clayer.io
- Testnet RPC: https://testnet-rpc.clayer.io
- Block Explorer: https://explorer-testnet.clayer.io
- Faucet: https://faucet.clayer.io

## 1) Create .env files

From the `hackathon-starter/` directory:

```bash
cp env.example smart-contracts/.env
cp env.example web/.env
```

Then fill in the values in both `.env` files:

- `PRIVATE_KEY`: Your wallet private key (for deployments only). Use a test wallet.
- `RPC_URL`: Testnet RPC URL (default is provided).
- `VITE_RPC_URL`: Same as `RPC_URL` for the frontend.
- `VITE_CHAIN_ID`: Core Layer Testnet chain ID (optional for basic usage).
- `VITE_COUNTER_ADDRESS`: Will be filled after deployment.

## 2) Install dependencies

```bash
# Smart contracts
cd smart-contracts
npm install

# Frontend
cd ../web
npm install
```

## 3) Deploy the Counter contract

```bash
cd smart-contracts
npm run deploy:testnet
```

Copy the deployed address shown in the terminal and set it in `web/.env` under `VITE_COUNTER_ADDRESS`.

## 4) Run the web app

```bash
cd web
npm run dev
```

Open the URL shown by Vite. You can:
- Connect your wallet
- Read the current counter value (read uses RPC directly)
- Increment the counter (requires wallet signature)

## MetaMask network setup

Add the Core Layer Testnet in MetaMask using the RPC and explorer above. If you know the chain ID, include it; otherwise you can still connect your wallet and interact as long as your wallet is on the correct network.

## Notes

- This starter purposely keeps things minimal and readable for fast hacking.
- Use a dedicated test wallet. Never paste a mainnet key.
- If you need GraphQL or REST, refer to the endpoints in the root docs.
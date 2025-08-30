import { useEffect, useMemo, useState } from 'react'
import { ethers } from 'ethers'

const rpcUrl = import.meta.env.VITE_RPC_URL as string | undefined
const counterAddress = import.meta.env.VITE_COUNTER_ADDRESS as string | undefined

const counterAbi = [
    'function value() view returns (uint256)',
    'function increment()'
]

declare global {
    interface Window {
        ethereum?: any
    }
}

export default function App() {
    const [account, setAccount] = useState<string>('')
    const [isConnecting, setIsConnecting] = useState(false)
    const [counterValue, setCounterValue] = useState<string>('')
    const [txPending, setTxPending] = useState(false)

    const readProvider = useMemo(() => {
        if (!rpcUrl) return undefined
        return new ethers.JsonRpcProvider(rpcUrl)
    }, [])

    const canRead = Boolean(readProvider && counterAddress)

    async function connectWallet() {
        if (!window.ethereum) {
            alert('No injected wallet found. Please install MetaMask.')
            return
        }
        try {
            setIsConnecting(true)
            const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            setAccount(accounts?.[0] ?? '')
        } finally {
            setIsConnecting(false)
        }
    }

    async function fetchCounter() {
        if (!canRead || !readProvider || !counterAddress) return
        const contract = new ethers.Contract(counterAddress, counterAbi, readProvider)
        const val = await contract.value()
        setCounterValue(val.toString())
    }

    async function increment() {
        if (!window.ethereum) {
            alert('Connect a wallet first')
            return
        }
        if (!counterAddress) {
            alert('Missing VITE_COUNTER_ADDRESS in .env')
            return
        }
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(counterAddress, counterAbi, signer)
        setTxPending(true)
        try {
            const tx = await contract.increment()
            await tx.wait()
            await fetchCounter()
        } finally {
            setTxPending(false)
        }
    }

    useEffect(() => {
        fetchCounter()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canRead])

    return (
        <div style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' }}>
            <h1>CLayer Hackathon Starter</h1>

            <section style={{ marginBottom: 24 }}>
                <button onClick={connectWallet} disabled={isConnecting}>
                    {account ? `Connected: ${account.slice(0, 6)}…${account.slice(-4)}` : (isConnecting ? 'Connecting…' : 'Connect Wallet')}
                </button>
            </section>

            <section style={{ marginBottom: 24 }}>
                <h3>Counter</h3>
                <div style={{ marginBottom: 8 }}>
                    <strong>Current value:</strong> {counterValue || '(not loaded)'}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={fetchCounter} disabled={!canRead}>Read</button>
                    <button onClick={increment} disabled={!account || txPending}>{txPending ? 'Sending…' : 'Increment'}</button>
                </div>
                {!rpcUrl && <p style={{ color: 'tomato' }}>Missing VITE_RPC_URL in .env</p>}
                {!counterAddress && <p style={{ color: 'tomato' }}>Deploy the contract and set VITE_COUNTER_ADDRESS in .env</p>}
            </section>

            <section>
                <h3>Network</h3>
                <ul>
                    <li>RPC: https://testnet-rpc.clayer.io</li>
                    <li>Explorer: https://explorer-testnet.clayer.io</li>
                    <li>Faucet: https://faucet.clayer.io</li>
                </ul>
            </section>
        </div>
    )
}
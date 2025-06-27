import { createConfig, http } from 'wagmi'
import { mainnet, base, sepolia } from 'wagmi/chains'
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, base, sepolia],
  connectors: [
    metaMask(),
    coinbaseWallet({ appName: 'CryptoAnalyst AI' }),
    walletConnect({ 
      projectId: process.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id'
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
})
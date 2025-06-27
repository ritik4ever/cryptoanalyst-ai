import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useWalletAuth = () => {
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage(); // Changed from signMessage

  const connectWallet = async (connectorId: string) => {
    try {
      setLoading(true);
      
      const connector = connectors.find(c => c.id === connectorId);
      if (!connector) {
        throw new Error('Connector not found');
      }

      connect({ connector });
    } catch (error: any) {
      toast.error(error.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const signInWithWallet = async (onSuccess: (user: any) => void) => {
    try {
      setLoading(true);

      if (!address) {
        throw new Error('No wallet connected');
      }

      // Generate nonce from backend
      const nonceResponse = await authAPI.getNonce(address);
      const nonce = nonceResponse.data.nonce;

      // Create sign-in message
      const message = `Sign in to CryptoAnalyst AI\n\nAddress: ${address}\nNonce: ${nonce}\nTimestamp: ${Date.now()}`;

      // Sign message - use signMessageAsync instead
      const signature = await signMessageAsync({ message });

      // Verify signature and authenticate
      const authResponse = await authAPI.walletLogin({
        address,
        message,
        signature,
      });

      // Success
      localStorage.setItem('authToken', authResponse.data.token);
      onSuccess(authResponse.data.user);
      toast.success('Successfully signed in with wallet!');

    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message || 'Wallet sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    localStorage.removeItem('authToken');
  };

  return {
    address,
    isConnected,
    loading,
    connectors,
    connectWallet,
    signInWithWallet,
    disconnectWallet,
  };
};

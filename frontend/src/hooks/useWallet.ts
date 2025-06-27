import { useState, useEffect } from 'react';
import { walletAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useWallet = (user: any) => {
  const [wallet, setWallet] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const createWallet = async () => {
    if (!user) {
      toast.error('Please login first');
      return;
    }

    setLoading(true);
    try {
      const response = await walletAPI.create();
      setWallet(response.data);
      toast.success('Wallet created successfully!');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to create wallet');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadBalance = async (walletId: string) => {
    try {
      const response = await walletAPI.getBalance(walletId);
      setBalance(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Failed to load balance:', error);
      return null;
    }
  };

  useEffect(() => {
    if (user?.walletId) {
      loadBalance(user.walletId);
    }
  }, [user?.walletId]);

  return {
    wallet,
    balance,
    loading,
    createWallet,
    loadBalance,
  };
};
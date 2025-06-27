import { useState } from 'react';
import { paymentAPI } from '../services/api';
import toast from 'react-hot-toast';

export const usePayments = () => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<any>(null);

  const getPaymentStatus = async (paymentId: string) => {
    setLoading(true);
    try {
      const response = await paymentAPI.getStatus(paymentId);
      setPaymentStatus(response.data);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to get payment status');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const completePayment = async (paymentId: string) => {
    setLoading(true);
    try {
      // For demo purposes, we'll call a mock completion endpoint
      const response = await fetch(`/api/payments/${paymentId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Payment completion failed');
      }
      
      const data = await response.json();
      toast.success('Payment completed successfully!');
      return data;
    } catch (error: any) {
      toast.error('Payment completion failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    paymentStatus,
    getPaymentStatus,
    completePayment,
  };
};
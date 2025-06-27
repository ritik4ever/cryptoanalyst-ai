import React, { useState, useEffect } from 'react';
import { X, CreditCard, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { paymentAPI } from '../services/api';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  amount: number;
  onPaymentComplete: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  paymentId,
  amount,
  onPaymentComplete,
}) => {
  const [paymentStatus, setPaymentStatus] = useState<string>('pending');
  const [paymentUrl, setPaymentUrl] = useState<string>('');
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    if (isOpen && paymentId) {
      initializePayment();
    }
  }, [isOpen, paymentId]);

  const initializePayment = async () => {
    try {
      const response = await paymentAPI.getStatus(paymentId);
      setPaymentStatus(response.data.status);
      
      // In a real implementation, you'd get the payment URL from x402pay
      setPaymentUrl(`${import.meta.env.VITE_X402_PAYMENT_URL}/${response.data.x402PaymentId}`);
      
      if (response.data.status === 'pending') {
        startPolling();
      }
    } catch (error) {
      toast.error('Failed to initialize payment');
    }
  };

  const startPolling = () => {
    setPolling(true);
    const interval = setInterval(async () => {
      try {
        const response = await paymentAPI.getStatus(paymentId);
        setPaymentStatus(response.data.status);
        
        if (response.data.status === 'completed') {
          clearInterval(interval);
          setPolling(false);
          toast.success('Payment completed successfully!');
          onPaymentComplete();
          setTimeout(onClose, 2000);
        } else if (response.data.status === 'failed') {
          clearInterval(interval);
          setPolling(false);
          toast.error('Payment failed');
        }
      } catch (error) {
        clearInterval(interval);
        setPolling(false);
      }
    }, 3000);

    // Stop polling after 10 minutes
    setTimeout(() => {
      clearInterval(interval);
      setPolling(false);
    }, 600000);
  };

  const handleExternalPayment = () => {
    // Open x402pay payment URL in new window
    window.open(paymentUrl, '_blank');
    startPolling();
  };

  if (!isOpen) return null;

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'completed':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Clock className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'completed':
        return 'Payment completed successfully! Your analysis is being generated.';
      case 'failed':
        return 'Payment failed. Please try again.';
      case 'processing':
        return 'Payment is being processed...';
      default:
        return 'Please complete your payment to generate the analysis.';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Complete Payment</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="text-center mb-6">
          {getStatusIcon()}
          <h4 className="text-lg font-semibold text-gray-900 mt-2">
            ${amount.toFixed(2)} USD
          </h4>
          <p className="text-gray-600 mt-1">{getStatusMessage()}</p>
        </div>

        {paymentStatus === 'pending' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-blue-900">x402pay Integration</h5>
                  <p className="text-sm text-blue-700 mt-1">
                    Secure payment processing with automatic crypto distribution
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleExternalPayment}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center justify-center space-x-2"
            >
              <CreditCard className="h-5 w-5" />
              <span>Pay with x402pay</span>
            </button>

            {polling && (
              <div className="text-center">
                <div className="inline-flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-gray-600">Waiting for payment confirmation...</span>
                </div>
              </div>
            )}
          </div>
        )}

        {paymentStatus === 'completed' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h5 className="font-medium text-green-900">Payment Successful!</h5>
              <p className="text-sm text-green-700 mt-1">
                Your analysis will be ready in a few minutes
              </p>
            </div>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-center">
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <h5 className="font-medium text-red-900">Payment Failed</h5>
                <p className="text-sm text-red-700 mt-1">
                  Please try again or contact support
                </p>
              </div>
            </div>

            <button
              onClick={handleExternalPayment}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Retry Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
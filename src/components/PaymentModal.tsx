import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { X } from 'lucide-react';
import stripePromise from '../config/stripe';
import CheckoutForm from './CheckoutForm';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  total: number;
  items: Array<{ name: string; quantity: number; price: number }>;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  total, 
  items 
}) => {
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Create PaymentIntent as soon as the component loads
      createPaymentIntent();
    }
  }, [isOpen, total]);

  const createPaymentIntent = async () => {
    setIsLoading(true);
    
    try {
      // In a real application, this would be your backend endpoint
      // For demo purposes, we'll simulate the PaymentIntent creation
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: Math.round(total * 100), // Convert to cents
          currency: 'eur',
          items: items
        }),
      });

      if (!response.ok) {
        // Fallback for demo - create a mock client secret
        const mockClientSecret = `pi_demo_${Date.now()}_secret_demo`;
        setClientSecret(mockClientSecret);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      // Fallback for demo
      const mockClientSecret = `pi_demo_${Date.now()}_secret_demo`;
      setClientSecret(mockClientSecret);
    }
    
    setIsLoading(false);
  };

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#111827',
      colorBackground: '#ffffff',
      colorText: '#111827',
      colorDanger: '#df1b41',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
    rules: {
      '.Tab': {
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      },
      '.Tab:hover': {
        backgroundColor: '#f9fafb',
      },
      '.Tab--selected': {
        backgroundColor: '#111827',
        color: '#ffffff',
      },
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-white rounded-full shadow-lg"
          >
            <X className="h-6 w-6" />
          </button>

          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Setting up secure payment...</p>
              </div>
            </div>
          ) : clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm 
                onSuccess={onSuccess} 
                onCancel={onClose}
                total={total}
              />
            </Elements>
          ) : (
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center">
                <p className="text-red-600 mb-4">Unable to initialize payment</p>
                <button
                  onClick={onClose}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
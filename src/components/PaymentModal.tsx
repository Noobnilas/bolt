import React, { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, Wallet, Shield, Lock } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Demo Stripe publishable key (this would be your real key in production)
const stripePromise = loadStripe('pk_test_51OaBC2DEFghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789');

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'apple' | 'google' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePaymentMethodSelect = async (method: 'card' | 'apple' | 'google' | 'paypal') => {
    setSelectedPaymentMethod(method);
    
    if (method !== 'card') {
      setIsProcessing(true);
      
      // Simulate payment processing for digital wallets
      setTimeout(() => {
        setIsProcessing(false);
        setShowSuccess(true);
        
        setTimeout(() => {
          onSuccess();
          setShowSuccess(false);
        }, 2000);
      }, 2000);
    }
  };

  const paymentMethods = [
    {
      id: 'card' as const,
      name: 'Credit or Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      available: true
    },
    {
      id: 'apple' as const,
      name: 'Apple Pay',
      icon: Smartphone,
      description: 'Touch ID or Face ID',
      available: typeof window !== 'undefined' && 'ApplePaySession' in window
    },
    {
      id: 'google' as const,
      name: 'Google Pay',
      icon: Wallet,
      description: 'Pay with Google',
      available: true
    },
    {
      id: 'paypal' as const,
      name: 'PayPal',
      icon: Wallet,
      description: 'Pay with your PayPal account',
      available: true
    }
  ];

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fadeInUp">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600">Your order has been confirmed</p>
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fadeInUp">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h3>
            <p className="text-gray-600">Please wait while we process your payment...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Secure Checkout</h2>
                <p className="text-gray-600">Complete your purchase</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} × {item.quantity}</span>
                      <span className="text-gray-900">€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-xl">€{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-6 bg-green-50 p-3 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
                <Lock className="h-4 w-4 text-green-600" />
                <span>256-bit SSL encrypted • PCI DSS compliant</span>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900">Choose Payment Method</h3>
                
                <div className="grid gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handlePaymentMethodSelect(method.id)}
                      disabled={!method.available}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedPaymentMethod === method.id
                          ? 'border-gray-900 bg-gray-50'
                          : method.available
                          ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <method.icon className={`h-6 w-6 ${
                          method.available ? 'text-gray-700' : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                        {selectedPaymentMethod === method.id && (
                          <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                        {!method.available && (
                          <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">
                            Not Available
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Form */}
              {selectedPaymentMethod === 'card' && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm 
                    onSuccess={onSuccess} 
                    onCancel={onClose}
                    total={total}
                  />
                </Elements>
              )}

              {/* Express Payment Buttons */}
              {selectedPaymentMethod !== 'card' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      {selectedPaymentMethod === 'apple' && 'Use Touch ID or Face ID to complete your purchase'}
                      {selectedPaymentMethod === 'google' && 'Complete your purchase with Google Pay'}
                      {selectedPaymentMethod === 'paypal' && 'You will be redirected to PayPal to complete your purchase'}
                    </p>
                    
                    <button
                      onClick={() => handlePaymentMethodSelect(selectedPaymentMethod)}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-[1.02] transform ${
                        selectedPaymentMethod === 'apple'
                          ? 'bg-black text-white hover:bg-gray-800'
                          : selectedPaymentMethod === 'google'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {selectedPaymentMethod === 'apple' && '🍎 Pay with Apple Pay'}
                      {selectedPaymentMethod === 'google' && 'G Pay with Google'}
                      {selectedPaymentMethod === 'paypal' && 'Continue with PayPal'}
                    </button>
                  </div>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Lock className="h-4 w-4" />
                    <span>Encrypted</span>
                  </div>
                  <div>30-day guarantee</div>
                  <div>Free returns</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
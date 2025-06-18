import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loader2, CreditCard, Shield, Check, AlertCircle } from 'lucide-react';

interface CheckoutFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  total: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onCancel, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    postal_code: '',
    country: 'NL'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!email || !name || !address.line1 || !address.city || !address.postal_code) {
      setMessage('Please fill in all required fields.');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsLoading(false);
      return;
    }

    // Create payment method
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name,
        email,
        address: {
          line1: address.line1,
          city: address.city,
          postal_code: address.postal_code,
          country: address.country,
        },
      },
    });

    if (paymentMethodError) {
      setMessage(paymentMethodError.message || 'An error occurred');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    // Simulate payment processing (in real app, you'd call your backend)
    setTimeout(() => {
      setMessage('Payment succeeded!');
      setMessageType('success');
      
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
              placeholder="John Doe"
              required
            />
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Billing Address</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <input
              type="text"
              value={address.line1}
              onChange={(e) => setAddress({...address, line1: e.target.value})}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
              placeholder="123 Main Street"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                value={address.city}
                onChange={(e) => setAddress({...address, city: e.target.value})}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                placeholder="Amsterdam"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code *
              </label>
              <input
                type="text"
                value={address.postal_code}
                onChange={(e) => setAddress({...address, postal_code: e.target.value})}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                placeholder="1012 AB"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <select
              value={address.country}
              onChange={(e) => setAddress({...address, country: e.target.value})}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
            >
              <option value="NL">Netherlands</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="BE">Belgium</option>
              <option value="ES">Spain</option>
              <option value="IT">Italy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Payment Information
        </h3>
        
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <CardElement options={cardElementOptions} />
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          Use 4242 4242 4242 4242 for demo • Any future date • Any 3-digit CVC
        </p>
      </div>

      {/* Security Features */}
      <div className="flex items-center space-x-4 text-sm text-gray-600 bg-green-50 p-4 rounded-lg">
        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
        <div>
          <p className="font-medium text-green-800">Your payment is secure</p>
          <p>All transactions are encrypted and processed securely</p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="space-y-3">
        <button
          disabled={!stripe || isLoading}
          type="submit"
          className={`w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-medium text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
            isLoading || !stripe
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-800 hover:scale-[1.02] transform'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Shield className="h-5 w-5" />
              <span>Pay €{total.toFixed(2)} Securely</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg text-center flex items-center justify-center space-x-2 ${
          messageType === 'success'
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {messageType === 'success' ? (
            <Check className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span>{message}</span>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="text-center text-xs text-gray-500 space-y-1">
        <p>🔒 SSL Encrypted • PCI DSS Compliant</p>
        <p>Powered by Stripe • Trusted by millions worldwide</p>
      </div>
    </form>
  );
};

export default CheckoutForm;
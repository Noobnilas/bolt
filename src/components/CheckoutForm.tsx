import React, { useState } from 'react';
import { Loader2, CreditCard, Smartphone, Shield, Check } from 'lucide-react';

interface CheckoutFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  total: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onCancel, total }) => {
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !cardNumber || !expiryDate || !cvc || !cardholderName) {
      setMessage('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setMessage(null);

    // Simulate payment processing
    setTimeout(() => {
      setMessage('Payment succeeded!');
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="h-8 w-8 text-gray-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Checkout</h2>
        <p className="text-gray-600">Complete your purchase securely</p>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">€{total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            Cardholder Name *
          </label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number *
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Use 4242 4242 4242 4242 for demo</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date *
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVC *
            </label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, '').substring(0, 4))}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
              placeholder="123"
              maxLength={4}
              required
            />
          </div>
        </div>

        {/* Security Features */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
          <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-800">Secure Payment</p>
            <p>Your payment information is encrypted and secure</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-500">
          <div className="flex flex-col items-center">
            <CreditCard className="h-6 w-6 mb-1" />
            <span>Cards</span>
          </div>
          <div className="flex flex-col items-center">
            <Smartphone className="h-6 w-6 mb-1" />
            <span>Apple Pay</span>
          </div>
          <div className="flex flex-col items-center">
            <Smartphone className="h-6 w-6 mb-1" />
            <span>Google Pay</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-medium text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
              isLoading
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
              <span>Pay €{total.toFixed(2)}</span>
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

        {message && (
          <div className={`p-4 rounded-lg text-center flex items-center justify-center space-x-2 ${
            message.includes('succeeded') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.includes('succeeded') && <Check className="h-5 w-5" />}
            <span>{message}</span>
          </div>
        )}
      </form>

      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Demo Mode • SSL Encrypted</p>
      </div>
    </div>
  );
};

export default CheckoutForm;
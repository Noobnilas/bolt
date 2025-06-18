import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Loader2, CreditCard, Smartphone, Shield } from 'lucide-react';

interface CheckoutFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  total: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onCancel, total }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'An error occurred');
      } else {
        setMessage('An unexpected error occurred.');
      }
    } else {
      onSuccess();
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs' as const,
    paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
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

      <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <LinkAuthenticationElement
            id="link-authentication-element"
            onChange={(e) => setEmail(e.value?.email || '')}
            options={{
              defaultValues: {
                email: email
              }
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <PaymentElement id="payment-element" options={paymentElementOptions} />
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
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className={`w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-medium text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
              isLoading || !stripe || !elements
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
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg text-center ${
            message.includes('succeeded') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </form>

      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Powered by Stripe • SSL Encrypted</p>
      </div>
    </div>
  );
};

export default CheckoutForm;
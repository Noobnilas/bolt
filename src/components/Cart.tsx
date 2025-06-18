import React from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PaymentModal from './PaymentModal';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, toggleCart, clearCart } = useCart();
  const [showPayment, setShowPayment] = React.useState(false);

  if (!cart.isOpen) return null;

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    alert('Payment successful! Thank you for your order.');
    clearCart();
    toggleCart();
    setShowPayment(false);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  const cartItems = cart.items.map(item => ({
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price
  }));

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleCart} />
        
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl animate-slideInRight">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
              <button
                onClick={toggleCart}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingBag className="h-12 w-12 mb-4" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm">Add some products to get started</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4 animate-fadeIn">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">€{item.product.price.toFixed(2)}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">€{cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-semibold text-gray-900">
                        €{cart.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 hover:scale-[1.02] transform flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Secure Checkout</span>
                </button>

                <div className="text-center text-xs text-gray-500">
                  <p>Secure payment powered by Stripe</p>
                  <p>SSL encrypted • 30-day money-back guarantee</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPayment}
        onClose={handlePaymentCancel}
        onSuccess={handlePaymentSuccess}
        total={cart.total}
        items={cartItems}
      />
    </>
  );
};

export default Cart;
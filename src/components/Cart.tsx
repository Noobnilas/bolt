import React from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard, Shield } from 'lucide-react';
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
    // Navigate to success page instead of just showing alert
    clearCart();
    toggleCart();
    setShowPayment(false);
    
    // Trigger navigation to success page
    window.dispatchEvent(new CustomEvent('navigate-to-success'));
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  const cartItems = cart.items.map(item => ({
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price
  }));

  const subtotal = cart.total;
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.21; // 21% VAT for Netherlands
  const total = subtotal + shipping + tax;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={toggleCart} />
        
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-slideInRight">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                <p className="text-sm text-gray-600">{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}</p>
              </div>
              <button
                onClick={toggleCart}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full hover:bg-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingBag className="h-16 w-16 mb-4 text-gray-300" />
                  <p className="text-xl font-medium text-gray-400 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-400">Add some products to get started</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl animate-fadeIn">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{item.product.name}</h3>
                        <p className="text-lg font-bold text-gray-900">€{item.product.price.toFixed(2)}</p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-3 bg-white rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:bg-gray-100 rounded"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            
                            <span className="w-8 text-center text-sm font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:bg-gray-100 rounded"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200 hover:bg-red-50 rounded-lg"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t border-gray-200 bg-white">
                <div className="p-6 space-y-4">
                  {/* Order Summary */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900 font-medium">€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600 font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Tax (VAT 21%)</span>
                      <span className="text-gray-900 font-medium">€{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-gray-900">
                          €{total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-200 hover:scale-[1.02] transform flex items-center justify-center space-x-3 shadow-lg"
                  >
                    <Shield className="h-5 w-5" />
                    <span>Secure Checkout</span>
                  </button>

                  <div className="text-center space-y-1">
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Shield className="h-3 w-3" />
                        <span>SSL Secure</span>
                      </div>
                      <div>•</div>
                      <div>30-day returns</div>
                      <div>•</div>
                      <div>Free shipping</div>
                    </div>
                    <p className="text-xs text-gray-400">Powered by Stripe</p>
                  </div>
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
        total={total}
        items={cartItems}
      />
    </>
  );
};

export default Cart;
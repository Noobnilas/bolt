import React, { useEffect } from 'react';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';

interface SuccessPageProps {
  onContinueShopping: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onContinueShopping }) => {
  const orderNumber = `SYMORA-${Date.now().toString().slice(-6)}`;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      icon: CheckCircle,
      title: 'Order Confirmed',
      description: 'Your payment has been processed successfully',
      status: 'completed'
    },
    {
      icon: Package,
      title: 'Preparing Order',
      description: 'We\'re carefully packaging your items',
      status: 'current'
    },
    {
      icon: Truck,
      title: 'Shipped',
      description: 'Your order is on its way to you',
      status: 'upcoming'
    },
    {
      icon: Mail,
      title: 'Delivered',
      description: 'Enjoy your SYMORA products!',
      status: 'upcoming'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-600 mb-2">Thank you for your order</p>
          <p className="text-lg text-gray-500">Order #{orderNumber}</p>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fadeInUp animation-delay-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Order Status</h2>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200">
              <div className="h-full bg-green-600 w-1/4 transition-all duration-1000"></div>
            </div>
            
            {/* Steps */}
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    step.status === 'completed' 
                      ? 'bg-green-600 text-white' 
                      : step.status === 'current'
                      ? 'bg-blue-600 text-white animate-pulse'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className={`font-semibold mb-2 ${
                    step.status === 'completed' || step.status === 'current'
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${
                    step.status === 'completed' || step.status === 'current'
                      ? 'text-gray-600'
                      : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Shipping Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeInUp animation-delay-500">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="ml-2 font-medium text-gray-900">3-5 business days</span>
              </div>
              <div>
                <span className="text-gray-600">Shipping Method:</span>
                <span className="ml-2 font-medium text-gray-900">Free Standard Shipping</span>
              </div>
              <div>
                <span className="text-gray-600">Tracking:</span>
                <span className="ml-2 font-medium text-blue-600">Available once shipped</span>
              </div>
            </div>
          </div>

          {/* Support Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeInUp animation-delay-600">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium text-gray-900">support@symora.com</span>
              </div>
              <div>
                <span className="text-gray-600">Phone:</span>
                <span className="ml-2 font-medium text-gray-900">+31 20 123 4567</span>
              </div>
              <div>
                <span className="text-gray-600">Hours:</span>
                <span className="ml-2 font-medium text-gray-900">Mon-Fri, 9AM-6PM CET</span>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8 animate-fadeInUp animation-delay-700">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Confirmation Email</h4>
              <p className="text-sm text-gray-600">You'll receive an order confirmation email shortly</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Order Processing</h4>
              <p className="text-sm text-gray-600">We'll prepare and package your order with care</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Shipping Updates</h4>
              <p className="text-sm text-gray-600">Track your package with real-time updates</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center animate-fadeInUp animation-delay-800">
          <button
            onClick={onContinueShopping}
            className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 transition-colors duration-200 hover:scale-[1.02] transform"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
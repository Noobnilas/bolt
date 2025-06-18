import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import SuccessPage from './components/SuccessPage';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { Product } from './types';
import { products } from './data/products';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProduct(null);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
    setCurrentPage('home');
  };

  const handleContinueShopping = () => {
    setCurrentPage('home');
  };

  // Listen for success page navigation
  useEffect(() => {
    const handleNavigateToSuccess = () => {
      setCurrentPage('success');
    };

    window.addEventListener('navigate-to-success', handleNavigateToSuccess);
    
    return () => {
      window.removeEventListener('navigate-to-success', handleNavigateToSuccess);
    };
  }, []);

  const renderCurrentPage = () => {
    if (currentPage === 'success') {
      return <SuccessPage onContinueShopping={handleContinueShopping} />;
    }

    if (currentPage === 'product' && selectedProduct) {
      return <ProductPage product={selectedProduct} onBack={handleBackFromProduct} />;
    }

    if (currentPage === 'products') {
      return (
        <div className="min-h-screen bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fadeInUp">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Products</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our complete range of posture correction and wellness products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fadeInUp cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => handleViewProduct(product)}
                >
                  <div className="group">
                    <div className="relative overflow-hidden rounded-lg bg-gray-50 aspect-square mb-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-4 py-2 rounded-full">
                          View Product
                        </span>
                      </div>
                    </div>

                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                      <p className="text-xl font-semibold text-gray-900">€{product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onViewProduct={handleViewProduct} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main>{renderCurrentPage()}</main>
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
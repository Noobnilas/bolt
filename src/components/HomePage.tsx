import React, { useEffect, useState } from 'react';
import { ChevronRight, Star, Shield, Truck, Award } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface HomePageProps {
  onViewProduct: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onViewProduct }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const featuredProducts = products.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Engineered with the finest materials for lasting performance'
    },
    {
      icon: Shield,
      title: 'Science-Backed',
      description: 'Developed by wellness experts and backed by research'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free shipping on all orders with quick processing'
    },
    {
      icon: Award,
      title: 'Satisfaction Guaranteed',
      description: '30-day money-back guarantee on all products'
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-32 h-32 bg-gray-100 rounded-full opacity-30 animate-float"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute top-40 right-20 w-20 h-20 bg-gray-200 rounded-full opacity-20 animate-float-delayed"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          />
          <div 
            className="absolute bottom-40 left-1/4 w-16 h-16 bg-gray-150 rounded-full opacity-25 animate-float-slow"
            style={{ transform: `translateY(${scrollY * 0.08}px)` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="animate-fadeInUp">
              <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 mb-6 animate-slideInLeft">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Trusted by 10,000+ customers
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-[0.9] mb-8 tracking-tight">
                <span className="block animate-slideInUp">Perfect</span>
                <span className="block text-gray-500 animate-slideInUp animation-delay-200">Posture,</span>
                <span className="block animate-slideInUp animation-delay-400">Perfect Life</span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-xl leading-relaxed animate-fadeInUp animation-delay-600">
              Transform your daily comfort with our revolutionary posture corrector, designed by experts for lasting spinal alignment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-800">
              <button
                onClick={() => onViewProduct(featuredProducts[0])}
                className="group inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-2xl text-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl transform"
              >
                Shop Now
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Content - Enhanced Product Display */}
          <div className="relative animate-fadeInUp animation-delay-300">
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl">
              {/* Floating Product Image */}
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="relative w-full h-full animate-float-gentle">
                  <img
                    src="/posture crrector.PNG"
                    alt="SYMORA Posture Corrector"
                    className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Floating Price Tag */}
              <div className="absolute top-8 right-8 bg-white rounded-2xl px-6 py-3 shadow-lg animate-slideInRight animation-delay-1000">
                <span className="text-2xl font-bold text-gray-900">€29.99</span>
              </div>

              {/* Floating Features */}
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-slideInLeft animation-delay-1200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">Instant Relief</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-40 animate-pulse animation-delay-500"></div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-fadeInUp">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-6 py-2 text-sm text-gray-600 mb-8">
              Why thousands choose SYMORA
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Engineered for
              <span className="block text-gray-500">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our premium wellness solutions designed for modern living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 hover:bg-gray-50 transition-all duration-500 hover:scale-105 hover:shadow-2xl transform animate-fadeInUp border border-gray-100"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gray-200 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Enhanced */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fadeInUp">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-2 text-sm text-gray-600 mb-8 shadow-sm">
              Our bestsellers
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Featured
              <span className="block text-gray-500">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover our most popular wellness solutions, trusted by professionals worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <ProductCard
                  product={product}
                  onViewProduct={onViewProduct}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fadeInUp">
          <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-2 text-sm text-gray-300 mb-8">
            Join the movement
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">
            Ready to Transform
            <span className="block text-gray-400">Your Posture?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have improved their posture and wellness with SYMORA.
          </p>
          
          <div className="flex justify-center">
            <button
              onClick={() => onViewProduct(featuredProducts[0])}
              className="group inline-flex items-center justify-center bg-white text-gray-900 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl transform"
            >
              Start Your Journey
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
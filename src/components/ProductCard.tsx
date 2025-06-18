import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewProduct }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  return (
    <div
      className="group cursor-pointer animate-fadeInUp"
      onClick={() => onViewProduct(product)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 aspect-square mb-6 shadow-lg hover:shadow-2xl transition-all duration-500">
        {/* Main Product Image */}
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Floating Price Tag */}
        <div className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <span className="text-lg font-bold text-gray-900">€{product.price.toFixed(2)}</span>
        </div>
        
        {/* Quick View Button */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-2xl font-medium shadow-lg hover:bg-white transition-all duration-200 hover:scale-105 transform">
            Quick View
          </div>
        </div>

        {/* Corner Accent */}
        <div className={`absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-br-3xl transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>

      <div className="text-center space-y-3 px-2">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 leading-tight">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
        
        {/* Features Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {product.benefits.slice(0, 2).map((benefit, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium"
            >
              {benefit}
            </span>
          ))}
        </div>
        
        <div className="pt-2">
          <span className="text-2xl font-bold text-gray-900">€{product.price.toFixed(2)}</span>
          <span className="text-gray-500 text-sm ml-2">Free shipping</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
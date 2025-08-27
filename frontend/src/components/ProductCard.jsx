import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice, formatRating, truncateText } from '../utils/validation';

// Product card component for displaying product information
const ProductCard = ({ product }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation();
    addToCart(product, 1);
  };

  const inCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);

  return (
    <Link 
      to={`/product/${product.id}`}
      className="card hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
          loading="lazy"
        />
        
        {/* Quick add to cart button */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-4 right-4 p-2 rounded-full shadow-lg transition-all duration-300 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${
            inCart 
              ? 'bg-green-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-blue-600 hover:text-white'
          }`}
          title={inCart ? `In cart (${cartQuantity})` : 'Add to cart'}
        >
          {inCart ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          )}
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs uppercase text-gray-500 font-medium tracking-wide mb-2">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {truncateText(product.title, 60)}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating.rate) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {formatRating(product.rating.rate)} ({product.rating.count})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          
          {inCart && (
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
              In Cart ({cartQuantity})
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
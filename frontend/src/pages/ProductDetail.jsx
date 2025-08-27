import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useRecentlyViewed } from '../hooks/useLocalStorage';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { formatPrice, formatRating } from '../utils/validation';

// Product detail page component
const ProductDetail = () => {
  const { id } = useParams();
  const { product, loading, error, refetch } = useProduct(id);
  const { addToCart, isInCart, getItemQuantity, isUpdating } = useCart();
  const { addToRecentlyViewed } = useRecentlyViewed();
  
  const [quantity, setQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);

  // Add to recently viewed when product loads
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  const handleAddToCart = async () => {
    await addToCart(product, quantity);
    setAddToCartSuccess(true);
    setTimeout(() => setAddToCartSuccess(false), 3000);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.min(Math.max(1, newQuantity), 5));
  };

  // Show loading state
  if (loading) {
    return <LoadingSpinner size="lg" message="Loading product details..." />;
  }

  // Show error state
  if (error || !product) {
    return (
      <ErrorMessage 
        message={error || "Product not found"} 
        onRetry={refetch}
      />
    );
  }

  const inCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        <span className="capitalize">{product.category}</span>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        <span className="text-gray-900 font-medium truncate">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner size="md" message="Loading image..." />
              </div>
            )}
            <img
              src={product.image}
              alt={product.title}
              className={`w-full h-full object-contain p-8 transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Category */}
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium capitalize">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
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
              <span className="text-gray-600">
                {formatRating(product.rating.rate)} ({product.rating.count} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="space-y-2">
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Section */}
          <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="font-medium text-gray-900">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4"/>
                  </svg>
                </button>
                
                <select
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  className="px-4 py-2 text-center border-0 focus:ring-0 focus:outline-none min-w-[80px]"
                >
                  {[...Array(5)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 5}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-r-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={isUpdating}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  addToCartSuccess
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {isUpdating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                    <span>Adding...</span>
                  </>
                ) : addToCartSuccess ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.35 2.65c-.14.15-.08.35.14.35H19M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8m-8 4h8"/>
                    </svg>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <Link
                to="/cart"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                View Cart
              </Link>
            </div>

            {/* Cart Status */}
            {inCart && (
              <div className="flex items-center space-x-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span>This item is already in your cart ({cartQuantity} items)</span>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
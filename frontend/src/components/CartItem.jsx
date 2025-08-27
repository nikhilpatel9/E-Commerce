import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice, truncateText } from '../utils/validation';

// Cart item component for displaying items in the shopping cart
const CartItem = ({ item }) => {
  const { updateItemQuantity, removeFromCart, isUpdating } = useCart();

  const handleQuantityChange = (newQuantity) => {
    updateItemQuantity(item.id, parseInt(newQuantity));
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(item.id);
    }
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Product Image */}
      <Link 
        to={`/product/${item.id}`}
        className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden hover:opacity-80 transition-opacity"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain p-2"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link 
          to={`/product/${item.id}`}
          className="block hover:text-blue-600 transition-colors"
        >
          <h3 className="font-semibold text-gray-900 mb-1">
            {truncateText(item.title, 80)}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 capitalize mb-2">
          {item.category}
        </p>
        
        <p className="font-semibold text-gray-900">
          {formatPrice(item.price)} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={isUpdating || item.quantity <= 1}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4"/>
            </svg>
          </button>
          
          <select
            value={item.quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            disabled={isUpdating}
            className="px-2 py-1 text-center border-0 focus:ring-0 focus:outline-none min-w-[60px] disabled:opacity-50"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={isUpdating || item.quantity >= 10}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right min-w-[80px]">
          <p className="font-semibold text-gray-900">
            {formatPrice(subtotal)}
          </p>
          {item.quantity > 1 && (
            <p className="text-xs text-gray-500">
              {item.quantity} × {formatPrice(item.price)}
            </p>
          )}
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          disabled={isUpdating}
          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Remove item"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
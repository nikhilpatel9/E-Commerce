import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/CartItem';
import { formatPrice } from '../utils/validation';

const Cart = () => {
  const { items, totals, isEmpty, clearAllItems, isUpdating } = useCart();

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearAllItems();
    }
  };


  if (isEmpty) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gray-100 rounded-full">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.35 2.65c-.14.15-.08.35.14.35H19M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8m-8 4h8"/>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
        </p>
        
        <Link
          to="/"
          className="btn-primary inline-flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
          </svg>
          <span>Continue Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        
        <button
          onClick={handleClearCart}
          disabled={isUpdating}
          className="text-red-600 hover:text-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

   
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Order Summary
            </h3>
            
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  Subtotal ({totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'})
                </span>
                <span className="font-medium text-gray-900">
                  {formatPrice(totals.subtotal)}
                </span>
              </div>

            
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-900">
                  {totals.shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    formatPrice(totals.shipping)
                  )}
                </span>
              </div>

              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(totals.tax)}
                </span>
              </div>

            
              <hr className="my-4" />

          
              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">
                  {formatPrice(totals.total)}
                </span>
              </div>

              
              {totals.subtotal < 50 && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">
                      Add {formatPrice(50 - totals.subtotal)} more
                    </span>{' '}
                    for free shipping!
                  </p>
                  <div className="mt-2 bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((totals.subtotal / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              
              <div className="space-y-3 pt-6">
                <Link
                  to="/checkout"
                  className="w-full btn-primary text-center block py-3 text-lg"
                >
                  Proceed to Checkout
                </Link>
                
                <Link
                  to="/"
                  className="w-full text-center py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium block"
                >
                  Continue Shopping
                </Link>
              </div>

             
              <div className="flex items-start space-x-2 text-sm text-gray-600 pt-4">
                <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <p>
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
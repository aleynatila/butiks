import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

const MiniCart = ({ isOpen, onClose }) => {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal } = useShop();

  // Show only first 3 items in mini cart
  const displayedItems = cart.slice(0, 3);
  const hasMoreItems = cart.length > 3;

  const subtotal = getCartTotal();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-bold text-gray-900">
              Shopping Cart ({cart.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-80px)]">
          {cart.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Add some products to get started!
              </p>
              <button
                onClick={onClose}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {displayedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex space-x-4 pb-4 border-b last:border-b-0"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.id}`}
                      onClick={onClose}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        onClick={onClose}
                        className="text-sm font-medium text-gray-900 hover:text-indigo-600 line-clamp-2 mb-1"
                      >
                        {item.name}
                      </Link>
                      {item.category && (
                        <p className="text-xs text-gray-500 mb-2">
                          {item.category}
                        </p>
                      )}
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-gray-50 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-50 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col items-end justify-between">
                      <p className="text-sm font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-500">
                          ${item.price} each
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {/* More Items Indicator */}
                {hasMoreItems && (
                  <div className="text-center py-2">
                    <Link
                      to="/cart"
                      onClick={onClose}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      + {cart.length - 3} more item{cart.length - 3 > 1 ? 's' : ''} in cart
                    </Link>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t p-6 space-y-4 bg-gray-50">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-base">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-xl font-bold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Free Shipping Notice */}
                {subtotal < 100 && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                    <p className="text-xs text-indigo-800">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                    <div className="mt-2 w-full bg-indigo-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link
                    to="/cart"
                    onClick={onClose}
                    className="block w-full bg-white border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition text-center"
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="block w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition text-center"
                  >
                    Checkout
                  </Link>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MiniCart;

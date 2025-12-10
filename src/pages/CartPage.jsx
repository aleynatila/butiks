import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const CartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal, getCartCount } = useShop();

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.20; // KDV 20%
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sepetiniz Boş
            </h2>
            <p className="text-gray-600 mb-8">
              Sepetinize henüz bir şey eklemediniz.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              <span>Alışverişe Devam Et</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Alışveriş Sepeti
          </h1>
          <p className="text-gray-600">
            Sepetinizde {getCartCount()} {getCartCount() === 1 ? 'ürün' : 'ürün'} var
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-6 shadow-sm flex flex-col sm:flex-row gap-4"
              >
                {/* Product Image */}
                <Link
                  to={`/product/${item.id}`}
                  className="w-full sm:w-32 h-32 flex-shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      {item.category && (
                        <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                      )}
                    </div>
                    
                    {/* Remove Button (Desktop) */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="hidden sm:block p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Sepetten çıkar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Price and Quantity */}
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                        aria-label="Azalt"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="text-gray-900 font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                        aria-label="Artır"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        {(item.price * item.quantity).toFixed(2)}₺
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.price}₺ adet
                      </p>
                    </div>
                  </div>

                  {/* Remove Button (Mobile) */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="sm:hidden mt-4 flex items-center justify-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Çıkar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Sipariş Özeti
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Ara Toplam</span>
                  <span>{subtotal.toFixed(2)}₺</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Kargo</span>
                  <span>{shipping === 0 ? 'ÜCRETSIZ' : `${shipping.toFixed(2)}₺`}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>KDV (%20)</span>
                  <span>{tax.toFixed(2)}₺</span>
                </div>

                {shipping > 0 && (
                  <div className="bg-indigo-50 text-indigo-700 text-sm p-3 rounded-lg">
                    Ücretsiz kargo için {(500 - subtotal).toFixed(2)}₺ daha ekleyin!
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Toplam</span>
                    <span>{total.toFixed(2)}₺</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mb-4"
              >
                <span>Ödemeye Geç</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/shop"
                className="block text-center text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Alışverişe Devam Et
              </Link>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Güvenli Ödeme</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

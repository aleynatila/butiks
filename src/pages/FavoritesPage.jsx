import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useShop } from '../context/ShopContextNew';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addToCart, showToast } = useShop();

  const handleRemoveFromFavorites = (product) => {
    toggleFavorite(product);
    showToast(`${product.name} favorilerden çıkarıldı`, 'info');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.name} sepete eklendi`, 'success');
  };

  const handleAddAllToCart = () => {
    favorites.forEach(product => {
      if (!product.isSoldOut) {
        addToCart(product);
      }
    });
    showToast(`${favorites.length} ürün sepete eklendi`, 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                Favorilerim
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {favorites.length} {favorites.length === 1 ? 'ürün' : 'ürün'} kaydedildi
              </p>
            </div>
            {favorites.length > 0 && (
              <Button onClick={handleAddAllToCart} size="sm" className="w-full sm:w-auto">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base">Tümünü Sepete Ekle</span>
              </Button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-12">
            <div className="text-center">
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Favori listeniz boş
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Beğendiğiniz ürünleri ekleyerek takip edin!
              </p>
              <Button onClick={() => navigate('/shop')} size="sm" className="sm:text-base">
                Alışverişe Başla
              </Button>
            </div>
          </div>
        ) : (
          /* Favorites Grid */
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
              >
                {/* Product Image */}
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="relative aspect-[3/4] overflow-hidden bg-gray-200 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Badges */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col space-y-1 sm:space-y-2">
                    {product.isNew && (
                      <span className="bg-indigo-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                        YENİ
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                        -%{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}
                      </span>
                    )}
                    {product.isSoldOut && (
                      <span className="bg-gray-900 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                        TÜKENMİŞ
                      </span>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromFavorites(product);
                    }}
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                    aria-label="Remove from favorites"
                  >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-2 sm:p-4">
                  <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 line-clamp-1 text-xs sm:text-base">
                    {product.name}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-gray-600 mb-1 sm:mb-2">{product.category}</p>
                  
                  <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <p className="text-sm sm:text-xl font-bold text-gray-900">
                      {product.price}₺
                    </p>
                    {product.originalPrice && (
                      <p className="text-[10px] sm:text-sm text-gray-500 line-through">
                        {product.originalPrice}₺
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1 sm:gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.isSoldOut}
                      fullWidth
                      size="sm"
                      className="text-[10px] sm:text-sm px-1 sm:px-3 py-1.5 sm:py-2"
                    >
                      <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden xs:inline">{product.isSoldOut ? 'Tükenmiş' : 'Sepete Ekle'}</span>
                      <span className="xs:hidden">{product.isSoldOut ? 'Yok' : 'Ekle'}</span>
                    </Button>
                    <button
                      onClick={() => handleRemoveFromFavorites(product)}
                      className="p-1.5 sm:p-2 border border-gray-200 sm:border-2 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors flex-shrink-0"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;

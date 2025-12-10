import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useShop } from '../context/ShopContext';

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
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Favorilerim
              </h1>
              <p className="text-gray-600">
                {favorites.length} {favorites.length === 1 ? 'ürün' : 'ürün'} kaydedildi
              </p>
            </div>
            {favorites.length > 0 && (
              <Button onClick={handleAddAllToCart} size="md">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Tümünü Sepete Ekle
              </Button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12">
            <div className="text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Favori listeniz boş
              </h2>
              <p className="text-gray-600 mb-6">
                Beğendiğiniz ürünleri ekleyerek takip edin!
              </p>
              <Button onClick={() => navigate('/shop')}>
                Alışverişe Başla
              </Button>
            </div>
          </div>
        ) : (
          /* Favorites Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {product.isNew && (
                      <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        YENİ
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        -%{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}
                      </span>
                    )}
                    {product.isSoldOut && (
                      <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">
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
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                    aria-label="Remove from favorites"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-xl font-bold text-gray-900">
                      {product.price}₺
                    </p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        {product.originalPrice}₺
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.isSoldOut}
                      fullWidth
                      size="sm"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {product.isSoldOut ? 'Tükenmiş' : 'Sepete Ekle'}
                    </Button>
                    <button
                      onClick={() => handleRemoveFromFavorites(product)}
                      className="p-2 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
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

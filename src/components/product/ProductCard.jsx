import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContextNew';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isAuthenticated } = useShop();

  const productId = product._id || product.id;
  const isFavorite = isInWishlist(productId);

  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const finalPrice = product.discountPrice || product.price;
  const isSoldOut = product.stock === 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isSoldOut) {
      addToCart(product);
    }
  };

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    if (isFavorite) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  return (
    <Link
      to={`/product/${product.slug || productId}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
          {/* Product Image */}
          <img
            src={product.images?.[0]?.url || product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Skeleton Loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.isFeatured && (
              <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                ÖNE ÇIKAN
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                -{discount}%
              </span>
            )}
            {isSoldOut && (
              <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                TÜKENDI
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
            } shadow-md`}
            aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
            />
          </button>

          {/* Quick Actions (shown on hover) */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                disabled={isSoldOut}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${
                  isSoldOut
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-sm">
                  {isSoldOut ? 'Tükendi' : 'Sepete Ekle'}
                </span>
              </button>
              
              <button
                className="p-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Hızlı görüntüle"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          {product.categoryId?.name && (
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {product.categoryId.name}
            </p>
          )}

          {/* Product Name */}
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.averageRating > 0 && (
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              {product.numReviews > 0 && (
                <span className="text-xs text-gray-500 ml-1">
                  ({product.numReviews})
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {finalPrice}₺
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {product.price}₺
              </span>
            )}
          </div>

          {/* Stock Status */}
          {!isSoldOut && product.stock < 10 && (
            <p className="text-xs text-orange-500 mt-2">
              Stokta sadece {product.stock} adet kaldı!
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

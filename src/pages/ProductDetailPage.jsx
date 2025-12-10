import {
    Check,
    ChevronLeft,
    ChevronRight,
    Heart,
    Minus,
    Plus,
    RotateCcw,
    Share2,
    Shield,
    ShoppingCart,
    Star,
    Truck
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleFavorite, favorites, showToast } = useShop();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Find the product by ID
    const foundProduct = products.find(p => p.id === parseInt(id));
    
    if (!foundProduct) {
      navigate('/shop');
      return;
    }
    
    setProduct(foundProduct);
    
    // Mock multiple images (in real app, this would come from backend)
    foundProduct.images = [
      foundProduct.image,
      foundProduct.image,
      foundProduct.image,
      foundProduct.image
    ];
    
    // Set default selections
    if (foundProduct.sizes && foundProduct.sizes.length > 0) {
      setSelectedSize(foundProduct.sizes[0]);
    }
    if (foundProduct.colors && foundProduct.colors.length > 0) {
      setSelectedColor(foundProduct.colors[0]);
    }
    
    // Find related products (same category)
    const related = products
      .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
      .slice(0, 4);
    setRelatedProducts(related);
  }, [id, products, navigate]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };
    
    addToCart(cartItem);
    showToast('Ürün sepete eklendi!', 'success');
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };
    
    addToCart(cartItem);
    navigate('/cart');
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    toggleFavorite(product.id);
    const isFavorite = favorites.includes(product.id);
    showToast(
      isFavorite ? 'Favorilerden çıkarıldı' : 'Favorilere eklendi',
      'success'
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'Product',
        text: `Check out ${product?.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Bağlantı panoya kopyalandı!', 'success');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const isFavorite = favorites.includes(product.id);
  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-gray-900 transition">Ana Sayfa</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gray-900 transition">Mağaza</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{discount}%
                  </span>
                )}
                {product.badge && (
                  <span className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.badge === 'NEW' ? 'YENİ' : product.badge}
                  </span>
                )}
                
                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((selectedImage - 1 + product.images.length) % product.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition opacity-0 group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((selectedImage + 1) % product.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition opacity-0 group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === index
                        ? 'border-indigo-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col space-y-6">
              {/* Title & Rating */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews || 0} değerlendirme)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">SKU: {product.id}</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-gray-900">{product.price}₺</span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 line-through ml-3">
                    {product.originalPrice}₺
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                {product.inStock !== false ? (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">Stokta Var</span>
                  </>
                ) : (
                  <span className="text-red-600 font-medium">Stokta Yok</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {product.description || `Experience premium quality with ${product.name}. Carefully crafted with attention to detail, this product combines style, comfort, and durability to meet your needs.`}
              </p>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-900">
                      Beden: <span className="font-normal text-gray-600">{selectedSize}</span>
                    </label>
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      Beden Kılavuzu
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-lg border-2 font-medium transition ${
                          selectedSize === size
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                            : 'border-gray-200 hover:border-gray-300 text-gray-900'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-3">
                    Renk: <span className="font-normal text-gray-600">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-indigo-600 scale-110'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        aria-label={color}
                      >
                        {selectedColor === color && (
                          <Check className="w-5 h-5 text-white mx-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <label className="text-sm font-semibold text-gray-900 block mb-3">
                  Adet
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 hover:bg-gray-50 transition"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 hover:bg-gray-50 transition"
                      disabled={quantity >= (product.stock || 10)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stock || 10} adet mevcut
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.inStock === false}
                  className="flex-1 bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Sepete Ekle</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.inStock === false}
                  className="flex-1 bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Hemen Al
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleToggleFavorite}
                  className="flex-1 border-2 border-gray-200 px-6 py-3 rounded-xl font-medium hover:border-gray-300 transition flex items-center justify-center space-x-2"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                  <span>{isFavorite ? 'Kaydedildi' : 'Kaydet'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="border-2 border-gray-200 px-6 py-3 rounded-xl hover:border-gray-300 transition"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                  <p className="text-xs text-gray-600 font-medium">Ücretsiz Kargo</p>
                  <p className="text-xs text-gray-400">500₺ üstü siparişler</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                  <p className="text-xs text-gray-600 font-medium">30 Gün İade</p>
                  <p className="text-xs text-gray-400">Kolay iade</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                  <p className="text-xs text-gray-600 font-medium">Güvenli Ödeme</p>
                  <p className="text-xs text-gray-400">%100 güvenli</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="border-t">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
              {/* Tab Navigation */}
              <div className="flex space-x-8 border-b">
                {[{id: 'description', label: 'Açıklama'}, {id: 'specifications', label: 'Özellikler'}, {id: 'shipping', label: 'Kargo'}, {id: 'reviews', label: 'Yorumlar'}].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 font-medium transition relative ${
                      activeTab === tab.id
                        ? 'text-indigo-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="py-8">
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Ürün Açıklaması</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {product.description || `${product.name} kalite ve stili ön planda tutan premium bir üründür.`}
                    </p>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Önemli Özellikler:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Premium kalite malzemeler</li>
                      <li>Dayanıklı ve uzun ömürlü yapı</li>
                      <li>Modern ve şık tasarım</li>
                      <li>Birden fazla beden ve renk seçeneği</li>
                      <li>Kolay bakım</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Özellikler</h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-b pb-3">
                        <dt className="text-sm font-medium text-gray-500">Kategori</dt>
                        <dd className="text-base text-gray-900 capitalize">{product.category}</dd>
                      </div>
                      <div className="border-b pb-3">
                        <dt className="text-sm font-medium text-gray-500">SKU</dt>
                        <dd className="text-base text-gray-900">{product.id}</dd>
                      </div>
                      {product.sizes && (
                        <div className="border-b pb-3">
                          <dt className="text-sm font-medium text-gray-500">Mevcut Bedenler</dt>
                          <dd className="text-base text-gray-900">{product.sizes.join(', ')}</dd>
                        </div>
                      )}
                      {product.colors && (
                        <div className="border-b pb-3">
                          <dt className="text-sm font-medium text-gray-500">Mevcut Renkler</dt>
                          <dd className="text-base text-gray-900">{product.colors.join(', ')}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Kargo ve İade</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Kargo Bilgileri</h4>
                        <p className="text-gray-600">
                          500₺ üstü siparişlerde ücretsiz standart kargo. Siparişler 1-2 iş günü içinde işleme alınır.
                          Hızlı kargo seçeneği ödeme sayfasında mevcuttur.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">İade Politikası</h4>
                        <p className="text-gray-600">
                          Çoğu ürün için 30 günlük iade politikası sunuyoruz. Ürünler kullanılmamış ve orijinal ambalajında olmalıdır.
                          İade başlatmak için müşteri hizmetlerimizle iletişime geçin.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Müşteri Yorumları</h3>
                      <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                        Yorum Yaz
                      </button>
                    </div>
                    
                    {/* Rating Summary */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                          <div className="flex items-center justify-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{product.reviews || 0} yorum</p>
                        </div>
                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className="flex items-center space-x-2 mb-1">
                              <span className="text-sm text-gray-600 w-8">{stars}★</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-yellow-400 h-2 rounded-full"
                                  style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review List */}
                    <div className="space-y-6">
                      <p className="text-gray-500 text-center py-8">Henüz yorum yok. Bu ürünü ilk değerlendiren siz olun!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t bg-gray-50 px-6 lg:px-12 py-12">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Bunları da Beğenebilirsiniz</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedProducts.map((relatedProduct) => (
                    <Link
                      key={relatedProduct.id}
                      to={`/product/${relatedProduct.id}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-900">{relatedProduct.price}₺</span>
                          {relatedProduct.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {relatedProduct.originalPrice}₺
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

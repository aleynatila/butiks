import { ArrowLeft, ArrowRight, Eye, Heart, ShoppingCart, TrendingUp } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const PersonalizedProducts = ({ products = [], title = 'Sana Özel Ürünler' }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Mouse drag to scroll
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Check scroll position to show/hide arrows
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll controls - Scroll by viewport width
  const scrollLeftBtn = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRightBtn = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Random social proof generator (gerçek veriler API'den geldiğinde kaldırılacak)
  const generateSocialProof = () => {
    const proofs = [
      { icon: Eye, text: `${Math.floor(Math.random() * 5000) + 100} kişi inceledi!`, color: 'text-blue-600' },
      { icon: ShoppingCart, text: `${Math.floor(Math.random() * 1000) + 50} kişinin sepetinde`, color: 'text-green-600' },
      { icon: Heart, text: `${Math.floor(Math.random() * 10000) + 500} kişi favoriledi!`, color: 'text-red-600' },
      { icon: TrendingUp, text: 'Hızlı Teslimat yapılıyor!', color: 'text-purple-600' },
    ];
    return proofs[Math.floor(Math.random() * proofs.length)];
  };

  const badges = [
    'En Çok Satan',
    'Kupon Fırsatı',
    'Kargo Bedava',
    'Son 14 Günün En Düşük Fiyatı',
    'En Çok Favorilenen',
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>
          <Link
            to="/shop"
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors group"
          >
            <span>Tümünü Gör</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Container with Side Arrows */}
        <div className="relative">
          {/* Left Arrow - Dynamic Style */}
          {showLeftArrow && (
            <button
              onClick={scrollLeftBtn}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 hover:scale-110 active:scale-95 group cursor-pointer"
              aria-label="Sola kaydır"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:text-indigo-600 group-hover:-translate-x-0.5 transition-all duration-300" />
            </button>
          )}

          {/* Right Arrow - Dynamic Style */}
          {showRightArrow && (
            <button
              onClick={scrollRightBtn}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 hover:scale-110 active:scale-95 group cursor-pointer"
              aria-label="Sağa kaydır"
            >
              <ArrowRight className="w-6 h-6 text-gray-700 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all duration-300" />
            </button>
          )}

          {/* Horizontal Scrollable Products */}
          <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.length === 0 ? (
            // Skeleton loaders
            Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[200px] bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="aspect-[3/4] bg-gray-200" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-2 bg-gray-200 rounded w-1/2" />
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))
          ) : (
            products.map((product, index) => {
              const socialProof = generateSocialProof();
              const SocialIcon = socialProof.icon;
              const randomBadge = badges[Math.floor(Math.random() * badges.length)];
              const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
              const discountPercent = hasDiscount
                ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
                : 0;

              return (
                <Link
                  key={`personalized-${product._id || product.id}-${index}`}
                  to={`/product/${product.slug || product._id}`}
                  className="flex-shrink-0 w-[200px] bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  style={{ userSelect: 'none' }}
                  draggable="false"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={product.images?.[0]?.url || product.image || 'https://via.placeholder.com/280x400'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      draggable="false"
                    />
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    >
                      <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                    </button>

                    {/* Badge */}
                    {randomBadge && (
                      <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                        {randomBadge}
                      </div>
                    )}

                    {/* Discount Badge */}
                    {hasDiscount && discountPercent > 0 && (
                      <div className="absolute bottom-3 left-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-lg">
                        -%{discountPercent}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3">
                    {/* Brand & Name */}
                    <div className="mb-1.5">
                      <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide mb-0.5">
                        {product.vendorId?.shopName || product.brand || 'Butiks'}
                      </p>
                      <h3 className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight">
                        {product.name}
                      </h3>
                    </div>

                    {/* Social Proof */}
                    <div className={`flex items-center space-x-1 text-[10px] ${socialProof.color} mb-2`}>
                      <SocialIcon className="w-3 h-3" />
                      <span className="font-medium truncate">{socialProof.text}</span>
                    </div>

                    {/* Rating */}
                    {product.stats?.rating > 0 && (
                      <div className="flex items-center space-x-1.5 mb-2">
                        <div className="flex items-center">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-xs font-semibold text-gray-900 ml-0.5">
                            {product.stats.rating.toFixed(1)}
                          </span>
                        </div>
                        {product.stats.reviewCount > 0 && (
                          <span className="text-[10px] text-gray-500">
                            ({product.stats.reviewCount})
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline space-x-1.5">
                      {hasDiscount && (
                        <span className="text-[10px] text-gray-400 line-through">
                          {product.compareAtPrice.toFixed(2)} TL
                        </span>
                      )}
                      <span className="text-sm font-bold text-indigo-600">
                        {product.price.toFixed(2)} TL
                      </span>
                    </div>

                    {/* Free Shipping Badge */}
                    {product.price >= 100 && (
                      <div className="mt-1.5 text-[10px] text-green-600 font-medium">
                        ✓ Ücretsiz Kargo
                      </div>
                    )}
                  </div>
                </Link>
              );
            })
          )}

          {/* See All Card */}
          {products.length > 0 && (
            <Link
              to="/shop"
              className="flex-shrink-0 w-[200px] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg border-2 border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-white group"
              style={{ userSelect: 'none' }}
              draggable="false"
            >
              <div className="text-center p-6">
                <div className="text-xl font-bold mb-3">Tümünü Gör</div>
                <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          )}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: Math.ceil(products.length / 4) }).map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-indigo-600 transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
};

export default PersonalizedProducts;

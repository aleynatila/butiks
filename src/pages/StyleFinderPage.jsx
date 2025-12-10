import { ChevronRight, Eye, Heart, RotateCcw, ShoppingBag, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useShop } from '../context/ShopContext';

const StyleFinderPage = () => {
  const navigate = useNavigate();
  const { products, favorites, toggleFavorite, showToast } = useShop();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState([]);
  const [passedProducts, setPassedProducts] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Use refs for touch tracking (more reliable on mobile)
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const cardRef = useRef(null);
  const dragOffsetRef = useRef(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const currentProduct = products[currentIndex];
  const totalProducts = products.length;
  const progress = isMobile 
    ? ((currentIndex) / totalProducts) * 100
    : ((currentIndex + 4) / totalProducts) * 100; // Desktop shows 4 at a time
  
  // Desktop: show 4 products at once
  const cardsPerPage = 4;
  const currentBatch = isMobile 
    ? [currentProduct].filter(Boolean)
    : products.slice(currentIndex, currentIndex + cardsPerPage);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLike = (product = currentProduct) => {
    if (!product || isAnimating) return;
    
    // Add to favorites if not already there
    const isFavorite = favorites.some(fav => fav.id === product.id);
    if (!isFavorite) {
      toggleFavorite(product);
    }
    
    setLikedProducts([...likedProducts, product]);
    showToast('Favorilere eklendi!');
  };

  const handlePass = (product = currentProduct) => {
    if (!product || isAnimating) return;
    
    setPassedProducts([...passedProducts, product]);
  };

  const handleLikeAndNext = (product = currentProduct) => {
    if (!product || isAnimating) return;
    
    if (isMobile) {
      setIsAnimating(true);
      setSwipeDirection('right');
    }
    
    handleLike(product);
    
    setTimeout(() => {
      moveToNext();
    }, isMobile ? 300 : 0);
  };

  const handlePassAndNext = (product = currentProduct) => {
    if (!product || isAnimating) return;
    
    if (isMobile) {
      setIsAnimating(true);
      setSwipeDirection('left');
    }
    
    handlePass(product);
    
    setTimeout(() => {
      moveToNext();
    }, isMobile ? 300 : 0);
  };

  const moveToNext = () => {
    const increment = isMobile ? 1 : cardsPerPage;
    if (currentIndex + increment < totalProducts) {
      setCurrentIndex(currentIndex + increment);
      setIsAnimating(false);
      setSwipeDirection(null);
    } else {
      setIsCompleted(true);
    }
  };

  const skipBatch = () => {
    if (isAnimating) return;
    
    // Mark all current batch as passed
    currentBatch.forEach(product => {
      if (!passedProducts.some(p => p.id === product.id) && !likedProducts.some(p => p.id === product.id)) {
        handlePass(product);
      }
    });
    
    moveToNext();
  };

  const handleUndo = () => {
    if (currentIndex === 0 || isAnimating) return;
    
    const previousIndex = currentIndex - 1;
    const previousProduct = products[previousIndex];
    
    // Remove from liked or passed arrays
    setLikedProducts(likedProducts.filter(p => p.id !== previousProduct.id));
    setPassedProducts(passedProducts.filter(p => p.id !== previousProduct.id));
    
    // Remove from favorites if it was liked
    const isFavorite = favorites.some(fav => fav.id === previousProduct.id);
    if (isFavorite && likedProducts.some(p => p.id === previousProduct.id)) {
      toggleFavorite(previousProduct);
    }
    
    setCurrentIndex(previousIndex);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setLikedProducts([]);
    setPassedProducts([]);
    setIsCompleted(false);
    setIsAnimating(false);
    setSwipeDirection(null);
  };

  // Touch handlers using refs (to work with native event listeners)
  const handleTouchStart = (e) => {
    if (isAnimating) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
    isDraggingRef.current = true;
    dragOffsetRef.current = 0;
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || isAnimating) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartRef.current.x;
    const diffY = Math.abs(currentY - touchStartRef.current.y);
    
    // If vertical movement is dominant, don't track horizontal
    if (diffY > Math.abs(diffX) && Math.abs(diffX) < 10) {
      return;
    }
    
    // Prevent vertical scroll while swiping horizontally
    if (Math.abs(diffX) > 10) {
      e.preventDefault();
    }
    
    dragOffsetRef.current = diffX;
    setDragOffset(diffX);
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current || isAnimating) return;
    isDraggingRef.current = false;
    
    const offset = dragOffsetRef.current;
    
    if (offset < -minSwipeDistance) {
      handlePassAndNext();
    } else if (offset > minSwipeDistance) {
      handleLikeAndNext();
    }
    
    dragOffsetRef.current = 0;
    setDragOffset(0);
  };

  // Attach native touch event listeners with passive: false
  useEffect(() => {
    const card = cardRef.current;
    if (!card || !isMobile) return;
    
    card.addEventListener('touchstart', handleTouchStart, { passive: true });
    card.addEventListener('touchmove', handleTouchMove, { passive: false });
    card.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, isAnimating, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isCompleted) return;
      
      if (e.key === 'ArrowLeft') {
        handlePass();
      } else if (e.key === 'ArrowRight') {
        handleLike();
      } else if (e.key === 'ArrowUp') {
        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, isAnimating, isCompleted]);

  // Completion Screen
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-stone-50" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.03) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Completion Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-4 bg-black rounded-full mb-6">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stil Keşfi Tamamlandı! 
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Tüm {totalProducts} ürünü incelediiniz
            </p>
            <p className="text-2xl font-bold text-indigo-600">
              {likedProducts.length} ürün favorilere eklendi!
            </p>
          </div>

          {/* Liked Products Grid */}
          {likedProducts.length > 0 ? (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Stil Seçimleriniz</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {likedProducts.map((product, index) => (
                  <div
                    key={`liked-${product.id}-${index}`}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x400?text=Görsel+Yüklenemedi';
                        }}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm font-bold text-indigo-600">
                        {product.price}₺
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center mb-8">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Bu sefer beğenilen ürün yok</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {likedProducts.length > 0 && (
              <Button
                onClick={() => navigate('/favorites')}
                size="lg"
              >
                <Heart className="w-5 h-5 mr-2" />
                Tüm Favorileri Gör
              </Button>
            )}
            <Button
              onClick={handleRestart}
              variant="outline"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Baştan Başla
              </Button>
            <Button
              onClick={() => navigate('/shop')}
              variant="outline"
              size="lg"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Alışverişe Devam Et
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Quick View Modal
  const QuickViewModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-200">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-indigo-600">{product.price}₺</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">{product.originalPrice}₺</span>
                )}
              </div>
              <p className="text-gray-600 mb-6">{product.description || 'Bu harika ürünle mükemmel stilinizi keşfedin.'}</p>
              <div className="flex gap-3">
                <Button onClick={() => { handleLikeAndNext(product); onClose(); }} className="flex-1">
                  <Heart className="w-5 h-5 mr-2" />
                  Favorilere Ekle
                </Button>
                <Button onClick={() => navigate(`/product/${product.id}`)} variant="outline" className="flex-1">
                  Detayları Gör
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mobile Interface (Swipe) - Full Page (Not Modal)
  const MobileInterface = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Top Bar - Fixed */}
      <div className="sticky top-0 z-20 px-4 pt-4 pb-2 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
          >
            <X className="w-5 h-5 text-gray-900" />
          </button>
          
          {/* Progress Counter */}
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <p className="text-sm font-bold text-gray-900">{currentIndex + 1} / {totalProducts}</p>
          </div>

          <button 
            onClick={handleUndo}
            disabled={currentIndex === 0}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg disabled:opacity-40"
          >
            <RotateCcw className="w-5 h-5 text-gray-900" />
          </button>
        </div>

        {/* Slim Progress Bar */}
        <div className="bg-white/50 backdrop-blur-sm rounded-full h-1 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Product Card Area - Flex grow to fill space */}
      <div className="flex-1 flex items-center justify-center px-4 py-4 overflow-hidden">
        {currentProduct && (
          <div
            ref={cardRef}
            style={{ 
              touchAction: 'pan-y', 
              userSelect: 'none',
              WebkitUserSelect: 'none',
              transform: swipeDirection 
                ? swipeDirection === 'right' 
                  ? 'translateX(100vw) rotate(15deg)' 
                  : 'translateX(-100vw) rotate(-15deg)'
                : `translateX(${dragOffset}px) rotate(${dragOffset * 0.03}deg)`,
              opacity: swipeDirection ? 0 : Math.max(0.5, 1 - Math.abs(dragOffset) / 400),
              transition: swipeDirection || dragOffset === 0 ? 'all 0.3s ease-out' : 'none'
            }}
            className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden relative"
          >
            {/* Swipe Indicator Overlays */}
            {dragOffset > 40 && (
              <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center z-10 pointer-events-none rounded-2xl">
                <div className="bg-green-500 text-white p-4 rounded-full shadow-lg">
                  <Heart className="w-10 h-10 fill-current" />
                </div>
              </div>
            )}
            {dragOffset < -40 && (
              <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center z-10 pointer-events-none rounded-2xl">
                <div className="bg-red-500 text-white p-4 rounded-full shadow-lg">
                  <X className="w-10 h-10" />
                </div>
              </div>
            )}
            
            {/* Product Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {currentProduct.isNew && (
                  <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    YENİ
                  </span>
                )}
                {currentProduct.originalPrice && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    %{Math.round((1 - currentProduct.price / currentProduct.originalPrice) * 100)} İNDİRİM
                  </span>
                )}
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 right-3">
                <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-2 py-1 rounded-full">
                  {currentProduct.category}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                {currentProduct.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-indigo-600">
                  {currentProduct.price}₺
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {currentProduct.originalPrice}₺
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar - Fixed */}
      <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-4 py-4 safe-area-inset-bottom">
        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-8">
          {/* Pass Button */}
          <button
            onClick={handlePassAndNext}
            disabled={isAnimating}
            className="w-16 h-16 bg-white border-2 border-gray-200 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50"
            aria-label="Geç"
          >
            <X className="w-8 h-8 text-red-500" />
          </button>

          {/* Like Button */}
          <button
            onClick={handleLikeAndNext}
            disabled={isAnimating}
            className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50"
            aria-label="Beğen"
          >
            <Heart className="w-8 h-8 text-white fill-white" />
          </button>
        </div>
        
        {/* Hint */}
        <p className="text-center text-xs text-gray-400 mt-2">← Kaydır veya butona bas →</p>
      </div>
    </div>
  );

  // Desktop Interface (Grid)
  const DesktopInterface = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-10 h-10 text-gray-900" />
              <h1 className="text-4xl font-bold text-gray-900">Find Your Style</h1>
            </div>
            <p className="text-gray-600 text-lg">Beğenmek için kalbe, geçmek için X'e tıklayın veya detayları görün</p>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
            <div className="bg-black h-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
          </div>

          {/* Counter & Skip */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-900 font-semibold text-lg">
              Ürünler {currentIndex + 1}-{Math.min(currentIndex + cardsPerPage, totalProducts)} of {totalProducts}
            </p>
            <button
              onClick={skipBatch}
              className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors"
            >
              Atla
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {currentBatch.map((product) => (
              <div
                key={product.id}
                className="group relative"
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-center">
                      {product.isNew && (
                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full text-center">
                          YENI
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full text-center">
                          INDIRIM
                        </span>
                      )}
                    </div>

                    {/* Hover Overlay with Actions */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
                      hoveredCard === product.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-center gap-3">
                        <button
                          onClick={() => handlePassAndNext(product)}
                          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                          title="Pass"
                        >
                          <X className="w-6 h-6 text-red-500" />
                        </button>
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                          title="Quick View"
                        >
                          <Eye className="w-6 h-6 text-gray-700" />
                        </button>
                        <button
                          onClick={() => handleLikeAndNext(product)}
                          className="w-12 h-12 bg-black rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                          title="Like"
                        >
                          <Heart className="w-6 h-6 text-white fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-indigo-600">{product.price}₺</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}₺</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - Liked Items */}
        <div className="w-80 bg-white border border-gray-200 rounded-2xl p-6 h-fit sticky top-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 font-bold text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 fill-current" />
              Favoriler ({likedProducts.length})
            </h3>
          </div>
          
          {likedProducts.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {likedProducts.slice(-5).reverse().map((product, index) => (
                <div
                  key={`sidebar-${product.id}-${index}`}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="flex gap-3 bg-white rounded-lg p-2 cursor-pointer hover:shadow-lg transition-all"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=Görsel';
                    }}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{product.name}</h4>
                    <p className="text-sm font-bold text-indigo-600">{product.price}₺</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Henüz Favorilere Eklenmedi</p>
            </div>
          )}

          {likedProducts.length > 0 && (
            <Button
              onClick={() => navigate('/favorites')}
              className="w-full mt-4"
              variant="outline"
            >
              Tüm Favorileri Görüntüle
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  // Main Style Finder Interface
  return (
    <>
      {quickViewProduct && <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}
      
      <div className="min-h-screen bg-stone-50 py-8" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.03) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        {isMobile ? <MobileInterface /> : <DesktopInterface />}
      </div>
    </>
  );
};

export default StyleFinderPage;

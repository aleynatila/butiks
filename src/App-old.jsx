import { useState, useEffect } from 'react';
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  X,
  Check,
  Shield,
  BadgeCheck,
  ChevronLeft,
  Plus,
  Minus,
  Star,
  MapPin,
  Clock,
  Instagram,
  ArrowRight,
  Filter,
  Grid3X3,
  LayoutGrid,
  Trash2,
  Tag,
  CreditCard,
  Truck,
  Package,
  FileText,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Settings,
  LogOut,
  Edit,
  Home,
  Store,
  HelpCircle,
  Info
} from 'lucide-react';

// ============================================
// MOCK DATA
// ============================================

const IMAGES = {
  fashion1: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
  fashion2: 'https://images.unsplash.com/photo-1550614000-4b9519e09d5c?w=800&q=80',
  bag: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
  sneakers: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  portrait: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  hero: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80',
  portrait2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  portrait3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  fashion3: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
  fashion4: 'https://images.unsplash.com/photo-1485968579169-a6b7c4452c8f?w=800&q=80',
  fashion5: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
  lifestyle1: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
  lifestyle2: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80',
};

const MOCK_BOUTIQUES = [
  { id: 1, name: 'NOIR Studio', handle: '@noirstudio', avatar: IMAGES.portrait, banner: IMAGES.fashion1, bio: 'Modern kadın için özenle seçilmiş minimalist moda. Los Angeles merkezli.', followers: '124B', location: 'Los Angeles, CA', verified: true, styles: ['Minimalist', 'Luxury'] },
  { id: 2, name: 'Vintage Vault', handle: '@vintagevault', avatar: IMAGES.portrait2, banner: IMAGES.fashion2, bio: '70-90\'lardan otantik vintage parçalar. Her parçanın bir hikayesi var.', followers: '89B', location: 'Brooklyn, NY', verified: true, styles: ['Vintage', 'Retro'] },
  { id: 3, name: 'Street Culture', handle: '@streetculture', avatar: IMAGES.portrait3, banner: IMAGES.fashion3, bio: 'Underground streetwear koleksiyonları. Sadece sınırlı sayıda.', followers: '256B', location: 'Tokyo, JP', verified: true, styles: ['Streetwear', 'Y2K'] },
  { id: 4, name: 'The Edit', handle: '@theedit', avatar: IMAGES.portrait, banner: IMAGES.lifestyle1, bio: 'Haftalık olarak seçilen öncü parçalar. Sürdürülebilir lüks.', followers: '67B', location: 'London, UK', verified: true, styles: ['Luxury', 'Sustainable'] },
  { id: 5, name: 'Y2K Archive', handle: '@y2karchive', avatar: IMAGES.portrait2, banner: IMAGES.fashion4, bio: '2000\'lerin en iyi modasını geri getiriyoruz.', followers: '198B', location: 'Miami, FL', verified: true, styles: ['Y2K', 'Vintage'] },
  { id: 6, name: 'Minimal Theory', handle: '@minimaltheory', avatar: IMAGES.portrait3, banner: IMAGES.fashion5, bio: 'Az çoktur. Gardırobunuz için zamansız esaslar.', followers: '45B', location: 'Copenhagen, DK', verified: false, styles: ['Minimalist'] },
  { id: 7, name: 'Hype Central', handle: '@hypecentral', avatar: IMAGES.portrait, banner: IMAGES.lifestyle2, bio: 'En son çıkanlar ve işbirlikleri için kaynağınız.', followers: '312B', location: 'New York, NY', verified: true, styles: ['Streetwear', 'Luxury'] },
  { id: 8, name: 'Boho Dreams', handle: '@bohodreams', avatar: IMAGES.portrait2, banner: IMAGES.hero, bio: 'Gezginler ve hayalperestler için özgür ruhlu moda.', followers: '78B', location: 'Austin, TX', verified: false, styles: ['Bohemian', 'Vintage'] },
];

const MOCK_PRODUCTS = [
  { id: 1, name: 'Oversize Keten Blazer', price: 189, originalPrice: 249, image: IMAGES.fashion1, boutiqueId: 1, category: 'Dış Giyim', styles: ['Minimalist', 'Luxury'], isNew: true, isSoldOut: false },
  { id: 2, name: 'Vintage Denim Ceket', price: 145, originalPrice: null, image: IMAGES.fashion2, boutiqueId: 2, category: 'Dış Giyim', styles: ['Vintage', 'Streetwear'], isNew: false, isSoldOut: false },
  { id: 3, name: 'Kapitone Deri Çanta', price: 320, originalPrice: 400, image: IMAGES.bag, boutiqueId: 1, category: 'Aksesuar', styles: ['Luxury', 'Minimalist'], isNew: true, isSoldOut: false },
  { id: 4, name: 'Retro Runner Ayakkabı', price: 175, originalPrice: null, image: IMAGES.sneakers, boutiqueId: 3, category: 'Ayakkabı', styles: ['Streetwear', 'Y2K'], isNew: false, isSoldOut: false },
  { id: 5, name: 'İpek Askılı Elbise', price: 225, originalPrice: 275, image: IMAGES.fashion3, boutiqueId: 4, category: 'Elbise', styles: ['Minimalist', 'Luxury'], isNew: true, isSoldOut: false },
  { id: 6, name: 'Y2K Kelebek Crop Top', price: 68, originalPrice: null, image: IMAGES.fashion4, boutiqueId: 5, category: 'Üst', styles: ['Y2K', 'Vintage'], isNew: false, isSoldOut: true },
  { id: 7, name: 'Kısa Paçalı Kargo Pantolon', price: 95, originalPrice: 120, image: IMAGES.fashion5, boutiqueId: 3, category: 'Alt', styles: ['Streetwear'], isNew: false, isSoldOut: false },
  { id: 8, name: 'Kaşmir Triko Kazak', price: 285, originalPrice: null, image: IMAGES.lifestyle1, boutiqueId: 6, category: 'Triko', styles: ['Minimalist'], isNew: true, isSoldOut: false },
  { id: 9, name: 'Platform Combat Bot', price: 210, originalPrice: 280, image: IMAGES.sneakers, boutiqueId: 7, category: 'Ayakkabı', styles: ['Streetwear', 'Y2K'], isNew: false, isSoldOut: false },
  { id: 10, name: 'Bohem Uzun Etek', price: 135, originalPrice: null, image: IMAGES.lifestyle2, boutiqueId: 8, category: 'Alt', styles: ['Bohemian', 'Vintage'], isNew: true, isSoldOut: false },
  { id: 11, name: 'Omuz Çantası', price: 195, originalPrice: 250, image: IMAGES.bag, boutiqueId: 4, category: 'Aksesuar', styles: ['Luxury'], isNew: false, isSoldOut: false },
  { id: 12, name: 'Vintage Band Tişört', price: 85, originalPrice: null, image: IMAGES.fashion2, boutiqueId: 2, category: 'Üst', styles: ['Vintage', 'Streetwear'], isNew: false, isSoldOut: false },
];

const STYLE_OPTIONS = ['Streetwear', 'Minimalist', 'Vintage', 'Y2K', 'Luxury', 'Bohemian', 'Sustainable', 'Retro'];

const MOCK_CART_ITEMS = [];

const MOCK_FAVORITES = [];

// ============================================
// SUB-COMPONENTS
// ============================================

const Navbar = ({ cartCount, onLogoClick, onCartClick, favoritesCount, onFavoritesClick, onAccountClick, onNavigate }) => (
  <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between gap-8">
        {/* Logo */}
        <button 
          onClick={onLogoClick}
          className="text-2xl font-bold tracking-tight text-gray-900 hover:opacity-70 transition-opacity"
        >
          BUTIKS
        </button>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <button onClick={() => onNavigate('categories')} className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Kategoriler
          </button>
          <button onClick={() => onNavigate('boutiques')} className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Butikler
          </button>
          <button onClick={() => onNavigate('about')} className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Hakkımızda
          </button>
          <button onClick={() => onNavigate('help')} className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Yardım
          </button>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Butik, ürün, stil ara..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-1">
          <button onClick={onAccountClick} className="p-3 hover:bg-gray-50 rounded-full transition-colors">
            <User className="w-5 h-5 text-gray-700" />
          </button>
          <button onClick={onFavoritesClick} className="p-3 hover:bg-gray-50 rounded-full transition-colors relative">
            <Heart className="w-5 h-5 text-gray-700" />
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>
          <button 
            onClick={onCartClick}
            className="p-3 hover:bg-gray-50 rounded-full transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  </header>
);

const OnboardingModal = ({ onComplete }) => {
  const [selectedStyles, setSelectedStyles] = useState([]);

  const toggleStyle = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else if (selectedStyles.length < 3) {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tarzını Belirle</h2>
        <p className="text-gray-500 mb-6">Estetiğinize uygun 3 tarz seçin. Akışınızı sizin için kişiselleştireceğiz.</p>
        
        <div className="grid grid-cols-2 gap-3 mb-8">
          {STYLE_OPTIONS.map(style => (
            <button
              key={style}
              onClick={() => toggleStyle(style)}
              className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                selectedStyles.includes(style)
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {selectedStyles.includes(style) && <Check className="w-4 h-4" />}
                {style}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{selectedStyles.length}/3 seçildi</span>
          <button
            onClick={() => onComplete(selectedStyles)}
            disabled={selectedStyles.length === 0}
            className="px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Devam Et
          </button>
        </div>
      </div>
    </div>
  );
};

const HeroSection = ({ onNavigate }) => (
  <section className="bg-white py-12 lg:py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Gizli<br />Hazineleri Keşfet
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-md">
            En güvenilir Instagram butiklerinden özenle seçilmiş modayı alışveriş yapın. 
            Her satın alma garantimizle korunur.
          </p>
          <div className="flex items-center gap-4">
            <button className="px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2">
              Keşfet
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className="px-8 py-4 border border-gray-300 text-gray-900 font-medium rounded-full hover:border-gray-900 transition-colors"
            >
              Nasıl Çalışır
            </button>
          </div>
        </div>

        {/* Right - Image Collage */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden">
              <img src={IMAGES.fashion1} alt="Moda" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img src={IMAGES.bag} alt="Aksesuar" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src={IMAGES.sneakers} alt="Ayakkabı" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StoriesRail = ({ boutiques, onBoutiqueClick }) => (
  <section className="py-8 border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Yeni Ürünler</h2>
        <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Tümünü Gör</button>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
        {boutiques.map(boutique => (
          <button
            key={boutique.id}
            onClick={() => onBoutiqueClick(boutique)}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
          >
            <div className="w-20 h-20 rounded-full p-[3px] bg-gradient-to-br from-gray-900 to-gray-600">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                <img src={boutique.avatar} alt={boutique.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors truncate max-w-[80px]">
              {boutique.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  </section>
);

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const filters = ['Tümü', 'Yeni Gelenler', 'Trend', 'İndirimli', 'Vintage', 'Streetwear'];

  return (
    <div className="flex items-center justify-between py-6">
      <div className="flex items-center gap-2 overflow-x-auto">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 ml-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <LayoutGrid className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ product, boutique, onClick, onBoutiqueClick, size = 'normal' }) => {
  const isLarge = size === 'large';
  
  return (
    <div 
      className={`group cursor-pointer ${isLarge ? 'row-span-2' : ''}`}
      onClick={onClick}
    >
      <div className={`relative overflow-hidden rounded-xl bg-gray-100 ${isLarge ? 'aspect-[3/4]' : 'aspect-square'}`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-white text-xs font-medium text-gray-900 rounded-full">
              Yeni
            </span>
          )}
          {product.originalPrice && (
            <span className="px-3 py-1 bg-gray-900 text-xs font-medium text-white rounded-full">
              İndirim
            </span>
          )}
          {product.isSoldOut && (
            <span className="px-3 py-1 bg-gray-600 text-xs font-medium text-white rounded-full">
              Tükendi
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <Heart className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Boutique Tag */}
        <button
          onClick={(e) => { e.stopPropagation(); onBoutiqueClick(boutique); }}
          className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <img src={boutique.avatar} alt={boutique.name} className="w-5 h-5 rounded-full object-cover" />
          <span className="text-xs font-medium text-gray-900">{boutique.name}</span>
          {boutique.verified && <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />}
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">{product.price}₺</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{product.originalPrice}₺</span>
          )}
        </div>
      </div>
    </div>
  );
};

const CuratedFeed = ({ products, boutiques, selectedStyles, onProductClick, onBoutiqueClick }) => {
  const getBoutique = (boutiqueId) => boutiques.find(b => b.id === boutiqueId);
  
  // Filter products based on selected styles
  const filteredProducts = selectedStyles.length > 0
    ? products.filter(p => p.styles.some(s => selectedStyles.includes(s)))
    : products;

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedStyles.length > 0 ? 'Sizin İçin Öneriler' : 'Özenle Seçilmiş Ürünler'}
          </h2>
        </div>
        {selectedStyles.length > 0 && (
          <p className="text-sm text-gray-500 mb-6">
            Tarzınıza göre: {selectedStyles.join(', ')}
          </p>
        )}
        <FilterBar />
        
        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              boutique={getBoutique(product.boutiqueId)}
              onClick={() => onProductClick(product)}
              onBoutiqueClick={onBoutiqueClick}
              size={index % 5 === 0 ? 'large' : 'normal'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TrustBanner = () => (
  <section className="py-12 bg-white border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Alıcı Koruması</h3>
            <p className="text-sm text-gray-500">Ürün açıklamaya uygun değilse tam iade</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
            <BadgeCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Doğrulanmış Butikler</h3>
            <p className="text-sm text-gray-500">Tüm satıcılar incelendi ve onaylandı</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Hızlı Kargo</h3>
            <p className="text-sm text-gray-500">Çoğu sipariş 48 saat içinde kargoda</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProductDetailPage = ({ product, boutique, onBack, onBoutiqueClick, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Geri Dön</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left - Image Gallery (60%) */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img src={IMAGES.lifestyle1} alt="Yaşam Tarzı" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right - Details (40%) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Boutique Info */}
            <button
              onClick={() => onBoutiqueClick(boutique)}
              className="flex items-center gap-3 w-full p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
            >
              <img src={boutique.avatar} alt={boutique.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{boutique.name}</span>
                  {boutique.verified && <BadgeCheck className="w-4 h-4 text-emerald-600" />}
                </div>
                <span className="text-sm text-gray-500">{boutique.followers} takipçi</span>
              </div>
              <span className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full">
                Takip Et
              </span>
            </button>

            {/* Product Title & Price */}
            <div>
              <p className="text-sm text-gray-500 mb-1">{product.category}</p>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">{product.price}₺</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">{product.originalPrice}₺</span>
                    <span className="px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded">
                      %{Math.round((1 - product.price / product.originalPrice) * 100)} İNDİRİM
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900">Beden</span>
                <button className="text-sm text-gray-500 underline">Beden Rehberi</button>
              </div>
              <div className="flex gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg font-medium text-sm transition-colors ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="text-sm font-medium text-gray-900 block mb-3">Adet</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-700" />
                </button>
                <span className="text-lg font-semibold text-gray-900 w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Trust Box */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-1">Butiks Garantisi ile Korunur</h4>
                  <p className="text-sm text-emerald-700">Ürün açıklamaya uygun değilse tam iade. Güvenli ödeme ve şifreli işlemler.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-emerald-200">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Doğrulanmış Butik</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Açıklama</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Detaylara gösterilen özen ile üretilmiş zamansız bir parça. Günlük gardırobunuzu zahmetsiz bir şıklıkla 
                yükseltmek için mükemmel. Kalıcı kalite ve konfor için premium malzemelerden üretilmiştir.
              </p>
            </div>

            {/* Sticky Add to Cart */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 lg:static lg:p-0 lg:border-0">
              <div className="max-w-7xl mx-auto flex items-center gap-4">
                <button className="p-4 border border-gray-300 rounded-xl hover:border-gray-900 transition-colors">
                  <Heart className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => onAddToCart(quantity)}
                  disabled={product.isSoldOut}
                  className="flex-1 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {product.isSoldOut ? 'Tükendi' : `Sepete Ekle - ${product.price * quantity}₺`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BoutiqueProfilePage = ({ boutique, products, onBack, onProductClick }) => {
  const boutiqueProducts = products.filter(p => p.boutiqueId === boutique.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Geri Dön</span>
        </button>
      </div>

      {/* Banner */}
      <div className="h-64 lg:h-80 relative overflow-hidden">
        <img src={boutique.banner} alt={boutique.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-8">
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
            <img src={boutique.avatar} alt={boutique.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{boutique.name}</h1>
              {boutique.verified && (
                <span className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Doğrulanmış
                </span>
              )}
            </div>
            <p className="text-gray-500 mb-3">{boutique.handle}</p>
            <p className="text-gray-700 max-w-xl mb-4">{boutique.bio}</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5 text-gray-600">
                <MapPin className="w-4 h-4" />
                {boutique.location}
              </div>
              <div className="flex items-center gap-1.5 text-gray-600">
                <Instagram className="w-4 h-4" />
                {boutique.followers} takipçi
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
              Takip Et
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-900 font-medium rounded-full hover:border-gray-900 transition-colors">
              Mesaj Gönder
            </button>
          </div>
        </div>

        {/* Style Tags */}
        <div className="flex gap-2 mb-8">
          {boutique.styles.map(style => (
            <span key={style} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
              {style}
            </span>
          ))}
        </div>

        {/* Products Grid */}
        <div className="border-t border-gray-200 pt-8 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Ürünler</h2>
            <span className="text-gray-500 text-sm">{boutiqueProducts.length} ürün</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {boutiqueProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                boutique={boutique}
                onClick={() => onProductClick(product)}
                onBoutiqueClick={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ onNavigate }) => (
  <footer className="bg-gray-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div>
          <h3 className="text-xl font-bold mb-4">BUTIKS</h3>
          <p className="text-gray-400 text-sm">
            Sosyal ticaretin geleceği. Güvenilir butikler, özenle seçilmiş moda ve korunan alışverişler keşfedin.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Alışveriş</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">Yeni Gelenler</button></li>
            <li><button className="hover:text-white transition-colors">Trend Ürünler</button></li>
            <li><button onClick={() => onNavigate('boutiques')} className="hover:text-white transition-colors">Butikler</button></li>
            <li><button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">Kategoriler</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Destek</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button onClick={() => onNavigate('help')} className="hover:text-white transition-colors">Yardım Merkezi</button></li>
            <li><button className="hover:text-white transition-colors">Alıcı Koruması</button></li>
            <li><button className="hover:text-white transition-colors">İade</button></li>
            <li><button onClick={() => onNavigate('help')} className="hover:text-white transition-colors">Bize Ulaşın</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Butikler İçin</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button className="hover:text-white transition-colors">Butiks'te Satış Yap</button></li>
            <li><button className="hover:text-white transition-colors">Satıcı Paneli</button></li>
            <li><button className="hover:text-white transition-colors">Doğrulama</button></li>
            <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Kaynaklar</button></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">2025 Butiks. Tüm hakları saklıdır.</p>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <button className="hover:text-white transition-colors">Gizlilik Politikası</button>
          <button className="hover:text-white transition-colors">Kullanım Koşulları</button>
        </div>
      </div>
    </div>
  </footer>
);

// ============================================
// NEW PAGES - CART, FAVORITES, ACCOUNT, etc.
// ============================================

const CartPage = ({ cartItems, onBack, onUpdateQuantity, onRemove, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const [couponCode, setCouponCode] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Geri Dön</span>
          </button>
          <div className="text-center py-20">
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sepetiniz Boş</h2>
            <p className="text-gray-500 mb-8">Alışverişe başlamak için ürünlere göz atın</p>
            <button onClick={onBack} className="px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
              Alışverişe Devam Et
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Alışverişe Devam Et</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sepetim</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-6 flex gap-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{item.boutique.name}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-50">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-50">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-bold text-gray-900">{item.product.price * item.quantity}₺</span>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} className="p-2 hover:bg-gray-50 rounded-lg h-fit">
                  <Trash2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ara Toplam</span>
                  <span className="font-medium text-gray-900">{total}₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kargo</span>
                  <span className="font-medium text-emerald-600">Ücretsiz</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium text-gray-900 block mb-2">Kupon Kodu</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Kod giriniz"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <button className="px-4 py-2 border border-gray-900 rounded-lg text-sm font-medium hover:bg-gray-50">
                    Uygula
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                <span>Toplam</span>
                <span>{total}₺</span>
              </div>

              <button onClick={onCheckout} className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors">
                Ödemeye Geç
              </button>

              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-700">
                    Tüm ödemeleriniz Butiks Alıcı Koruması ile güvence altındadır
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = ({ cartItems, onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Sepete Dön</span>
        </button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-3 ${step >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 1 ? 'bg-gray-900 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="font-medium">Teslimat</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200" />
            <div className={`flex items-center gap-3 ${step >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 2 ? 'bg-gray-900 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="font-medium">Ödeme</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200" />
            <div className={`flex items-center gap-3 ${step >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 3 ? 'bg-gray-900 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="font-medium">Onay</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8">
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Teslimat Bilgileri</h2>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                        <input
                          type="text"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="Adınız"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                        <input
                          type="text"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="Soyadınız"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="ornek@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="+90 5XX XXX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                      <textarea
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="Tam adresinizi giriniz"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
                        <input
                          type="text"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="İstanbul"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Posta Kodu</label>
                        <input
                          type="text"
                          value={shippingInfo.postalCode}
                          onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="34XXX"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Ödeme Yöntemi</h2>
                  <div className="space-y-4">
                    <button
                      onClick={() => setPaymentMethod('credit-card')}
                      className={`w-full p-6 border-2 rounded-xl text-left transition-colors ${
                        paymentMethod === 'credit-card' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <CreditCard className="w-6 h-6" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Kredi/Banka Kartı</h3>
                          <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                        </div>
                      </div>
                    </button>

                    {paymentMethod === 'credit-card' && (
                      <div className="pl-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Kart Numarası</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Son Kullanma</label>
                            <input
                              type="text"
                              placeholder="AA/YY"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Sipariş Özeti</h2>
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Teslimat Adresi</h3>
                      <p className="text-sm text-gray-600">
                        {shippingInfo.firstName} {shippingInfo.lastName}<br />
                        {shippingInfo.address}<br />
                        {shippingInfo.city}, {shippingInfo.postalCode}<br />
                        {shippingInfo.phone}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Ürünler</h3>
                      <div className="space-y-3">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.product.name}</p>
                              <p className="text-sm text-gray-500">Adet: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-gray-900">{item.product.price * item.quantity}₺</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center gap-4 mt-8">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border border-gray-300 text-gray-900 font-medium rounded-lg hover:border-gray-900 transition-colors"
                  >
                    Geri
                  </button>
                )}
                <button
                  onClick={handleContinue}
                  className="flex-1 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {step === 3 ? 'Siparişi Tamamla' : 'Devam Et'}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Sipariş Özeti</h3>
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ara Toplam</span>
                  <span className="font-medium text-gray-900">{total}₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kargo</span>
                  <span className="font-medium text-emerald-600">Ücretsiz</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Toplam</span>
                <span>{total}₺</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoriesPage = ({ products, boutiques, onBack, onProductClick, onBoutiqueClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [sortBy, setSortBy] = useState('Önerilen');

  const categories = ['Tümü', 'Dış Giyim', 'Elbise', 'Üst', 'Alt', 'Ayakkabı', 'Aksesuar', 'Triko'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const styles = ['Streetwear', 'Minimalist', 'Vintage', 'Y2K', 'Luxury', 'Bohemian'];
  const sortOptions = ['Önerilen', 'Düşük Fiyat', 'Yüksek Fiyat', 'Yeni Gelenler', 'Popüler'];

  const getBoutique = (boutiqueId) => boutiques.find(b => b.id === boutiqueId);

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'Tümü' && product.category !== selectedCategory) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (selectedStyles.length > 0 && !product.styles.some(s => selectedStyles.includes(s))) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Düşük Fiyat') return a.price - b.price;
    if (sortBy === 'Yüksek Fiyat') return b.price - a.price;
    if (sortBy === 'Yeni Gelenler') return b.isNew - a.isNew;
    return 0;
  });

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleStyle = (style) => {
    setSelectedStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Geri Dön</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Kategoriler</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-24 space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Kategori</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Fiyat Aralığı</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{priceRange[0]}₺</span>
                    <span className="text-gray-600">{priceRange[1]}₺</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Size Filter */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Beden</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 text-sm font-medium transition-colors ${
                        selectedSizes.includes(size)
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Filter */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Stil</h3>
                <div className="space-y-2">
                  {styles.map(style => (
                    <label key={style} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStyles.includes(style)}
                        onChange={() => toggleStyle(style)}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{style}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('Tümü');
                  setPriceRange([0, 5000]);
                  setSelectedSizes([]);
                  setSelectedStyles([]);
                }}
                className="w-full py-2 text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Filtreleri Temizle
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{sortedProducts.length} ürün bulundu</p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sırala:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    boutique={getBoutique(product.boutiqueId)}
                    onClick={() => onProductClick(product)}
                    onBoutiqueClick={onBoutiqueClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ürün Bulunamadı</h3>
                <p className="text-gray-500 mb-6">Filtreleri değiştirerek tekrar deneyin</p>
                <button
                  onClick={() => {
                    setSelectedCategory('Tümü');
                    setPriceRange([0, 5000]);
                    setSelectedSizes([]);
                    setSelectedStyles([]);
                  }}
                  className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FavoritesPage = ({ favorites, onBack, onRemove, onProductClick }) => {
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Geri Dön</span>
          </button>
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Favorileriniz Boş</h2>
            <p className="text-gray-500 mb-8">Beğendiğiniz ürünleri kaydedin ve daha sonra kolayca bulun</p>
            <button onClick={onBack} className="px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
              Ürünleri Keşfet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Geri Dön</span>
        </button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Favorilerim</h1>
          <span className="text-gray-500">{favorites.length} ürün</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(fav => (
            <div key={fav.product.id} className="group relative">
              <button
                onClick={() => onProductClick(fav.product)}
                className="block w-full"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                  <img src={fav.product.image} alt={fav.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-1">{fav.product.name}</h3>
                <p className="text-sm font-bold text-gray-900">{fav.product.price}₺</p>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(fav.product.id); }}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AccountPage = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Geri Dön</span>
        </button>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Ayşe Yılmaz</h3>
                  <p className="text-sm text-gray-500">ayse@email.com</p>
                </div>
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'profile' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profil Bilgileri
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'orders' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  Siparişlerim
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'addresses' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  Adreslerim
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'payments' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Ödeme Yöntemleri
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings className="w-5 h-5" />
                  Ayarlar
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-5 h-5" />
                  Çıkış Yap
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profil Bilgileri</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                      <input type="text" defaultValue="Ayşe" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                      <input type="text" defaultValue="Yılmaz" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                    <input type="email" defaultValue="ayse@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input type="tel" defaultValue="+90 555 123 45 67" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900" />
                  </div>
                  <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    Değişiklikleri Kaydet
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Siparişlerim</h2>
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Henüz siparişiniz bulunmuyor</p>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Adreslerim</h2>
                  <button className="px-4 py-2 border border-gray-900 rounded-lg text-sm font-medium hover:bg-gray-50">
                    Yeni Adres Ekle
                  </button>
                </div>
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Kayıtlı adresiniz bulunmuyor</p>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="bg-white rounded-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Ödeme Yöntemleri</h2>
                  <button className="px-4 py-2 border border-gray-900 rounded-lg text-sm font-medium hover:bg-gray-50">
                    Yeni Kart Ekle
                  </button>
                </div>
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Kayıtlı kartınız bulunmuyor</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBoutique, setSelectedBoutique] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo(0, 0);
  };

  const handleBoutiqueClick = (boutique) => {
    setSelectedBoutique(boutique);
    setCurrentView('profile');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedProduct(null);
    setSelectedBoutique(null);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (quantity) => {
    if (selectedProduct) {
      const existingItem = cartItems.find(item => item.product.id === selectedProduct.id);
      if (existingItem) {
        setCartItems(cartItems.map(item =>
          item.product.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ));
      } else {
        setCartItems([...cartItems, {
          id: Date.now(),
          product: selectedProduct,
          boutique: getBoutique(selectedProduct.boutiqueId),
          quantity,
          size: 'M'
        }]);
      }
    }
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleOnboardingComplete = (styles) => {
    setSelectedStyles(styles);
    setShowOnboarding(false);
  };

  const getBoutique = (boutiqueId) => MOCK_BOUTIQUES.find(b => b.id === boutiqueId);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}

      {/* Navigation */}
      <Navbar 
        cartCount={cartCount} 
        favoritesCount={favoritesCount}
        onLogoClick={handleBack}
        onCartClick={() => handleNavigate('cart')}
        onFavoritesClick={() => handleNavigate('favorites')}
        onAccountClick={() => handleNavigate('account')}
        onNavigate={handleNavigate}
      />

      {/* Views */}
      {currentView === 'home' && (
        <>
          <HeroSection onNavigate={handleNavigate} />
          <StoriesRail boutiques={MOCK_BOUTIQUES} onBoutiqueClick={handleBoutiqueClick} />
          <TrustBanner />
          <CuratedFeed 
            products={MOCK_PRODUCTS} 
            boutiques={MOCK_BOUTIQUES}
            selectedStyles={selectedStyles}
            onProductClick={handleProductClick}
            onBoutiqueClick={handleBoutiqueClick}
          />
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {currentView === 'product' && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          boutique={getBoutique(selectedProduct.boutiqueId)}
          onBack={handleBack}
          onBoutiqueClick={handleBoutiqueClick}
          onAddToCart={handleAddToCart}
        />
      )}

      {currentView === 'profile' && selectedBoutique && (
        <BoutiqueProfilePage
          boutique={selectedBoutique}
          products={MOCK_PRODUCTS}
          onBack={handleBack}
          onProductClick={handleProductClick}
        />
      )}

      {currentView === 'cart' && (
        <CartPage
          cartItems={cartItems}
          onBack={handleBack}
          onUpdateQuantity={(id, newQty) => {
            if (newQty === 0) {
              setCartItems(cartItems.filter(item => item.id !== id));
            } else {
              setCartItems(cartItems.map(item =>
                item.id === id ? { ...item, quantity: newQty } : item
              ));
            }
          }}
          onRemove={(id) => setCartItems(cartItems.filter(item => item.id !== id))}
          onCheckout={() => handleNavigate('checkout')}
        />
      )}

      {currentView === 'favorites' && (
        <FavoritesPage
          favorites={favorites}
          onBack={handleBack}
          onRemove={(productId) => setFavorites(favorites.filter(fav => fav.product.id !== productId))}
          onProductClick={handleProductClick}
        />
      )}

      {currentView === 'account' && (
        <AccountPage
          onBack={handleBack}
          onNavigate={handleNavigate}
        />
      )}

      {currentView === 'categories' && (
        <CategoriesPage
          products={MOCK_PRODUCTS}
          boutiques={MOCK_BOUTIQUES}
          onBack={handleBack}
          onProductClick={handleProductClick}
          onBoutiqueClick={handleBoutiqueClick}
        />
      )}

      {currentView === 'boutiques' && (
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Geri Dön</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Tüm Butikler</h1>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {MOCK_BOUTIQUES.map(boutique => (
                <button
                  key={boutique.id}
                  onClick={() => handleBoutiqueClick(boutique)}
                  className="text-left group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-4">
                    <img src={boutique.banner} alt={boutique.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{boutique.name}</h3>
                    {boutique.verified && <BadgeCheck className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-sm text-gray-500">{boutique.followers} takipçi</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentView === 'about' && (
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Geri Dön</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Hakkımızda</h1>
            <p className="text-gray-500">Hakkımızda sayfası yapım aşamasında...</p>
          </div>
        </div>
      )}

      {currentView === 'help' && (
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Geri Dön</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Yardım Merkezi</h1>
            <p className="text-gray-500">Yardım sayfası yapım aşamasında...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

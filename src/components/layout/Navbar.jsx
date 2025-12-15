import {
    Heart,
    LogOut,
    Menu,
    MessageCircle,
    Search,
    ShoppingBag,
    Star,
    User,
    X
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LogoutModal from '../common/LogoutModal';
import MiniCart from '../common/MiniCart';

const Navbar = ({ cartCount = 0, favoritesCount = 0 }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState('women');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    setShowLogoutModal(false);
    setOpenDropdown(null);
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserDisplayName = () => {
    if (!user) return 'Misafir';
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.name) return user.name;
    return user.email?.split('@')[0] || 'Kullanıcı';
  };

  return (
    <>
      {/* Top Header Bar */}
      <div className="hidden lg:block bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-8">
            <div className="flex items-center space-x-6 text-xs">
              <Link to="/partnership" className="text-gray-600 hover:text-purple-600 transition-colors">
                Butiks'te Satış Yap
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
                Hakkımızda
              </Link>
              <Link to="/faq" className="text-gray-600 hover:text-purple-600 transition-colors">
                Yardım & Destek
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl font-bold tracking-tight text-gray-900 flex-shrink-0"
              onClick={closeMobileMenu}
            >
              BUTIKS
            </Link>

            {/* Search Bar - Desktop */}
            <div className="flex-1 max-w-2xl hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Aradığınız ürün, kategori veya markayı yazınız"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400 hover:text-purple-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* Actions - Right Side */}
            <div className="flex items-center space-x-1">
              {/* Mobile Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Account Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setOpenDropdown('account')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex flex-col items-center px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="text-[10px] text-gray-600 mt-0.5 hidden lg:block">Hesabım</span>
                </button>
                
                {openDropdown === 'account' && (
                  <div className="absolute top-full right-0 w-60 bg-white shadow-xl rounded-lg p-2 animate-fade-in border border-gray-200">
                    {isAuthenticated ? (
                      <>
                        <div className="px-3 py-3 border-b border-gray-200 mb-2">
                          <p className="text-sm font-semibold text-gray-900">{getUserDisplayName()}</p>
                          <p className="text-xs text-gray-500">{user?.email || 'Hesap Sahibi'}</p>
                        </div>
                        <Link to="/orders" className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-md transition-colors">
                          <ShoppingBag className="w-4 h-4" />
                          <span>Tüm Siparişlerim</span>
                        </Link>
                        <Link to="/reviews" className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-md transition-colors">
                          <Star className="w-4 h-4" />
                          <span>Değerlendirmelerim</span>
                        </Link>
                        <Link to="/messages" className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-md transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>Satıcı Mesajlarım</span>
                        </Link>
                        <Link to="/account" className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-md transition-colors">
                          <User className="w-4 h-4" />
                          <span>Kullanıcı Bilgilerim</span>
                        </Link>
                        <div className="border-t border-gray-200 my-2"></div>
                        <button onClick={() => setShowLogoutModal(true)} className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors w-full">
                          <LogOut className="w-4 h-4" />
                          <span>Çıkış Yap</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-3 py-3 border-b border-gray-200 mb-2">
                          <p className="text-sm font-semibold text-gray-900">Hoş Geldiniz!</p>
                          <p className="text-xs text-gray-500">Hesabınıza giriş yapın</p>
                        </div>
                        <Link to="/login" className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors mb-2">
                          <User className="w-4 h-4" />
                          <span>Giriş Yap</span>
                        </Link>
                        <Link to="/register" className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors">
                          <span>Üye Ol</span>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Favorites */}
              <Link
                to="/favorites"
                className="flex flex-col items-center px-3 py-2 rounded-md hover:bg-gray-50 transition-colors relative"
              >
                <Heart className="w-5 h-5 text-gray-700" />
                <span className="text-[10px] text-gray-600 mt-0.5 hidden lg:block">Favorilerim</span>
                {favoritesCount > 0 && (
                  <span className="absolute top-1 right-1 bg-purple-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsMiniCartOpen(true)}
                className="flex flex-col items-center px-3 py-2 rounded-md hover:bg-gray-50 transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                <span className="text-[10px] text-gray-600 mt-0.5 hidden lg:block">Sepetim</span>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-purple-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="py-3 border-t border-gray-200 lg:hidden">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  autoFocus
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Navigation Bar */}
      <div 
        className="hidden lg:block sticky top-16 z-40"
        onMouseEnter={() => setShowAllCategories(true)}
        onMouseLeave={() => setShowAllCategories(false)}
      >
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 h-12">
            {/* Tüm Kategoriler Button */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                <Menu className="w-4 h-4" />
                <span>TÜM KATEGORİLER</span>
                <span className="ml-2 text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded">Yeni</span>
              </button>
            </div>

            {/* Category Links */}
            <Link to="/shop/women" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Kadın
            </Link>
            <Link to="/shop/men" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Erkek
            </Link>
            <Link to="/shop/streetwear" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Streetwear
            </Link>
            <Link to="/shop/vintage" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Vintage
            </Link>
            <Link to="/shop/y2k" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Y2K
            </Link>
            <Link to="/shop/minimalist" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Minimalist
            </Link>
            <Link to="/shop/denim" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Denim
            </Link>
            <Link to="/shop/shoes" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Ayakkabı
            </Link>
            <Link to="/shop/bags" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Çanta
            </Link>
            <Link to="/best-sellers" className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              <span>Çok Satanlar</span>
              <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded">Yeni</span>
            </Link>
          </div>
          </div>
        </nav>
        
        {/* Mega Menu - Outside nav but inside sticky container */}
        {showAllCategories && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-2xl animate-fade-in border-t border-gray-200 z-50">
            <div className="max-w-7xl mx-auto">
              <div className="flex min-h-[400px]">
                {/* Left Side - Category List */}
                <div className="w-64 bg-gray-50 border-r border-gray-200 py-4">
                  <button
                    onMouseEnter={() => setActiveCategory('women')}
                    className={`w-full px-5 py-3 text-left text-sm font-medium transition-colors flex items-center justify-between ${activeCategory === 'women' ? 'bg-white text-purple-600 border-l-4 border-purple-600' : 'text-gray-700 hover:bg-white'}`}
                  >
                    <span>Kadın</span>
                    <span>›</span>
                  </button>
                  <button
                    onMouseEnter={() => setActiveCategory('men')}
                    className={`w-full px-5 py-3 text-left text-sm font-medium transition-colors flex items-center justify-between ${activeCategory === 'men' ? 'bg-white text-purple-600 border-l-4 border-purple-600' : 'text-gray-700 hover:bg-white'}`}
                  >
                    <span>Erkek</span>
                    <span>›</span>
                  </button>
                  <button
                    onMouseEnter={() => setActiveCategory('streetwear')}
                    className={`w-full px-5 py-3 text-left text-sm font-medium transition-colors flex items-center justify-between ${activeCategory === 'streetwear' ? 'bg-white text-purple-600 border-l-4 border-purple-600' : 'text-gray-700 hover:bg-white'}`}
                  >
                    <span>Streetwear</span>
                    <span>›</span>
                  </button>
                  <button
                    onMouseEnter={() => setActiveCategory('vintage')}
                    className={`w-full px-5 py-3 text-left text-sm font-medium transition-colors flex items-center justify-between ${activeCategory === 'vintage' ? 'bg-white text-purple-600 border-l-4 border-purple-600' : 'text-gray-700 hover:bg-white'}`}
                  >
                    <span>Vintage</span>
                    <span>›</span>
                  </button>
                  <button
                    onMouseEnter={() => setActiveCategory('y2k')}
                    className={`w-full px-5 py-3 text-left text-sm font-medium transition-colors flex items-center justify-between ${activeCategory === 'y2k' ? 'bg-white text-purple-600 border-l-4 border-purple-600' : 'text-gray-700 hover:bg-white'}`}
                  >
                    <span>Y2K</span>
                    <span>›</span>
                  </button>
                  <button
                    onMouseEnter={() => setActiveCategory('minimalist')}
                    className={`w-full px-5 py-3 text-left text-sm font-medium transition-colors flex items-center justify-between ${activeCategory === 'minimalist' ? 'bg-white text-purple-600 border-l-4 border-purple-600' : 'text-gray-700 hover:bg-white'}`}
                  >
                    <span>Minimalist</span>
                    <span>›</span>
                  </button>
                  <button
                    onMouseEnter={() => setActiveCategory('denim')}
                    className={`w-full px-5 py-3 text-left text-sm font-medium transition-colors flex items-center justify-between ${activeCategory === 'denim' ? 'bg-white text-purple-600 border-l-4 border-purple-600' : 'text-gray-700 hover:bg-white'}`}
                  >
                    <span>Denim</span>
                    <span>›</span>
                  </button>
                  <button
                    onMouseEnter={() => setActiveCategory('shoes')}
                    className={`w-full px-5 py-3 text-left text-sm font-medium transition-colors flex items-center justify-between ${activeCategory === 'shoes' ? 'bg-white text-purple-600 border-l-4 border-purple-600' : 'text-gray-700 hover:bg-white'}`}
                  >
                    <span>Ayakkabı</span>
                    <span>›</span>
                  </button>
                  <button
                    onMouseEnter={() => setActiveCategory('bags')}
                    className={`w-full px-5 py-3 text-left text-sm font-medium transition-colors flex items-center justify-between ${activeCategory === 'bags' ? 'bg-white text-purple-600 border-l-4 border-purple-600' : 'text-gray-700 hover:bg-white'}`}
                  >
                    <span>Çanta</span>
                    <span>›</span>
                  </button>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    to="/best-sellers"
                    className="w-full px-5 py-3 text-left text-sm font-medium text-gray-700 hover:bg-white transition-colors flex items-center justify-between"
                    onClick={() => setShowAllCategories(false)}
                  >
                    <span>Çok Satanlar</span>
                    <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded">Yeni</span>
                  </Link>
                </div>

                {/* Right Side - Subcategories */}
                <div className="flex-1 p-8 bg-white">
                  {activeCategory === 'women' && (
                    <div className="grid grid-cols-4 gap-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 text-purple-600 text-base">Giyim</h4>
                        <ul className="space-y-2.5 text-sm text-gray-700">
                          <li><Link to="/shop/women/tshirt" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Tişört</Link></li>
                          <li><Link to="/shop/women/dress" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Elbise</Link></li>
                          <li><Link to="/shop/women/jeans" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Kot Pantolon</Link></li>
                          <li><Link to="/shop/women/jacket" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Ceket</Link></li>
                          <li><Link to="/shop/women/sweater" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Kazak</Link></li>
                          <li><Link to="/shop/women/skirt" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Etek</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 text-purple-600 text-base">Ayakkabı</h4>
                        <ul className="space-y-2.5 text-sm text-gray-700">
                          <li><Link to="/shop/women/shoes" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Tüm Ayakkabılar</Link></li>
                          <li><Link to="/shop/women/sneakers" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Sneaker</Link></li>
                          <li><Link to="/shop/women/heels" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Topuklu</Link></li>
                          <li><Link to="/shop/women/boots" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Bot</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 text-purple-600 text-base">Çanta</h4>
                        <ul className="space-y-2.5 text-sm text-gray-700">
                          <li><Link to="/shop/women/bags" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Tüm Çantalar</Link></li>
                          <li><Link to="/shop/women/shoulder-bags" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Omuz Çantası</Link></li>
                          <li><Link to="/shop/women/handbags" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">El Çantası</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 text-purple-600 text-base">Aksesuar</h4>
                        <ul className="space-y-2.5 text-sm text-gray-700">
                          <li><Link to="/shop/women/jewelry" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Takı</Link></li>
                          <li><Link to="/shop/women/watch" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Saat</Link></li>
                          <li><Link to="/shop/women/scarf" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Atkı & Şapka</Link></li>
                          <li><Link to="/shop/women/sunglasses" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Güneş Gözlüğü</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {activeCategory === 'men' && (
                    <div className="grid grid-cols-4 gap-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 text-purple-600 text-base">Giyim</h4>
                        <ul className="space-y-2.5 text-sm text-gray-700">
                          <li><Link to="/shop/men/tshirt" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Tişört</Link></li>
                          <li><Link to="/shop/men/shirt" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Gömlek</Link></li>
                          <li><Link to="/shop/men/pants" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Pantolon</Link></li>
                          <li><Link to="/shop/men/jeans" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Kot Pantolon</Link></li>
                          <li><Link to="/shop/men/jacket" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Ceket</Link></li>
                          <li><Link to="/shop/men/hoodie" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Sweatshirt</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 text-purple-600 text-base">Ayakkabı</h4>
                        <ul className="space-y-2.5 text-sm text-gray-700">
                          <li><Link to="/shop/men/shoes" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Tüm Ayakkabılar</Link></li>
                          <li><Link to="/shop/men/sneakers" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Sneaker</Link></li>
                          <li><Link to="/shop/men/boots" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Bot</Link></li>
                          <li><Link to="/shop/men/casual" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Günlük Ayakkabı</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 text-purple-600 text-base">Çanta</h4>
                        <ul className="space-y-2.5 text-sm text-gray-700">
                          <li><Link to="/shop/men/bags" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Tüm Çantalar</Link></li>
                          <li><Link to="/shop/men/backpack" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Sırt Çantası</Link></li>
                          <li><Link to="/shop/men/messenger" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Postacı Çantası</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 text-purple-600 text-base">Aksesuar</h4>
                        <ul className="space-y-2.5 text-sm text-gray-700">
                          <li><Link to="/shop/men/belts" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Kemer</Link></li>
                          <li><Link to="/shop/men/wallet" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Cüzdan</Link></li>
                          <li><Link to="/shop/men/watch" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Saat</Link></li>
                          <li><Link to="/shop/men/sunglasses" onClick={() => setShowAllCategories(false)} className="hover:text-purple-600 transition-colors">Güneş Gözlüğü</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {['streetwear', 'vintage', 'y2k', 'minimalist', 'denim', 'shoes', 'bags'].includes(activeCategory) && (
                    <div className="flex items-center justify-center py-12">
                      <Link 
                        to={`/shop/${activeCategory}`}
                        onClick={() => setShowAllCategories(false)}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                      >
                        <span>
                          {activeCategory === 'streetwear' ? 'Streetwear' : 
                           activeCategory === 'vintage' ? 'Vintage' : 
                           activeCategory === 'y2k' ? 'Y2K' : 
                           activeCategory === 'minimalist' ? 'Minimalist' : 
                           activeCategory === 'denim' ? 'Denim' : 
                           activeCategory === 'shoes' ? 'Ayakkabı' : 'Çanta'} Kategorisine Git
                        </span>
                        <span>→</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Menü</h2>
                <button onClick={closeMobileMenu}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <Link to="/shop/women" onClick={closeMobileMenu} className="block py-3 text-base font-medium border-b">
                Kadın
              </Link>
              <Link to="/shop/men" onClick={closeMobileMenu} className="block py-3 text-base font-medium border-b">
                Erkek
              </Link>
              <Link to="/shop/streetwear" onClick={closeMobileMenu} className="block py-3 text-base font-medium border-b">
                Streetwear
              </Link>
              <Link to="/shop/vintage" onClick={closeMobileMenu} className="block py-3 text-base font-medium border-b">
                Vintage
              </Link>
              <Link to="/shop/y2k" onClick={closeMobileMenu} className="block py-3 text-base font-medium border-b">
                Y2K
              </Link>
              <Link to="/shop/minimalist" onClick={closeMobileMenu} className="block py-3 text-base font-medium border-b">
                Minimalist
              </Link>
              <Link to="/shop/denim" onClick={closeMobileMenu} className="block py-3 text-base font-medium border-b">
                Denim
              </Link>
              <Link to="/shop/shoes" onClick={closeMobileMenu} className="block py-3 text-base font-medium border-b">
                Ayakkabı
              </Link>
              <Link to="/shop/bags" onClick={closeMobileMenu} className="block py-3 text-base font-medium border-b">
                Çanta
              </Link>
              <Link to="/best-sellers" onClick={closeMobileMenu} className="block py-3 text-base font-medium border-b">
                Çok Satanlar
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Mini Cart */}
      <MiniCart isOpen={isMiniCartOpen} onClose={() => setIsMiniCartOpen(false)} />

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;

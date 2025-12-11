import {
  ChevronDown,
  Heart,
  Home,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryStructure } from '../../data/categories';
import MiniCart from '../common/MiniCart';

const Navbar = ({ cartCount = 0, favoritesCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState(null);

  // Kategori verilerini dönüştür (navbar formatına)
  const navbarCategories = {
    women: {
      title: categoryStructure.women.title,
      slug: categoryStructure.women.slug,
      sections: Object.values(categoryStructure.women.subcategories).map(sub => ({
        title: sub.title,
        slug: sub.slug,
        items: sub.items
      }))
    },
    men: {
      title: categoryStructure.men.title,
      slug: categoryStructure.men.slug,
      sections: Object.values(categoryStructure.men.subcategories).map(sub => ({
        title: sub.title,
        slug: sub.slug,
        items: sub.items
      }))
    },
    accessories: {
      title: categoryStructure.accessories.title,
      slug: categoryStructure.accessories.slug,
      sections: Object.values(categoryStructure.accessories.subcategories).map(sub => ({
        title: sub.title,
        slug: sub.slug,
        items: sub.items
      }))
    },
    shoes: {
      title: categoryStructure.shoes.title,
      slug: categoryStructure.shoes.slug,
      sections: Object.values(categoryStructure.shoes.subcategories).map(sub => ({
        title: sub.title,
        slug: sub.slug,
        items: sub.items
      }))
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            
            {/* Left: Hamburger Menu (Mobile) & Logo (Desktop) */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {/* Logo - Left on desktop, center on mobile */}
              <Link 
                to="/" 
                className="hidden lg:block text-2xl font-bold tracking-tight"
                onClick={closeMobileMenu}
              >
                <span>BUTIKS</span>
              </Link>
            </div>

            {/* Center: Logo (Mobile Only) */}
            <Link 
              to="/" 
              className="lg:hidden absolute left-1/2 transform -translate-x-1/2 text-xl font-bold tracking-tight"
              onClick={closeMobileMenu}
            >
              <span>BUTIKS</span>
            </Link>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              {/* Kadın Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setOpenDropdown('women')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link 
                  to={`/shop/${navbarCategories.women.slug}`}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <span>{navbarCategories.women.title}</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>
                
                {openDropdown === 'women' && (
                  <div className="absolute top-full left-0 w-[600px] bg-white shadow-xl rounded-lg mt-0 p-6 animate-fade-in border border-gray-200">
                    <div className="grid grid-cols-3 gap-6">
                      {navbarCategories.women.sections.map((section, idx) => (
                        <div key={idx}>
                          <Link 
                            to={`/shop/${navbarCategories.women.slug}/${section.slug}`}
                            className="font-semibold text-gray-900 mb-3 hover:text-indigo-600 transition-colors block"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {section.title}
                          </Link>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link 
                                  to={`/shop/${navbarCategories.women.slug}/${section.slug}/${item.slug}`}
                                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Erkek Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setOpenDropdown('men')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link 
                  to={`/shop/${navbarCategories.men.slug}`}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <span>{navbarCategories.men.title}</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>
                
                {openDropdown === 'men' && (
                  <div className="absolute top-full left-0 w-[600px] bg-white shadow-xl rounded-lg mt-0 p-6 animate-fade-in border border-gray-200">
                    <div className="grid grid-cols-3 gap-6">
                      {navbarCategories.men.sections.map((section, idx) => (
                        <div key={idx}>
                          <Link 
                            to={`/shop/${navbarCategories.men.slug}/${section.slug}`}
                            className="font-semibold text-gray-900 mb-3 hover:text-indigo-600 transition-colors block"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {section.title}
                          </Link>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link 
                                  to={`/shop/${navbarCategories.men.slug}/${section.slug}/${item.slug}`}
                                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Aksesuar Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setOpenDropdown('accessories')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link 
                  to={`/shop/${navbarCategories.accessories.slug}`}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <span>{navbarCategories.accessories.title}</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>
                
                {openDropdown === 'accessories' && (
                  <div className="absolute top-full left-0 w-[600px] bg-white shadow-xl rounded-lg mt-0 p-6 animate-fade-in border border-gray-200">
                    <div className="grid grid-cols-3 gap-6">
                      {navbarCategories.accessories.sections.map((section, idx) => (
                        <div key={idx}>
                          <Link 
                            to={`/shop/${navbarCategories.accessories.slug}/${section.slug}`}
                            className="font-semibold text-gray-900 mb-3 hover:text-indigo-600 transition-colors block"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {section.title}
                          </Link>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link 
                                  to={`/shop/${navbarCategories.accessories.slug}/${section.slug}/${item.slug}`}
                                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Ayakkabı Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setOpenDropdown('shoes')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link 
                  to={`/shop/${navbarCategories.shoes.slug}`}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <span>{navbarCategories.shoes.title}</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>
                
                {openDropdown === 'shoes' && (
                  <div className="absolute top-full left-0 w-[600px] bg-white shadow-xl rounded-lg mt-0 p-6 animate-fade-in border border-gray-200">
                    <div className="grid grid-cols-3 gap-6">
                      {navbarCategories.shoes.sections.map((section, idx) => (
                        <div key={idx}>
                          <Link 
                            to={`/shop/${navbarCategories.shoes.slug}/${section.slug}`}
                            className="font-semibold text-gray-900 mb-3 hover:text-indigo-600 transition-colors block"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {section.title}
                          </Link>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link 
                                  to={`/shop/${navbarCategories.shoes.slug}/${section.slug}/${item.slug}`}
                                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Diğer Linkler */}
              <Link 
                to="/new-arrivals" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Yeni Ürünler
              </Link>
              <Link 
                to="/sale" 
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                İndirim
              </Link>
              <Link 
                to="/style-finder" 
                className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all transform hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Stilini Bul</span>
              </Link>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Favorites */}
              <Link
                to="/favorites"
                className="relative p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Cart - Opens MiniCart */}
              <button
                onClick={() => setIsMiniCartOpen(true)}
                className="relative p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account */}
              <Link
                to="/account"
                className="hidden sm:flex p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="User account"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Search Bar (Expandable) */}
          {isSearchOpen && (
            <div className="py-4 border-t border-gray-200 animate-fade-in">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ürün, marka, kategori ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden animate-fade-in"
            onClick={closeMobileMenu}
          />
          
          {/* Drawer */}
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-white z-50 lg:hidden overflow-y-auto animate-slide-in">
            <nav className="p-6 space-y-4">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 text-lg font-medium text-gray-900 py-3 border-b border-gray-200"
              >
                <Home className="w-5 h-5" />
                <span>Ana Sayfa</span>
              </Link>

              {/* Kadın Kategorisi - Mobile */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setMobileOpenCategory(mobileOpenCategory === 'women' ? null : 'women')}
                  className="flex items-center justify-between w-full text-lg font-medium text-gray-900 py-3"
                >
                  <span>{navbarCategories.women.title}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileOpenCategory === 'women' ? 'rotate-180' : ''}`} />
                </button>
                {mobileOpenCategory === 'women' && (
                  <div className="pl-4 pb-3 space-y-3">
                    {navbarCategories.women.sections.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">{section.title}</h4>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link
                                to={`/shop/${navbarCategories.women.slug}/${section.slug}/${item.slug}`}
                                onClick={closeMobileMenu}
                                className="text-sm text-gray-600 hover:text-indigo-600"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Erkek Kategorisi - Mobile */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setMobileOpenCategory(mobileOpenCategory === 'men' ? null : 'men')}
                  className="flex items-center justify-between w-full text-lg font-medium text-gray-900 py-3"
                >
                  <span>{navbarCategories.men.title}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileOpenCategory === 'men' ? 'rotate-180' : ''}`} />
                </button>
                {mobileOpenCategory === 'men' && (
                  <div className="pl-4 pb-3 space-y-3">
                    {navbarCategories.men.sections.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">{section.title}</h4>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link
                                to={`/shop/${navbarCategories.men.slug}/${section.slug}/${item.slug}`}
                                onClick={closeMobileMenu}
                                className="text-sm text-gray-600 hover:text-indigo-600"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Aksesuar Kategorisi - Mobile */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setMobileOpenCategory(mobileOpenCategory === 'accessories' ? null : 'accessories')}
                  className="flex items-center justify-between w-full text-lg font-medium text-gray-900 py-3"
                >
                  <span>{navbarCategories.accessories.title}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileOpenCategory === 'accessories' ? 'rotate-180' : ''}`} />
                </button>
                {mobileOpenCategory === 'accessories' && (
                  <div className="pl-4 pb-3 space-y-3">
                    {navbarCategories.accessories.sections.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">{section.title}</h4>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link
                                to={`/shop/${navbarCategories.accessories.slug}/${section.slug}/${item.slug}`}
                                onClick={closeMobileMenu}
                                className="text-sm text-gray-600 hover:text-indigo-600"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ayakkabı Kategorisi - Mobile */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setMobileOpenCategory(mobileOpenCategory === 'shoes' ? null : 'shoes')}
                  className="flex items-center justify-between w-full text-lg font-medium text-gray-900 py-3"
                >
                  <span>{navbarCategories.shoes.title}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileOpenCategory === 'shoes' ? 'rotate-180' : ''}`} />
                </button>
                {mobileOpenCategory === 'shoes' && (
                  <div className="pl-4 pb-3 space-y-3">
                    {navbarCategories.shoes.sections.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">{section.title}</h4>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link
                                to={`/shop/${navbarCategories.shoes.slug}/${section.slug}/${item.slug}`}
                                onClick={closeMobileMenu}
                                className="text-sm text-gray-600 hover:text-indigo-600"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Link
                to="/new-arrivals"
                onClick={closeMobileMenu}
                className="block text-lg font-medium text-gray-900 py-3 border-b border-gray-200"
              >
                Yeni Ürünler
              </Link>
              
              <Link
                to="/sale"
                onClick={closeMobileMenu}
                className="block text-lg font-medium text-red-600 py-3 border-b border-gray-200"
              >
                İndirim
              </Link>
              
              <Link
                to="/style-finder"
                onClick={closeMobileMenu}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-lg font-semibold py-3 rounded-full hover:shadow-lg transition-all"
              >
                <Sparkles className="w-5 h-5" />
                <span>Stilini Bul</span>
              </Link>
              
              <Link
                to="/account"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 text-lg font-medium text-gray-900 py-3"
              >
                <User className="w-5 h-5" />
                <span>Hesabım</span>
              </Link>
            </nav>
          </div>
        </>
      )}

      {/* Mini Cart Drawer */}
      <MiniCart 
        isOpen={isMiniCartOpen} 
        onClose={() => setIsMiniCartOpen(false)} 
      />
    </>
  );
};

export default Navbar;

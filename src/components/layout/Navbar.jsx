import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X,
  Home,
  Store
} from 'lucide-react';
import MiniCart from '../common/MiniCart';

const Navbar = ({ cartCount = 0, favoritesCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

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
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Hamburger Menu (Mobile) */}
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

            {/* Center: Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-2xl font-bold tracking-tight"
              onClick={closeMobileMenu}
            >
              <Store className="w-8 h-8" />
              <span className="hidden sm:inline">BUTIKS</span>
            </Link>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/" 
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link 
                to="/shop" 
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Shop
              </Link>
              <Link 
                to="/categories" 
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Categories
              </Link>
              <Link 
                to="/new-arrivals" 
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                New Arrivals
              </Link>
              <Link 
                to="/sale" 
                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                Sale
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
                  placeholder="Search products, brands, categories..."
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
            <nav className="p-6 space-y-6">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 text-lg font-medium text-gray-900 py-3 border-b border-gray-200"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              
              <Link
                to="/shop"
                onClick={closeMobileMenu}
                className="block text-lg font-medium text-gray-900 py-3 border-b border-gray-200"
              >
                Shop
              </Link>
              
              <Link
                to="/categories"
                onClick={closeMobileMenu}
                className="block text-lg font-medium text-gray-900 py-3 border-b border-gray-200"
              >
                Categories
              </Link>
              
              <Link
                to="/new-arrivals"
                onClick={closeMobileMenu}
                className="block text-lg font-medium text-gray-900 py-3 border-b border-gray-200"
              >
                New Arrivals
              </Link>
              
              <Link
                to="/sale"
                onClick={closeMobileMenu}
                className="block text-lg font-medium text-red-600 py-3 border-b border-gray-200"
              >
                Sale
              </Link>
              
              <Link
                to="/account"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 text-lg font-medium text-gray-900 py-3"
              >
                <User className="w-5 h-5" />
                <span>My Account</span>
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

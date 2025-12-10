import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Toast from './components/common/Toast';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import { ShopProvider, useShop } from './context/ShopContext';
import AboutPage from './pages/AboutPage';
import AccountPage from './pages/AccountPage';
import AuthPage from './pages/AuthPage';
import CareersPage from './pages/CareersPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPageNew from './pages/CheckoutPageNew';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import PartnershipPage from './pages/PartnershipPage';
import PrivacyPage from './pages/PrivacyPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShippingPage from './pages/ShippingPage';
import ShopPage from './pages/ShopPage';
import SizeGuidePage from './pages/SizeGuidePage';
import StyleFinderPage from './pages/StyleFinderPage';
import TermsPage from './pages/TermsPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const { getCartCount, favorites, toast, showToast } = useShop();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar cartCount={getCartCount()} favoritesCount={favorites.length} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          
          {/* Dinamik Kategori Route'ları */}
          <Route path="/shop/:gender" element={<CategoryPage />} />
          <Route path="/shop/:gender/:category" element={<CategoryPage />} />
          <Route path="/shop/:gender/:category/:subcategory" element={<CategoryPage />} />
          
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/wishlist" element={<FavoritesPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPageNew />} />
          <Route path="/style-finder" element={<StyleFinderPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/new-arrivals" element={<ShopPage />} />
          <Route path="/sale" element={<ShopPage />} />
          <Route path="/categories" element={<ShopPage />} />
          
          {/* Information Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/size-guide" element={<SizeGuidePage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/orders" element={<OrderTrackingPage />} />
          <Route path="/partnership" element={<PartnershipPage />} />
          <Route path="/partner" element={<PartnershipPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => showToast(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </Router>
  );
}

export default App;

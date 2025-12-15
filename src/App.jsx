import { useEffect } from 'react';
import { Outlet, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Toast from './components/common/Toast';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider, useShop } from './context/ShopContextNew';
import AboutPage from './pages/AboutPage';
import AccountPage from './pages/AccountPage';
import AuthPage from './pages/AuthPage';
import BestSellersPage from './pages/BestSellersPage';
import CareersPage from './pages/CareersPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPageNew from './pages/CheckoutPageNew';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import MessagesPage from './pages/MessagesPage';
import OrdersPage from './pages/OrdersPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import PartnershipPage from './pages/PartnershipPage';
import PrivacyPage from './pages/PrivacyPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ReviewsPage from './pages/ReviewsPage';
import ShippingPage from './pages/ShippingPage';
import ShopPage from './pages/ShopPage';
import SizeGuidePage from './pages/SizeGuidePage';
import StyleFinderPage from './pages/StyleFinderPage';
import TermsPage from './pages/TermsPage';
import VendorOrderDetail from './pages/vendor/orders/VendorOrderDetail';
import VendorOrders from './pages/vendor/orders/VendorOrders';
import VendorCategories from './pages/vendor/products/VendorCategories';
import VendorProductCreate from './pages/vendor/products/VendorProductCreate';
import VendorProducts from './pages/vendor/products/VendorProducts';
import VendorAnalytics from './pages/vendor/VendorAnalytics';
import VendorCustomers from './pages/vendor/VendorCustomers';
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorFinance from './pages/vendor/VendorFinance';
import VendorHelp from './pages/vendor/VendorHelp';
import VendorLayout from './pages/vendor/VendorLayout';
import VendorMessages from './pages/vendor/VendorMessages';
import VendorSettings from './pages/vendor/VendorSettings';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Alışveriş Layout - Navbar ve Footer ile
function ShopLayout() {
  const { getCartItemsCount, wishlist } = useShop();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={getCartItemsCount()} favoritesCount={wishlist.length} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AppContent() {
  const { toast } = useShop();

  return (
    <>
      <ScrollToTop />
      {/* Toast Notifications */}
      {toast && <Toast message={toast.message} type={toast.type} />}
      
      <Routes>
        {/* Vendor Routes - Kendi layout'u ile, Navbar/Footer YOK */}
        <Route
          path="/vendor/*"
          element={
            <ProtectedRoute requiredRole="vendor">
              <VendorLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="products/new" element={<VendorProductCreate />} />
          <Route path="products/:id/edit" element={<VendorProductCreate />} />
          <Route path="products/categories" element={<VendorCategories />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="orders/:id" element={<VendorOrderDetail />} />
          <Route path="analytics" element={<VendorAnalytics />} />
          <Route path="finance" element={<VendorFinance />} />
          <Route path="customers" element={<VendorCustomers />} />
          <Route path="messages" element={<VendorMessages />} />
          <Route path="settings" element={<VendorSettings />} />
          <Route path="profile" element={<VendorSettings />} />
          <Route path="help" element={<VendorHelp />} />
        </Route>

        {/* Alışveriş Sayfaları - Navbar ve Footer ile */}
        <Route element={<ShopLayout />}>
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
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/best-sellers" element={<BestSellersPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPageNew />} />
          <Route path="/style-finder" element={<StyleFinderPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/auth" element={<AuthPage />} />
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
          <Route path="/order-tracking" element={<OrderTrackingPage />} />
          <Route path="/partnership" element={<PartnershipPage />} />
          <Route path="/partner" element={<PartnershipPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ShopProvider>
          <AppContent />
        </ShopProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Toast from './components/common/Toast';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';

// Placeholder pages
const FavoritesPage = () => (
  <div className="min-h-screen bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Favorites</h1>
      <p className="text-gray-600 mt-4">Your favorite items will appear here.</p>
    </div>
  </div>
);

const AccountPage = () => (
  <div className="min-h-screen bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
      <p className="text-gray-600 mt-4">Account management coming soon.</p>
    </div>
  </div>
);

const CheckoutPage = () => (
  <div className="min-h-screen bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      <p className="text-gray-600 mt-4">Checkout process coming soon.</p>
    </div>
  </div>
);

function AppContent() {
  const { getCartCount, favorites, toast, showToast } = useShop();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={getCartCount()} favoritesCount={favorites.length} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/new-arrivals" element={<ShopPage />} />
          <Route path="/sale" element={<ShopPage />} />
          <Route path="/categories" element={<ShopPage />} />
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

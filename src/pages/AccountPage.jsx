import {
    CheckCircle2,
    Clock,
    CreditCard,
    Download,
    Edit2,
    Eye,
    Heart,
    LogOut,
    MapPin,
    Package,
    Plus,
    Settings,
    ShoppingBag,
    Trash2,
    Truck,
    Upload,
    User
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useShop } from '../context/ShopContextNew';
import storage from '../utils/storage';

const AccountPage = () => {
  const navigate = useNavigate();
  const { favorites, showToast } = useShop();
  const [activeTab, setActiveTab] = useState('profile');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // User profile data
  const [userData, setUserData] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: null,
    memberSince: 'January 2024'
  });

  // Mock orders data
  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-12-05',
      total: 299.99,
      status: 'delivered',
      itemsCount: 3,
      trackingNumber: 'TRK1234567890',
      items: [
        { id: 1, name: 'Classic White T-Shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', price: 49.99, quantity: 2 },
        { id: 2, name: 'Denim Jacket', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', price: 199.99, quantity: 1 }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: '2024-12-01',
      total: 149.99,
      status: 'shipped',
      itemsCount: 2,
      trackingNumber: 'TRK0987654321',
      items: [
        { id: 3, name: 'Running Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', price: 149.99, quantity: 1 }
      ]
    },
    {
      id: 'ORD-2024-003',
      date: '2024-11-28',
      total: 89.99,
      status: 'processing',
      itemsCount: 1,
      trackingNumber: null,
      items: [
        { id: 4, name: 'Cotton Hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', price: 89.99, quantity: 1 }
      ]
    }
  ]);

  // Mock addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      isDefault: true,
      fullName: 'Jane Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 2,
      type: 'work',
      isDefault: false,
      fullName: 'Jane Doe',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zip: '10002',
      country: 'United States',
      phone: '+1 (555) 123-4567'
    }
  ]);

  // Check authentication
  useEffect(() => {
    const token = storage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    storage.removeItem('authToken');
    showToast('Logged out successfully', 'success');
    navigate('/');
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    showToast('Profile updated successfully', 'success');
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    showToast('Address deleted', 'success');
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    showToast('Default address updated', 'success');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
      shipped: { label: 'Shipped', color: 'bg-blue-100 text-blue-800', icon: Truck },
      processing: { label: 'Processing', color: 'bg-yellow-100 text-yellow-800', icon: Clock }
    };

    const config = statusConfig[status] || statusConfig.processing;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hesabım</h1>
          <p className="text-gray-600 mt-2">Profilinizi, siparişlerinizi ve tercihlerinizi yönetin</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-8">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                  {userData.avatar ? (
                    <img src={userData.avatar} alt={userData.firstName} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-indigo-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{userData.firstName} {userData.lastName}</h3>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible space-x-2 lg:space-x-0 lg:space-y-1 pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'profile' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profil
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'orders' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  Siparişler
                </button>

                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'wishlist' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  Favorilerim
                  {favorites.length > 0 && (
                    <span className="ml-auto bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'addresses' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  Adresler
                </button>

                <button
                  onClick={() => setActiveTab('payment')}
                  className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'payment' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Ödeme Yöntemleri
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Ayarlar
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  Çıkış Yap
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Profil Bilgileri</h2>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Profili Düzenle
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                        İptal
                      </Button>
                      <Button onClick={handleSaveProfile} size="sm">
                        Değişiklikleri Kaydet
                      </Button>
                    </div>
                  )}
                </div>

                {/* Avatar Upload */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Profil Fotoğrafı</label>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                      {userData.avatar ? (
                        <img src={userData.avatar} alt={userData.firstName} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-12 h-12 text-indigo-600" />
                      )}
                    </div>
                    {isEditing && (
                      <div>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Fotoğraf Yükle
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">JPG, PNG veya GIF (maks. 2MB)</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Form */}
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                      <input
                        type="text"
                        value={userData.firstName}
                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                      <input
                        type="text"
                        value={userData.lastName}
                        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresi</label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon Numarası</label>
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Üyelik tarihi: {userData.memberSince}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Siparişlerim</h2>
                
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Henüz sipariş yok</p>
                    <Button onClick={() => navigate('/shop')}>
                      Alışverişe Başla
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        {/* Order Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Order {order.id}</p>
                            <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>

                        {/* Order Items */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex -space-x-2">
                            {order.items.slice(0, 3).map((item, idx) => (
                              <img
                                key={idx}
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover border-2 border-white"
                              />
                            ))}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}</p>
                            <p className="text-sm text-gray-500">Total: ${order.total.toFixed(2)}</p>
                          </div>
                        </div>

                        {/* Order Actions */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Detayları Gör
                          </Button>
                          {order.trackingNumber && (
                            <Button variant="outline" size="sm">
                              <Truck className="w-4 h-4 mr-2" />
                              Siparişi Takip Et
                            </Button>
                          )}
                          {order.status === 'delivered' && (
                            <>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Fatura
                              </Button>
                              <Button variant="outline" size="sm">
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Tekrar Sipariş Ver
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Favori Listem</h2>
                
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Favori listeniz boş</p>
                    <Button onClick={() => navigate('/shop')}>
                      Ürünleri Keşfedin
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((product) => (
                      <div key={product.id} className="group relative border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div 
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="aspect-square overflow-hidden bg-gray-100 cursor-pointer"
                        >
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                          <p className="text-lg font-bold text-gray-900">{product.price}₺</p>
                          <Button 
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="w-full mt-3" 
                            size="sm"
                          >
                            Ürünü Gör
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Kaydedilmiş Adresler</h2>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Adres Ekle
                  </Button>
                </div>

                {addresses.length === 0 ? (
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Kaydedilmiş adres yok</p>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Adres Ekle
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                      <div key={address.id} className="border border-gray-200 rounded-lg p-6 relative">
                        {address.isDefault && (
                          <span className="absolute top-4 right-4 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded">
                            Varsayılan
                          </span>
                        )}
                        
                        <div className="mb-4">
                          <p className="font-semibold text-gray-900 mb-1">{address.fullName}</p>
                          <p className="text-sm text-gray-600">{address.street}</p>
                          <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zip}</p>
                          <p className="text-sm text-gray-600">{address.country}</p>
                          <p className="text-sm text-gray-600 mt-2">{address.phone}</p>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-gray-200">
                          <Button variant="outline" size="sm">
                            <Edit2 className="w-4 h-4 mr-2" />
                            Düzenle
                          </Button>
                          {!address.isDefault && (
                            <>
                              <Button 
                                onClick={() => handleSetDefaultAddress(address.id)}
                                variant="outline" 
                                size="sm"
                              >
                                Varsayılan Yap
                              </Button>
                              <Button 
                                onClick={() => handleDeleteAddress(address.id)}
                                variant="outline" 
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Ödeme Yöntemleri</h2>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Kart Ekle
                  </Button>
                </div>

                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Kaydedilmiş ödeme yöntemi yok</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Ödeme Yöntemi Ekle
                  </Button>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Hesap Ayarları</h2>

                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">E-posta Bildirimleri</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Sipariş güncellemeleri</span>
                        <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Promosyon e-postaları</span>
                        <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Yeni ürünler</span>
                        <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                      </label>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Şifre</h3>
                    <Button variant="outline">
                      Şifreyi Değiştir
                    </Button>
                  </div>

                  {/* Delete Account */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tehlikeli Bölge</h3>
                    <Button variant="outline" className="text-red-600 hover:text-red-700 hover:border-red-600">
                      Hesabı Sil
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">Hesabınızı sildiğinizde geri dönüş olmaz.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

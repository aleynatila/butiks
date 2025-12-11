import {
    AlertCircle,
    Bell,
    Camera,
    ExternalLink,
    Eye,
    Key,
    Lock,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Save,
    Store,
    User
} from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/ui/Button';
import VendorBreadcrumb from '../../components/vendor/layout/VendorBreadcrumb';

const VendorSettings = () => {
  const [activeTab, setActiveTab] = useState('shop');
  const [shopData, setShopData] = useState({
    name: 'My Fashion Store',
    description: 'Premium moda ürünleri ve en trend koleksiyonlar. Kaliteli ürünler, hızlı kargo, müşteri memnuniyeti odaklı hizmet.',
    email: 'vendor@butiks.com',
    phone: '+90 555 123 4567',
    address: 'Atatürk Cad. No:123',
    city: 'İstanbul',
    country: 'Türkiye',
    logo: null,
    banner: null,
  });

  const [notifications, setNotifications] = useState({
    orderEmail: true,
    orderPush: true,
    messageEmail: true,
    messagePush: true,
    reviewEmail: false,
    reviewPush: true,
    marketingEmail: false,
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  // Mock products for preview
  const mockProducts = [
    {
      id: 1,
      name: 'Beyaz Basic Tişört',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Slim Fit Kot Pantolon',
      price: 599.99,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Deri Ceket',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Spor Ayakkabı',
      price: 799.99,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      rating: 4.6,
    },
  ];

  const handleSaveShop = () => {
    console.log('Saving shop data:', shopData);
    // TODO: API call
  };

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notifications);
    // TODO: API call
  };

  const handleChangePassword = () => {
    console.log('Changing password');
    // TODO: API call
  };

  return (
    <div>
      {/* Breadcrumb */}
      <VendorBreadcrumb items={[{ label: 'Ayarlar' }]} />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mağaza Ayarları</h1>
        <p className="text-gray-600 mt-1">Mağaza bilgilerinizi ve hesap ayarlarınızı yönetin</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('shop')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === 'shop'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Store className="w-5 h-5" />
              Mağaza Bilgileri
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === 'preview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Eye className="w-5 h-5" />
              Mağaza Önizleme
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === 'notifications'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Bell className="w-5 h-5" />
              Bildirimler
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === 'security'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Lock className="w-5 h-5" />
              Güvenlik
            </button>
          </div>
        </div>

        {/* Shop Info Tab */}
        {activeTab === 'shop' && (
          <div className="p-6">
            <div className="max-w-3xl">
              {/* Logo & Banner */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Mağaza Görselleri</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                    <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                      <div className="text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-600">Logo Yükle</p>
                        <p className="text-xs text-gray-500 mt-1">200x200</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Banner</label>
                    <div className="relative w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                      <div className="text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-600">Banner Yükle</p>
                        <p className="text-xs text-gray-500 mt-1">1200x300</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shop Details */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Store className="w-4 h-4 inline mr-2" />
                    Mağaza Adı
                  </label>
                  <input
                    type="text"
                    value={shopData.name}
                    onChange={(e) => setShopData({ ...shopData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Mağaza adınızı girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea
                    value={shopData.description}
                    onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Mağazanız hakkında bilgi verin"
                  />
                  <p className="text-xs text-gray-500 mt-1">{shopData.description.length} / 500 karakter</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      İletişim E-posta
                    </label>
                    <input
                      type="email"
                      value={shopData.email}
                      onChange={(e) => setShopData({ ...shopData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="magaza@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={shopData.phone}
                      onChange={(e) => setShopData({ ...shopData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+90 555 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Adres
                  </label>
                  <input
                    type="text"
                    value={shopData.address}
                    onChange={(e) => setShopData({ ...shopData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Sokak, Cadde, No"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
                    <input
                      type="text"
                      value={shopData.city}
                      onChange={(e) => setShopData({ ...shopData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="İstanbul"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ülke</label>
                    <input
                      type="text"
                      value={shopData.country}
                      onChange={(e) => setShopData({ ...shopData, country: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Türkiye"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">İptal</Button>
                  <Button onClick={handleSaveShop}>
                    <Save className="w-4 h-4 mr-2" />
                    Kaydet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Store Preview Tab */}
        {activeTab === 'preview' && (
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              {/* Preview Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900">Mağazanız Müşterilere Böyle Görünüyor</h3>
                  <p className="text-sm text-gray-600 mt-1">Müşterilerin göreceği mağaza sayfasının önizlemesi</p>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Yeni Sekmede Aç
                </Button>
              </div>

              {/* Store Preview Container */}
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  {/* Banner */}
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <p className="text-white text-sm">Mağaza Banner Alanı (1200x300)</p>
                  </div>

                  {/* Store Header */}
                  <div className="p-6 border-b">
                    <div className="flex items-start gap-4">
                      {/* Logo */}
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Store className="w-8 h-8 text-gray-400" />
                      </div>
                      {/* Store Info */}
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">{shopData.name}</h2>
                        <p className="text-gray-600 mt-2">{shopData.description}</p>
                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{shopData.city}, {shopData.country}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Store className="w-4 h-4" />
                            <span>156 Ürün</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>2.5K Takipçi</span>
                          </div>
                        </div>
                      </div>
                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        <Button size="sm">Takip Et</Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Mesaj
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Ürünler</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {mockProducts.map((product) => (
                        <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="aspect-square bg-gray-200">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h4>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-lg font-bold text-gray-900">{product.price} ₺</span>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <span>⭐</span>
                                <span>{product.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Info */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium">Önizleme Notları:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Logo ve banner yükledikten sonra burada görünecek</li>
                      <li>Gerçek ürünleriniz bu bölümde listelenecek</li>
                      <li>İstatistikler (ürün sayısı, takipçi) otomatik güncellenecek</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="p-6">
            <div className="max-w-3xl">
              <div className="space-y-6">
                {/* Orders */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Siparişler</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">E-posta Bildirimleri</p>
                        <p className="text-sm text-gray-600">Yeni sipariş geldiğinde e-posta al</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.orderEmail}
                        onChange={(e) => setNotifications({ ...notifications, orderEmail: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">Push Bildirimleri</p>
                        <p className="text-sm text-gray-600">Yeni sipariş geldiğinde push al</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.orderPush}
                        onChange={(e) => setNotifications({ ...notifications, orderPush: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>

                {/* Messages */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Mesajlar</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">E-posta Bildirimleri</p>
                        <p className="text-sm text-gray-600">Yeni mesaj geldiğinde e-posta al</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.messageEmail}
                        onChange={(e) => setNotifications({ ...notifications, messageEmail: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">Push Bildirimleri</p>
                        <p className="text-sm text-gray-600">Yeni mesaj geldiğinde push al</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.messagePush}
                        onChange={(e) => setNotifications({ ...notifications, messagePush: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>

                {/* Reviews */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Yorumlar</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">E-posta Bildirimleri</p>
                        <p className="text-sm text-gray-600">Yeni yorum geldiğinde e-posta al</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.reviewEmail}
                        onChange={(e) => setNotifications({ ...notifications, reviewEmail: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">Push Bildirimleri</p>
                        <p className="text-sm text-gray-600">Yeni yorum geldiğinde push al</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.reviewPush}
                        onChange={(e) => setNotifications({ ...notifications, reviewPush: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-6 border-t">
                  <Button variant="outline">İptal</Button>
                  <Button onClick={handleSaveNotifications}>
                    <Save className="w-4 h-4 mr-2" />
                    Kaydet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="p-6">
            <div className="max-w-3xl">
              <h3 className="font-semibold text-gray-900 mb-4">Şifre Değiştir</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Key className="w-4 h-4 inline mr-2" />
                    Mevcut Şifre
                  </label>
                  <input
                    type="password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Mevcut şifrenizi girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre</label>
                  <input
                    type="password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Yeni şifrenizi girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre (Tekrar)</label>
                  <input
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Yeni şifrenizi tekrar girin"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    <div className="text-sm text-yellow-900">
                      <p className="font-medium mb-1">Güçlü Şifre Gereksinimleri:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>En az 8 karakter</li>
                        <li>En az bir büyük harf (A-Z)</li>
                        <li>En az bir küçük harf (a-z)</li>
                        <li>En az bir rakam (0-9)</li>
                        <li>En az bir özel karakter (!@#$%^&*)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">İptal</Button>
                  <Button onClick={handleChangePassword}>
                    <Lock className="w-4 h-4 mr-2" />
                    Şifreyi Güncelle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorSettings;

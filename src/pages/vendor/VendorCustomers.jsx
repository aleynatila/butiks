import {
    Calendar,
    DollarSign,
    Mail,
    MapPin,
    Phone,
    Search,
    ShoppingBag,
    Star,
    User
} from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/ui/Button';
import VendorBreadcrumb from '../../components/vendor/layout/VendorBreadcrumb';

const VendorCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Mock data
  const customers = [
    {
      id: 1,
      name: 'Ayşe Yılmaz',
      email: 'ayse@example.com',
      phone: '+90 555 111 2233',
      location: 'İstanbul, Türkiye',
      joinDate: '2025-01-15',
      orders: 12,
      totalSpent: 15680,
      avgOrderValue: 1307,
      lastOrder: '2025-12-11',
      segment: 'vip',
      status: 'active',
    },
    {
      id: 2,
      name: 'Mehmet Demir',
      email: 'mehmet@example.com',
      phone: '+90 555 222 3344',
      location: 'Ankara, Türkiye',
      joinDate: '2025-03-22',
      orders: 5,
      totalSpent: 4890,
      avgOrderValue: 978,
      lastOrder: '2025-12-08',
      segment: 'regular',
      status: 'active',
    },
    {
      id: 3,
      name: 'Elif Kaya',
      email: 'elif@example.com',
      phone: '+90 555 333 4455',
      location: 'İzmir, Türkiye',
      joinDate: '2025-06-10',
      orders: 1,
      totalSpent: 890,
      avgOrderValue: 890,
      lastOrder: '2025-11-25',
      segment: 'new',
      status: 'active',
    },
    {
      id: 4,
      name: 'Can Özdemir',
      email: 'can@example.com',
      phone: '+90 555 444 5566',
      location: 'Bursa, Türkiye',
      joinDate: '2024-11-05',
      orders: 8,
      totalSpent: 9240,
      avgOrderValue: 1155,
      lastOrder: '2025-08-20',
      segment: 'at-risk',
      status: 'inactive',
    },
  ];

  const segments = [
    { id: 'all', label: 'Tümü', count: customers.length },
    { id: 'vip', label: 'VIP Müşteriler', count: 1 },
    { id: 'regular', label: 'Düzenli', count: 1 },
    { id: 'new', label: 'Yeni', count: 1 },
    { id: 'at-risk', label: 'Risk Altında', count: 1 },
  ];

  const getSegmentBadge = (segment) => {
    const badges = {
      vip: { label: 'VIP', color: 'bg-purple-100 text-purple-700' },
      regular: { label: 'Düzenli', color: 'bg-blue-100 text-blue-700' },
      new: { label: 'Yeni', color: 'bg-green-100 text-green-700' },
      'at-risk': { label: 'Risk Altında', color: 'bg-red-100 text-red-700' },
    };
    return badges[segment] || badges.regular;
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = selectedSegment === 'all' || customer.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  return (
    <div>
      {/* Breadcrumb */}
      <VendorBreadcrumb items={[{ label: 'Müşteriler' }]} />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Müşteri Yönetimi</h1>
        <p className="text-gray-600 mt-1">Müşterilerinizi görüntüleyin ve yönetin</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <User className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{customers.length}</span>
          </div>
          <p className="text-sm text-gray-600">Toplam Müşteri</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">1</span>
          </div>
          <p className="text-sm text-gray-600">VIP Müşteri</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <ShoppingBag className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">26</span>
          </div>
          <p className="text-sm text-gray-600">Toplam Sipariş</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">₺30.7K</span>
          </div>
          <p className="text-sm text-gray-600">Toplam Gelir</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Filters */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Müşteri ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Segment Tabs */}
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {segments.map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => setSelectedSegment(segment.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedSegment === segment.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {segment.label} ({segment.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Customer List */}
            <div className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getSegmentBadge(customer.segment).color}`}>
                          {getSegmentBadge(customer.segment).label}
                        </span>
                        {customer.status === 'inactive' && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">İnaktif</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {customer.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {customer.location}
                        </span>
                      </div>
                      <div className="flex gap-6 text-sm">
                        <span className="text-gray-900">
                          <span className="font-semibold">{customer.orders}</span> Sipariş
                        </span>
                        <span className="text-gray-900">
                          <span className="font-semibold">₺{customer.totalSpent.toLocaleString()}</span> Harcama
                        </span>
                        <span className="text-gray-500">Son: {customer.lastOrder}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Detail */}
        <div>
          {selectedCustomer ? (
            <div className="bg-white rounded-lg border border-gray-200 sticky top-6">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{selectedCustomer.name}</h2>
                    <span className={`text-xs px-2 py-1 rounded-full ${getSegmentBadge(selectedCustomer.segment).color}`}>
                      {getSegmentBadge(selectedCustomer.segment).label}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${selectedCustomer.email}`} className="text-blue-600 hover:text-blue-700">
                      {selectedCustomer.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${selectedCustomer.phone}`} className="text-blue-600 hover:text-blue-700">
                      {selectedCustomer.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {selectedCustomer.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Üyelik: {selectedCustomer.joinDate}
                  </div>
                </div>

                <Button className="w-full mt-4">
                  <Mail className="w-4 h-4 mr-2" />
                  Mesaj Gönder
                </Button>
              </div>

              {/* Stats */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">İstatistikler</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Toplam Sipariş</span>
                    <span className="font-semibold text-gray-900">{selectedCustomer.orders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Toplam Harcama</span>
                    <span className="font-semibold text-gray-900">₺{selectedCustomer.totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ortalama Sipariş</span>
                    <span className="font-semibold text-gray-900">₺{selectedCustomer.avgOrderValue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Son Sipariş</span>
                    <span className="font-semibold text-gray-900">{selectedCustomer.lastOrder}</span>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="p-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Son Siparişler</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-900">#BT-20250001</span>
                      <span className="font-semibold text-gray-900">₺1,450</span>
                    </div>
                    <span className="text-xs text-gray-500">11 Aralık 2025</span>
                  </div>
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-900">#BT-20249998</span>
                      <span className="font-semibold text-gray-900">₺890</span>
                    </div>
                    <span className="text-xs text-gray-500">5 Aralık 2025</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Tüm Siparişleri Gör
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Detayları görmek için bir müşteri seçin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorCustomers;

import {
    BarChart3,
    Box,
    DollarSign,
    Package,
    ShoppingBag,
    TrendingUp,
    Users
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import VendorBreadcrumb from '../../components/vendor/layout/VendorBreadcrumb';
import { useAuth } from '../../context/AuthContext';

const VendorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    activeProducts: 0,
    totalCustomers: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch vendor stats and orders from API
    // Şimdilik mock data kullanıyoruz
    setTimeout(() => {
      setStats({
        totalProducts: 25,
        totalOrders: 142,
        totalRevenue: 45250,
        pendingOrders: 8,
        activeProducts: 23,
        totalCustomers: 89,
      });

      setRecentOrders([
        {
          id: 'BT-20250001',
          customer: 'Ayşe Yılmaz',
          total: 1450,
          status: 'pending',
          date: '2025-01-10',
        },
        {
          id: 'BT-20250002',
          customer: 'Mehmet Demir',
          total: 850,
          status: 'processing',
          date: '2025-01-10',
        },
        {
          id: 'BT-20250003',
          customer: 'Zeynep Kaya',
          total: 2350,
          status: 'shipped',
          date: '2025-01-09',
        },
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const StatCard = ({ icon: Icon, label, value, trend, color = 'blue' }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">{trend}%</span>
              <span className="text-xs text-gray-500 ml-1">bu ay</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    const labels = {
      pending: 'Bekliyor',
      processing: 'Hazırlanıyor',
      shipped: 'Kargoda',
      delivered: 'Teslim Edildi',
      cancelled: 'İptal',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <VendorBreadcrumb items={[{ label: 'Dashboard' }]} />

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Hoş geldiniz, <span className="font-semibold">{user?.name || 'Vendor'}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/vendor/products">
              <Button variant="outline" size="sm">
                <Package className="w-4 h-4 mr-2" />
                Ürünlerim
              </Button>
            </Link>
            <Link to="/vendor/products/new">
              <Button size="sm">
                <Box className="w-4 h-4 mr-2" />
                Yeni Ürün Ekle
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={ShoppingBag}
            label="Toplam Sipariş"
            value={stats.totalOrders}
            trend={12}
            color="blue"
          />
          <StatCard
            icon={DollarSign}
            label="Toplam Gelir"
            value={`₺${stats.totalRevenue.toLocaleString()}`}
            trend={8}
            color="green"
          />
          <StatCard
            icon={Package}
            label="Aktif Ürün"
            value={stats.activeProducts}
            color="purple"
          />
          <StatCard
            icon={Users}
            label="Müşteri"
            value={stats.totalCustomers}
            trend={15}
            color="orange"
          />
        </div>

        {/* Pending Orders Alert */}
        {stats.pendingOrders > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Package className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-yellow-900">
                  {stats.pendingOrders} bekleyen siparişiniz var
                </p>
                <p className="text-sm text-yellow-700">
                  Lütfen siparişleri kontrol edip onaylayın
                </p>
              </div>
              <Link to="/vendor/orders">
                <Button variant="outline" size="sm">
                  Siparişleri Gör
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Son Siparişler</h2>
                <Link to="/vendor/orders">
                  <Button variant="ghost" size="sm">
                    Tümünü Gör
                  </Button>
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Sipariş No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Müşteri
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Tutar
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Durum
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Tarih
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <Link
                            to={`/vendor/orders/${order.id}`}
                            className="font-medium text-blue-600 hover:text-blue-700"
                          >
                            {order.id}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{order.customer}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          ₺{order.total.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                        <td className="px-6 py-4 text-gray-600">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Hızlı İşlemler</h2>
              <div className="space-y-3">
                <Link to="/vendor/products/new">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Box className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Yeni Ürün Ekle</p>
                      <p className="text-xs text-gray-600">Kataloga ürün ekleyin</p>
                    </div>
                  </button>
                </Link>

                <Link to="/vendor/orders">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <ShoppingBag className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Siparişleri Yönet</p>
                      <p className="text-xs text-gray-600">Bekleyen siparişler</p>
                    </div>
                  </button>
                </Link>

                <Link to="/vendor/analytics">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Raporlar</p>
                      <p className="text-xs text-gray-600">Satış analizleri</p>
                    </div>
                  </button>
                </Link>

                <Link to="/vendor/profile">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Butik Ayarları</p>
                      <p className="text-xs text-gray-600">Profil ve bilgiler</p>
                    </div>
                  </button>
                </Link>
              </div>
            </div>

            {/* Vendor Info */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Butik Durumu</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-100">Durum:</span>
                  <span className="font-semibold">Aktif</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Komisyon:</span>
                  <span className="font-semibold">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Üyelik:</span>
                  <span className="font-semibold">Premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;

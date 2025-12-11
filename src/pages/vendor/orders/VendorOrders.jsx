import {
    Calendar,
    CheckCircle,
    Clock,
    Eye,
    Filter,
    Package,
    Search,
    Truck,
    XCircle
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import VendorBreadcrumb from '../../../components/vendor/layout/VendorBreadcrumb';

const VendorOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');

  // Mock orders data
  const orders = [
    {
      id: 'BT-20250001',
      customer: {
        name: 'Ayşe Yılmaz',
        email: 'ayse@example.com',
      },
      items: 3,
      total: 1450,
      status: 'pending',
      payment: 'paid',
      date: '2025-12-11 10:30',
      shippingAddress: 'İstanbul, Türkiye',
    },
    {
      id: 'BT-20250002',
      customer: {
        name: 'Mehmet Demir',
        email: 'mehmet@example.com',
      },
      items: 2,
      total: 850,
      status: 'processing',
      payment: 'paid',
      date: '2025-12-11 09:15',
      shippingAddress: 'Ankara, Türkiye',
    },
    {
      id: 'BT-20250003',
      customer: {
        name: 'Zeynep Kaya',
        email: 'zeynep@example.com',
      },
      items: 1,
      total: 699,
      status: 'shipped',
      payment: 'paid',
      date: '2025-12-10 16:45',
      shippingAddress: 'İzmir, Türkiye',
      trackingNumber: 'TRK123456789',
    },
    {
      id: 'BT-20250004',
      customer: {
        name: 'Ali Yıldız',
        email: 'ali@example.com',
      },
      items: 4,
      total: 2350,
      status: 'delivered',
      payment: 'paid',
      date: '2025-12-09 14:20',
      shippingAddress: 'Bursa, Türkiye',
      deliveredAt: '2025-12-10 11:30',
    },
    {
      id: 'BT-20250005',
      customer: {
        name: 'Fatma Çelik',
        email: 'fatma@example.com',
      },
      items: 2,
      total: 599,
      status: 'cancelled',
      payment: 'refunded',
      date: '2025-12-08 10:00',
      shippingAddress: 'Antalya, Türkiye',
    },
  ];

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        label: 'Bekliyor',
        icon: Clock,
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      },
      processing: {
        label: 'Hazırlanıyor',
        icon: Package,
        color: 'bg-blue-100 text-blue-700 border-blue-200',
      },
      shipped: {
        label: 'Kargoda',
        icon: Truck,
        color: 'bg-purple-100 text-purple-700 border-purple-200',
      },
      delivered: {
        label: 'Teslim Edildi',
        icon: CheckCircle,
        color: 'bg-green-100 text-green-700 border-green-200',
      },
      cancelled: {
        label: 'İptal',
        icon: XCircle,
        color: 'bg-red-100 text-red-700 border-red-200',
      },
    };
    return configs[status] || configs.pending;
  };

  const StatusBadge = ({ status }) => {
    const config = getStatusConfig(status);
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const getPriorityIndicator = (order) => {
    if (order.status === 'pending') {
      const orderDate = new Date(order.date);
      const hoursSinceOrder = (Date.now() - orderDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceOrder > 24) {
        return <div className="w-2 h-2 bg-red-500 rounded-full" title="Acil" />;
      } else if (hoursSinceOrder > 12) {
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Dikkat" />;
      }
    }
    return <div className="w-2 h-2 bg-green-500 rounded-full" title="Normal" />;
  };

  return (
    <div>
      {/* Breadcrumb */}
      <VendorBreadcrumb items={[{ label: 'Siparişler' }]} />

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Siparişler</h1>
        <p className="text-gray-600 mt-1">Siparişlerinizi yönetin ve takip edin</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <button
          onClick={() => setSelectedStatus('all')}
          className={`bg-white rounded-lg border-2 p-4 text-left transition-colors ${
            selectedStatus === 'all' ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-sm text-gray-600">Tüm Siparişler</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </button>
        
        <button
          onClick={() => setSelectedStatus('pending')}
          className={`bg-white rounded-lg border-2 p-4 text-left transition-colors ${
            selectedStatus === 'pending' ? 'border-yellow-500' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-sm text-gray-600">Bekliyor</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
        </button>

        <button
          onClick={() => setSelectedStatus('processing')}
          className={`bg-white rounded-lg border-2 p-4 text-left transition-colors ${
            selectedStatus === 'processing' ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-sm text-gray-600">Hazırlanıyor</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{stats.processing}</p>
        </button>

        <button
          onClick={() => setSelectedStatus('shipped')}
          className={`bg-white rounded-lg border-2 p-4 text-left transition-colors ${
            selectedStatus === 'shipped' ? 'border-purple-500' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-sm text-gray-600">Kargoda</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">{stats.shipped}</p>
        </button>

        <button
          onClick={() => setSelectedStatus('delivered')}
          className={`bg-white rounded-lg border-2 p-4 text-left transition-colors ${
            selectedStatus === 'delivered' ? 'border-green-500' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-sm text-gray-600">Teslim Edildi</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats.delivered}</p>
        </button>

        <button
          onClick={() => setSelectedStatus('cancelled')}
          className={`bg-white rounded-lg border-2 p-4 text-left transition-colors ${
            selectedStatus === 'cancelled' ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-sm text-gray-600">İptal</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.cancelled}</p>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Sipariş no, müşteri adı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm Zamanlar</option>
            <option value="today">Bugün</option>
            <option value="week">Bu Hafta</option>
            <option value="month">Bu Ay</option>
          </select>

          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtrele
          </Button>
        </div>
      </div>

      {/* Priority Alert */}
      {stats.pending > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="font-semibold text-yellow-900">
                {stats.pending} bekleyen siparişiniz var
              </p>
              <p className="text-sm text-yellow-700">
                Lütfen siparişleri hemen işleme alın
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  <div className="flex items-center gap-2">
                    <span>Öncelik</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Sipariş No
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Müşteri
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Ürün
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Tutar
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  İşlem
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {getPriorityIndicator(order)}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/vendor/orders/${order.id}`}
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.customer.name}</p>
                      <p className="text-sm text-gray-500">{order.customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {order.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.items} ürün
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₺{order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/vendor/orders/${order.id}`}>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-gray-600" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Toplam <span className="font-semibold">{orders.length}</span> sipariş
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Önceki
          </Button>
          <Button variant="outline" size="sm">
            Sonraki
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorOrders;

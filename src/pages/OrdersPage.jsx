import { CheckCircle2, Clock, Package, Truck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: { label: 'Teslim Edildi', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
      shipped: { label: 'Kargoda', color: 'bg-blue-100 text-blue-800', icon: Truck },
      processing: { label: 'Hazırlanıyor', color: 'bg-yellow-100 text-yellow-800', icon: Clock }
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Siparişlerim</h1>
          <p className="text-gray-600 mt-2">Tüm siparişlerinizi ve kargo durumlarını görüntüleyin</p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <div>
                      <span className="text-xs text-gray-500">Sipariş No</span>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Tarih</span>
                      <p className="text-sm text-gray-900">{new Date(order.date).toLocaleDateString('tr-TR')}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Toplam</span>
                      <p className="font-semibold text-gray-900">{order.total.toFixed(2)} TL</p>
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">Adet: {item.quantity}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {item.price.toFixed(2)} TL
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking Info */}
                {order.trackingNumber && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Takip Numarası</p>
                        <p className="font-mono text-sm font-semibold text-gray-900">{order.trackingNumber}</p>
                      </div>
                      <Link
                        to={`/order-tracking?order=${order.id}`}
                        className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                      >
                        Kargonu Takip Et →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz Siparişiniz Yok</h3>
            <p className="text-gray-600 mb-6">İlk siparişinizi vermek için alışverişe başlayın!</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Alışverişe Başla
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

import {
    CheckCircle,
    Clock,
    Download,
    Mail,
    MapPin,
    Phone,
    Printer,
    Truck,
    User
} from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import VendorBreadcrumb from '../../../components/vendor/layout/VendorBreadcrumb';

const VendorOrderDetail = () => {
  const { id } = useParams();
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  // Mock order data
  const order = {
    id: 'BT-20250001',
    orderNumber: 'BT-20250001',
    date: '2025-12-11 10:30',
    status: 'pending',
    payment: {
      status: 'paid',
      method: 'Kredi Kartı',
      total: 1450,
      subtotal: 1200,
      shipping: 150,
      tax: 100,
      discount: 0,
    },
    customer: {
      name: 'Ayşe Yılmaz',
      email: 'ayse@example.com',
      phone: '+90 555 111 2233',
      avatar: null,
    },
    shippingAddress: {
      fullName: 'Ayşe Yılmaz',
      address: 'Atatürk Cad. No:123 Daire:5',
      district: 'Kadıköy',
      city: 'İstanbul',
      postalCode: '34710',
      country: 'Türkiye',
    },
    billingAddress: {
      fullName: 'Ayşe Yılmaz',
      address: 'Atatürk Cad. No:123 Daire:5',
      district: 'Kadıköy',
      city: 'İstanbul',
      postalCode: '34710',
      country: 'Türkiye',
    },
    items: [
      {
        id: 1,
        name: 'Beyaz Pamuklu Tişört',
        sku: 'TSH-001',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100',
        variant: 'Beden: M, Renk: Beyaz',
        quantity: 2,
        price: 199,
        total: 398,
      },
      {
        id: 2,
        name: 'Slim Fit Jean Pantolon',
        sku: 'PNT-001',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100',
        variant: 'Beden: 32',
        quantity: 1,
        price: 599,
        total: 599,
      },
      {
        id: 3,
        name: 'Deri Çanta',
        sku: 'BAG-001',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100',
        variant: 'Renk: Kahverengi',
        quantity: 1,
        price: 699,
        total: 699,
      },
    ],
    timeline: [
      {
        status: 'placed',
        label: 'Sipariş Alındı',
        date: '2025-12-11 10:30',
        completed: true,
      },
      {
        status: 'confirmed',
        label: 'Onaylandı',
        date: '2025-12-11 10:35',
        completed: true,
      },
      {
        status: 'processing',
        label: 'Hazırlanıyor',
        date: null,
        completed: false,
      },
      {
        status: 'shipped',
        label: 'Kargoya Verildi',
        date: null,
        completed: false,
      },
      {
        status: 'delivered',
        label: 'Teslim Edildi',
        date: null,
        completed: false,
      },
    ],
    notes: [
      {
        id: 1,
        type: 'customer',
        text: 'Lütfen kapıda bırakmayın, komşuya teslim edebilirsiniz.',
        date: '2025-12-11 10:30',
      },
    ],
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: { label: 'Bekliyor', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      processing: { label: 'Hazırlanıyor', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      shipped: { label: 'Kargoda', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      delivered: { label: 'Teslim Edildi', color: 'bg-green-100 text-green-700 border-green-200' },
      cancelled: { label: 'İptal', color: 'bg-red-100 text-red-700 border-red-200' },
    };
    return configs[status] || configs.pending;
  };

  const handleUpdateStatus = (newStatus) => {
    console.log('Updating status to:', newStatus);
    // TODO: API call
    setShowStatusModal(false);
  };

  const handleAddTracking = () => {
    console.log('Adding tracking:', trackingNumber);
    // TODO: API call
  };

  return (
    <div>
      {/* Breadcrumb */}
      <VendorBreadcrumb
        items={[
          { label: 'Siparişler', href: '/vendor/orders' },
          { label: order.orderNumber },
        ]}
      />

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sipariş #{order.orderNumber}</h1>
            <p className="text-gray-600 mt-1">
              {order.date} tarihinde oluşturuldu
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Yazdır
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Fatura İndir
            </Button>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <span className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 ${getStatusConfig(order.status).color}`}>
              {getStatusConfig(order.status).label}
            </span>
            <span className="text-sm text-gray-600">
              Ödeme: <span className="font-semibold text-green-600">Tamamlandı</span>
            </span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setShowStatusModal(true)}>
              Durum Güncelle
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Müşteriye Mail
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Sipariş Ürünleri</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                      <p className="text-sm text-gray-600">{item.variant}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">x{item.quantity}</p>
                      <p className="font-semibold text-gray-900">₺{item.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₺{item.total}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ara Toplam:</span>
                    <span className="font-medium text-gray-900">₺{order.payment.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kargo:</span>
                    <span className="font-medium text-gray-900">₺{order.payment.shipping}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Vergi:</span>
                    <span className="font-medium text-gray-900">₺{order.payment.tax}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span className="text-gray-900">Toplam:</span>
                    <span className="text-gray-900">₺{order.payment.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Sipariş Durumu</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {order.timeline.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <p className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.label}
                      </p>
                      {step.date && (
                        <p className="text-sm text-gray-500 mt-1">{step.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Tracking Number */}
              {order.status === 'processing' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kargo Takip Numarası
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Takip numarasını girin"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={handleAddTracking}>
                      <Truck className="w-4 h-4 mr-2" />
                      Ekle
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Customer Notes */}
          {order.notes.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Müşteri Notları</h2>
              </div>
              <div className="p-6">
                {order.notes.map((note) => (
                  <div key={note.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-gray-900">{note.text}</p>
                    <p className="text-xs text-gray-500 mt-2">{note.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Müşteri Bilgileri</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{order.customer.name}</p>
                  <p className="text-sm text-gray-500">Müşteri</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${order.customer.email}`} className="text-blue-600 hover:text-blue-700">
                    {order.customer.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${order.customer.phone}`} className="text-blue-600 hover:text-blue-700">
                    {order.customer.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-bold text-gray-900">Teslimat Adresi</h2>
            </div>
            <div className="p-6">
              <p className="font-semibold text-gray-900 mb-2">{order.shippingAddress.fullName}</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {order.shippingAddress.address}<br />
                {order.shippingAddress.district} / {order.shippingAddress.city}<br />
                {order.shippingAddress.postalCode}<br />
                {order.shippingAddress.country}
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Ödeme Bilgileri</h2>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ödeme Yöntemi:</span>
                  <span className="font-medium text-gray-900">{order.payment.method}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Durum:</span>
                  <span className="font-medium text-green-600">Ödendi</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t">
                  <span className="text-gray-600">Toplam:</span>
                  <span className="font-bold text-gray-900">₺{order.payment.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorOrderDetail;

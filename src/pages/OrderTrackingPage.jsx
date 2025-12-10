import { Package, Search, Truck } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const OrderTrackingPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      // Mock tracking data
      setTrackingResult({
        orderNumber: orderNumber,
        status: 'in_transit',
        estimatedDelivery: 'December 15, 2025',
        trackingNumber: 'TRK1234567890',
        timeline: [
          { status: 'Sipariş Verildi', date: '9 Aralık 2025 10:30', completed: true },
          { status: 'İşleniyor', date: '9 Aralık 2025 14:15', completed: true },
          { status: 'Kargoya Verildi', date: '10 Aralık 2025 09:00', completed: true },
          { status: 'Yolda', date: '11 Aralık 2025 15:45', completed: true },
          { status: 'Dağıtımda', date: 'Bekliyor', completed: false },
          { status: 'Teslim Edildi', date: 'Bekliyor', completed: false }
        ]
      });
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <Truck className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Siparişinizi Takip Edin
          </h1>
          <p className="text-gray-600">
            En son durumu görmek için sipariş bilgilerinizi girin
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sipariş Numarası *
              </label>
              <Input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="ör: SIP-2024-001"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Sipariş onay e-postasında bulunur
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta Adresi *
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@ornek.com"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Sipariş verirken kullanılan e-posta
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSearching}
              loading={isSearching}
              size="lg"
              fullWidth
            >
              {!isSearching && <Search className="w-5 h-5 mr-2" />}
              {isSearching ? 'Aranıyor...' : 'Siparişi Takip Et'}
            </Button>
          </form>
        </div>

        {/* Tracking Result */}
        {trackingResult && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Order Status */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Sipariş {trackingResult.orderNumber}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Takip: {trackingResult.trackingNumber}
                  </p>
                </div>
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(trackingResult.status)}`}>
                  {trackingResult.status === 'in_transit' && 'Yolda'}
                  {trackingResult.status === 'delivered' && 'Teslim Edildi'}
                  {trackingResult.status === 'processing' && 'İşleniyor'}
                </span>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-sm font-medium text-indigo-900">
                  Tahmini Teslimat: {trackingResult.estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Kargo Zaman Çizelgesi
              </h3>
              <div className="space-y-6">
                {trackingResult.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        event.completed 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {event.completed ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <Package className="w-5 h-5" />
                        )}
                      </div>
                      {index < trackingResult.timeline.length - 1 && (
                        <div className={`w-0.5 h-16 ${
                          event.completed ? 'bg-indigo-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <h4 className={`font-semibold mb-1 ${
                        event.completed ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {event.status}
                      </h4>
                      <p className={`text-sm ${
                        event.completed ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {event.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
              <Button variant="outline">
                Sipariş Detaylarını Gör
              </Button>
              <Button variant="outline">
                Destek ile İletişime Geç
              </Button>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Yardıma mı İhtiyacınız Var?</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• Siparişler genellikle 1-2 iş günü içinde kargoya verilir</p>
            <p>• Standart kargo 5-7 iş günü sürer</p>
            <p>• Hızlı kargo 2-3 iş günü sürer</p>
            <p>• Sorularınız için bize destek@butiks.com adresinden ulaşabilirsiniz</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;

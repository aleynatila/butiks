import {
    AlertCircle,
    ArrowDownRight,
    ArrowUpRight,
    Clock,
    DollarSign,
    Download,
    TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/ui/Button';
import VendorBreadcrumb from '../../components/vendor/layout/VendorBreadcrumb';

const VendorFinance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Mock data
  const balanceData = {
    available: 45680,
    pending: 12340,
    withdrawn: 123560,
    totalEarned: 181580,
  };

  const transactions = [
    {
      id: 1,
      type: 'credit',
      description: 'Sipariş #BT-20250001',
      amount: 1450,
      status: 'completed',
      date: '2025-12-11 10:30',
    },
    {
      id: 2,
      type: 'debit',
      description: 'Para Çekme Talebi',
      amount: 5000,
      status: 'processing',
      date: '2025-12-10 15:20',
    },
    {
      id: 3,
      type: 'credit',
      description: 'Sipariş #BT-20249999',
      amount: 890,
      status: 'completed',
      date: '2025-12-09 12:15',
    },
    {
      id: 4,
      type: 'debit',
      description: 'Platform Komisyonu',
      amount: 125,
      status: 'completed',
      date: '2025-12-08 09:00',
    },
  ];

  const withdrawalRequests = [
    {
      id: 1,
      amount: 5000,
      status: 'processing',
      requestDate: '2025-12-10 15:20',
      processedDate: null,
      method: 'Banka Transferi',
    },
    {
      id: 2,
      amount: 10000,
      status: 'completed',
      requestDate: '2025-12-05 10:00',
      processedDate: '2025-12-06 14:30',
      method: 'Banka Transferi',
    },
    {
      id: 3,
      amount: 7500,
      status: 'completed',
      requestDate: '2025-11-28 16:45',
      processedDate: '2025-11-29 11:20',
      method: 'Banka Transferi',
    },
  ];

  const invoices = [
    {
      id: 1,
      number: 'INV-2025-001',
      period: 'Aralık 2025',
      amount: 15680,
      issued: '2025-12-01',
      due: '2025-12-15',
      status: 'paid',
    },
    {
      id: 2,
      number: 'INV-2025-002',
      period: 'Kasım 2025',
      amount: 12340,
      issued: '2025-11-01',
      due: '2025-11-15',
      status: 'paid',
    },
    {
      id: 3,
      number: 'INV-2025-003',
      period: 'Ekim 2025',
      amount: 18920,
      issued: '2025-10-01',
      due: '2025-10-15',
      status: 'paid',
    },
  ];

  const getStatusConfig = (status) => {
    const configs = {
      completed: { label: 'Tamamlandı', color: 'bg-green-100 text-green-700' },
      processing: { label: 'İşleniyor', color: 'bg-yellow-100 text-yellow-700' },
      pending: { label: 'Bekliyor', color: 'bg-blue-100 text-blue-700' },
      paid: { label: 'Ödendi', color: 'bg-green-100 text-green-700' },
      overdue: { label: 'Vadesi Geçti', color: 'bg-red-100 text-red-700' },
    };
    return configs[status] || configs.pending;
  };

  const handleWithdrawal = () => {
    console.log('Withdrawal request:', withdrawAmount);
    setShowWithdrawModal(false);
    setWithdrawAmount('');
  };

  return (
    <div>
      {/* Breadcrumb */}
      <VendorBreadcrumb items={[{ label: 'Finans' }]} />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Finans Yönetimi</h1>
        <p className="text-gray-600 mt-1">Ödemelerinizi, bakiyenizi ve faturalarınızı yönetin</p>
      </div>

      {/* Balance Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 opacity-70" />
          </div>
          <p className="text-2xl font-bold mb-1">₺{balanceData.available.toLocaleString()}</p>
          <p className="text-green-100 text-sm">Kullanılabilir Bakiye</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
            onClick={() => setShowWithdrawModal(true)}
          >
            Para Çek
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">₺{balanceData.pending.toLocaleString()}</p>
          <p className="text-gray-600 text-sm">Bekleyen Ödemeler</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">₺{balanceData.withdrawn.toLocaleString()}</p>
          <p className="text-gray-600 text-sm">Çekilen Toplam</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">₺{balanceData.totalEarned.toLocaleString()}</p>
          <p className="text-gray-600 text-sm">Toplam Kazanç</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              İşlem Geçmişi
            </button>
            <button
              onClick={() => setActiveTab('withdrawals')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'withdrawals'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Para Çekme İstekleri
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'invoices'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Faturalar
            </button>
          </div>
        </div>

        {/* Transaction History */}
        {activeTab === 'overview' && (
          <div className="p-6">
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    {transaction.type === 'credit' ? (
                      <ArrowUpRight className={`w-6 h-6 text-green-600`} />
                    ) : (
                      <ArrowDownRight className={`w-6 h-6 text-red-600`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}₺{transaction.amount.toLocaleString()}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusConfig(transaction.status).color}`}>
                      {getStatusConfig(transaction.status).label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Withdrawal Requests */}
        {activeTab === 'withdrawals' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Miktar</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Yöntem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Talep Tarihi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">İşlem Tarihi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {withdrawalRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">#{request.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      ₺{request.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{request.method}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{request.requestDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {request.processedDate || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusConfig(request.status).color}`}>
                        {getStatusConfig(request.status).label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Invoices */}
        {activeTab === 'invoices' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fatura No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dönem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tutar</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Düzenlenme</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{invoice.number}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{invoice.period}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      ₺{invoice.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{invoice.issued}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{invoice.due}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusConfig(invoice.status).color}`}>
                        {getStatusConfig(invoice.status).label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 m-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Para Çekme Talebi</h2>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Kullanılabilir Bakiye: <span className="font-bold text-gray-900">₺{balanceData.available.toLocaleString()}</span>
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-2">Çekilecek Miktar</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Miktar girin"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-2">Minimum çekim tutarı: ₺100</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900">
                  Para çekme talepleri 1-3 iş günü içinde işleme alınır. Hesabınıza 2-5 iş günü içinde ulaşır.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowWithdrawModal(false)}>
                İptal
              </Button>
              <Button className="flex-1" onClick={handleWithdrawal}>
                Talep Oluştur
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorFinance;

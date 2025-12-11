import { AlertCircle, Check, Loader, Tag, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import Button from '../../ui/Button';

const BulkOperationsModal = ({ selectedProducts, onClose, onComplete }) => {
  const [operation, setOperation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Bulk operation options
  const [bulkData, setBulkData] = useState({
    status: 'active',
    stock: 0,
    price: 0,
    discount: 0,
    category: '',
    tags: '',
  });

  const operations = [
    { id: 'status', label: 'Durum Değiştir', icon: Tag },
    { id: 'stock', label: 'Stok Güncelle', icon: Tag },
    { id: 'price', label: 'Fiyat Güncelle', icon: Tag },
    { id: 'discount', label: 'İndirim Uygula', icon: Tag },
    { id: 'delete', label: 'Toplu Sil', icon: Trash2, danger: true },
  ];

  const handleBulkOperation = async () => {
    if (!operation) {
      setError('Lütfen bir işlem seçin');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const productIds = selectedProducts.map((p) => p.id);

      if (operation === 'delete') {
        // TODO: Call API - vendorProductAPI.bulkDelete(productIds)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Bulk delete:', productIds);
      } else {
        // TODO: Call API - vendorProductAPI.bulkUpdate(productIds, bulkData)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Bulk update:', { productIds, operation, data: bulkData });
      }

      setSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (err) {
      setError(err.message || 'İşlem sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Toplu İşlem</h2>
            <p className="text-sm text-gray-600 mt-1">
              {selectedProducts.length} ürün seçildi
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">İşlem Başarılı!</h3>
              <p className="text-gray-600">
                {selectedProducts.length} ürün başarıyla güncellendi.
              </p>
            </div>
          ) : (
            <>
              {/* Select Operation */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  İşlem Seçin
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {operations.map((op) => {
                    const Icon = op.icon;
                    return (
                      <button
                        key={op.id}
                        onClick={() => setOperation(op.id)}
                        className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-all ${
                          operation === op.id
                            ? op.danger
                              ? 'border-red-500 bg-red-50'
                              : 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            operation === op.id
                              ? op.danger
                                ? 'text-red-600'
                                : 'text-blue-600'
                              : 'text-gray-600'
                          }`}
                        />
                        <span
                          className={`font-medium text-sm ${
                            operation === op.id
                              ? op.danger
                                ? 'text-red-900'
                                : 'text-blue-900'
                              : 'text-gray-900'
                          }`}
                        >
                          {op.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Operation-specific inputs */}
              {operation && operation !== 'delete' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    İşlem Detayları
                  </label>

                  {operation === 'status' && (
                    <select
                      value={bulkData.status}
                      onChange={(e) => setBulkData({ ...bulkData, status: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Aktif</option>
                      <option value="draft">Taslak</option>
                      <option value="archived">Arşiv</option>
                    </select>
                  )}

                  {operation === 'stock' && (
                    <div>
                      <input
                        type="number"
                        value={bulkData.stock}
                        onChange={(e) => setBulkData({ ...bulkData, stock: e.target.value })}
                        placeholder="Stok miktarı"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Tüm seçili ürünlerin stoğu bu değer olarak güncellenecek
                      </p>
                    </div>
                  )}

                  {operation === 'price' && (
                    <div>
                      <input
                        type="number"
                        value={bulkData.price}
                        onChange={(e) => setBulkData({ ...bulkData, price: e.target.value })}
                        placeholder="Yeni fiyat (₺)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Tüm seçili ürünlerin fiyatı bu değere ayarlanacak
                      </p>
                    </div>
                  )}

                  {operation === 'discount' && (
                    <div>
                      <input
                        type="number"
                        value={bulkData.discount}
                        onChange={(e) => setBulkData({ ...bulkData, discount: e.target.value })}
                        placeholder="İndirim yüzdesi (%)"
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Tüm seçili ürünlere bu oranda indirim uygulanacak
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Warning for delete */}
              {operation === 'delete' && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900 mb-1">Dikkat!</h4>
                      <p className="text-sm text-red-800">
                        {selectedProducts.length} ürün kalıcı olarak silinecek. Bu işlem geri
                        alınamaz!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Selected Products Preview */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Seçili Ürünler
                </label>
                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
                  {selectedProducts.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 border-b border-gray-100 last:border-0"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">{product.sku}</p>
                      </div>
                    </div>
                  ))}
                  {selectedProducts.length > 5 && (
                    <div className="p-3 text-center text-sm text-gray-500 bg-gray-50">
                      +{selectedProducts.length - 5} ürün daha
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="flex gap-2 p-6 border-t border-gray-200">
            <Button variant="outline" className="flex-1" onClick={onClose} disabled={loading}>
              İptal
            </Button>
            <Button
              className="flex-1"
              onClick={handleBulkOperation}
              disabled={!operation || loading}
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  İşleniyor...
                </>
              ) : (
                'Uygula'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkOperationsModal;

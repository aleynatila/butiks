import {
    CheckSquare,
    Edit2,
    Eye,
    Grid3x3,
    List,
    MoreVertical,
    Package,
    Plus,
    Search,
    Square,
    Trash2
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import VendorBreadcrumb from '../../../components/vendor/layout/VendorBreadcrumb';
import BulkOperationsModal from '../../../components/vendor/products/BulkOperationsModal';

const VendorProducts = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Beyaz Pamuklu Tişört',
      sku: 'TSH-001',
      price: 299,
      discountPrice: 199,
      stock: 50,
      category: 'Kadın Giyim',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
      sales: 45,
    },
    {
      id: 2,
      name: 'Slim Fit Jean Pantolon',
      sku: 'PNT-001',
      price: 599,
      stock: 30,
      category: 'Erkek Giyim',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300',
      sales: 32,
    },
    {
      id: 3,
      name: 'Deri Çanta',
      sku: 'BAG-001',
      price: 899,
      discountPrice: 699,
      stock: 20,
      category: 'Aksesuar',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300',
      sales: 28,
    },
    {
      id: 4,
      name: 'Spor Ayakkabı',
      sku: 'SHO-001',
      price: 799,
      stock: 5,
      category: 'Ayakkabı',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
      sales: 67,
      lowStock: true,
    },
    {
      id: 5,
      name: 'Kadın Elbise',
      sku: 'DRS-001',
      price: 499,
      stock: 0,
      category: 'Kadın Giyim',
      status: 'out_of_stock',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300',
      sales: 15,
      outOfStock: true,
    },
    {
      id: 6,
      name: 'Erkek Gömlek',
      sku: 'SHT-001',
      price: 349,
      stock: 40,
      category: 'Erkek Giyim',
      status: 'draft',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300',
      sales: 0,
    },
  ];

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    draft: products.filter(p => p.status === 'draft').length,
    lowStock: products.filter(p => p.lowStock).length,
    outOfStock: products.filter(p => p.outOfStock).length,
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts);
    }
  };

  const handleSelectProduct = (product) => {
    if (selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const isSelected = (productId) => {
    return selectedProducts.some((p) => p.id === productId);
  };

  const handleBulkComplete = () => {
    setShowBulkModal(false);
    setSelectedProducts([]);
    // Refresh products list
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-700',
      draft: 'bg-gray-100 text-gray-700',
      out_of_stock: 'bg-red-100 text-red-700',
    };
    const labels = {
      active: 'Aktif',
      draft: 'Taslak',
      out_of_stock: 'Stokta Yok',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow relative">
      <button
        onClick={() => handleSelectProduct(product)}
        className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
      >
        {isSelected(product.id) ? (
          <CheckSquare className="w-5 h-5 text-blue-600" />
        ) : (
          <Square className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {product.discountPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
          </div>
        )}
        {product.lowStock && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
            Düşük Stok
          </div>
        )}
        {product.outOfStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            Tükendi
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
            <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
          </div>
          <div className="relative group">
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block z-10">
              <Link
                to={`/vendor/products/${product.id}/edit`}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm"
              >
                <Edit2 className="w-4 h-4" />
                Düzenle
              </Link>
              <Link
                to={`/product/${product.id}`}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm"
              >
                <Eye className="w-4 h-4" />
                Görüntüle
              </Link>
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-red-600">
                <Trash2 className="w-4 h-4" />
                Sil
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          {product.discountPrice ? (
            <>
              <span className="text-lg font-bold text-gray-900">₺{product.discountPrice}</span>
              <span className="text-sm text-gray-500 line-through">₺{product.price}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">₺{product.price}</span>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">Stok: {product.stock}</span>
          <span className="text-sm text-gray-600">Satış: {product.sales}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">{product.category}</span>
          {getStatusBadge(product.status)}
        </div>
      </div>
    </div>
  );

  const ProductRow = ({ product }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 w-12">
        <button onClick={() => handleSelectProduct(product)}>
          {isSelected(product.id) ? (
            <CheckSquare className="w-5 h-5 text-blue-600" />
          ) : (
            <Square className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{product.name}</p>
            <p className="text-xs text-gray-500">SKU: {product.sku}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {product.discountPrice ? (
            <>
              <span className="font-semibold text-gray-900">₺{product.discountPrice}</span>
              <span className="text-sm text-gray-500 line-through">₺{product.price}</span>
            </>
          ) : (
            <span className="font-semibold text-gray-900">₺{product.price}</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
          {product.stock}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{product.sales}</td>
      <td className="px-6 py-4">{getStatusBadge(product.status)}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Link to={`/vendor/products/${product.id}/edit`}>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
          </Link>
          <Link to={`/product/${product.id}`}>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </Link>
          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div>
      {/* Breadcrumb */}
      <VendorBreadcrumb items={[{ label: 'Ürünler' }]} />

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ürünler</h1>
            <p className="text-gray-600 mt-1">Ürünlerinizi yönetin ve düzenleyin</p>
          </div>
          <div className="flex items-center gap-2">
            {selectedProducts.length > 0 && (
              <Button variant="outline" onClick={() => setShowBulkModal(true)}>
                <Package className="w-4 h-4 mr-2" />
                Toplu İşlem ({selectedProducts.length})
              </Button>
            )}
            <Link to="/vendor/products/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Ürün Ekle
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Toplam Ürün</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Aktif</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Taslak</p>
            <p className="text-2xl font-bold text-gray-600 mt-1">{stats.draft}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Düşük Stok</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.lowStock}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Tükendi</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{stats.outOfStock}</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ürün adı, SKU ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm Kategoriler</option>
            <option value="kadin">Kadın Giyim</option>
            <option value="erkek">Erkek Giyim</option>
            <option value="aksesuar">Aksesuar</option>
            <option value="ayakkabi">Ayakkabı</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="draft">Taslak</option>
            <option value="out_of_stock">Stokta Yok</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {products.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz ürün yok</h3>
          <p className="text-gray-600 mb-6">İlk ürününüzü ekleyerek başlayın</p>
          <Link to="/vendor/products/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Ürün Ekle
            </Button>
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 w-12">
                    <button onClick={handleSelectAll}>
                      {selectedProducts.length === filteredProducts.length && filteredProducts.length > 0 ? (
                        <CheckSquare className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Ürün
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Fiyat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Stok
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Satış
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
                {products.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bulk Operations Modal */}
      {showBulkModal && (
        <BulkOperationsModal
          selectedProducts={selectedProducts}
          onClose={() => setShowBulkModal(false)}
          onComplete={handleBulkComplete}
        />
      )}
    </div>
  );
};

export default VendorProducts;

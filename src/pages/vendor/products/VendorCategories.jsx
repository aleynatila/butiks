import {
    ChevronRight,
    Edit2,
    Eye,
    Folder,
    Grid3x3,
    MoreVertical,
    Plus,
    Search,
    Trash2
} from 'lucide-react';
import { useState } from 'react';
import Button from '../../../components/ui/Button';
import VendorBreadcrumb from '../../../components/vendor/layout/VendorBreadcrumb';

const VendorCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    parent: '',
    description: '',
  });

  // Mock categories data - hierarchical structure
  const categories = [
    {
      id: 1,
      name: 'Kadın Giyim',
      slug: 'kadin-giyim',
      productCount: 45,
      parent: null,
      children: [
        { id: 11, name: 'Elbise', slug: 'elbise', productCount: 12 },
        { id: 12, name: 'Bluz & Gömlek', slug: 'bluz-gomlek', productCount: 18 },
        { id: 13, name: 'Pantolon', slug: 'pantolon', productCount: 15 },
      ],
    },
    {
      id: 2,
      name: 'Erkek Giyim',
      slug: 'erkek-giyim',
      productCount: 38,
      parent: null,
      children: [
        { id: 21, name: 'Tişört', slug: 'tisort', productCount: 20 },
        { id: 22, name: 'Pantolon', slug: 'pantolon', productCount: 18 },
      ],
    },
    {
      id: 3,
      name: 'Aksesuar',
      slug: 'aksesuar',
      productCount: 28,
      parent: null,
      children: [
        { id: 31, name: 'Çanta', slug: 'canta', productCount: 15 },
        { id: 32, name: 'Takı', slug: 'taki', productCount: 13 },
      ],
    },
    {
      id: 4,
      name: 'Ayakkabı',
      slug: 'ayakkabi',
      productCount: 32,
      parent: null,
      children: [
        { id: 41, name: 'Spor Ayakkabı', slug: 'spor-ayakkabi', productCount: 18 },
        { id: 42, name: 'Bot & Çizme', slug: 'bot-cizme', productCount: 14 },
      ],
    },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = () => {
    console.log('Adding category:', newCategory);
    // TODO: API call
    setShowAddModal(false);
    setNewCategory({ name: '', parent: '', description: '' });
  };

  const CategoryCard = ({ category, level = 0 }) => (
    <div className={`bg-white rounded-lg border border-gray-200 ${level > 0 ? 'ml-8 mt-2' : ''}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
              level === 0 ? 'from-blue-400 to-blue-600' : 'from-gray-300 to-gray-400'
            } flex items-center justify-center`}>
              {level === 0 ? (
                <Folder className="w-6 h-6 text-white" />
              ) : (
                <Grid3x3 className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <span className="text-xs text-gray-500">/{category.slug}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {category.productCount} ürün
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
            <div className="relative group">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
              <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block z-10">
                <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm">
                  <Plus className="w-4 h-4" />
                  Alt Kategori Ekle
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-red-600">
                  <Trash2 className="w-4 h-4" />
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-categories */}
      {category.children && category.children.length > 0 && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <div className="space-y-2">
            {category.children.map((child) => (
              <div key={child.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">{child.name}</span>
                  <span className="text-xs text-gray-500">({child.productCount})</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                    <Edit2 className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                    <Trash2 className="w-3.5 h-3.5 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {/* Breadcrumb */}
      <VendorBreadcrumb
        items={[
          { label: 'Ürünler', href: '/vendor/products' },
          { label: 'Kategoriler' },
        ]}
      />

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kategori Yönetimi</h1>
            <p className="text-gray-600 mt-1">Ürün kategorilerinizi düzenleyin ve yönetin</p>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Kategori
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Toplam Kategori</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{categories.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Alt Kategoriler</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {categories.reduce((acc, cat) => acc + (cat.children?.length || 0), 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Toplam Ürün</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {categories.reduce((acc, cat) => acc + cat.productCount, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Ortalama Ürün/Kategori</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {Math.round(categories.reduce((acc, cat) => acc + cat.productCount, 0) / categories.length)}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Kategori ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {filteredCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Yeni Kategori Ekle</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori Adı
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Örn: Kadın Giyim"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Üst Kategori (Opsiyonel)
                </label>
                <select
                  value={newCategory.parent}
                  onChange={(e) => setNewCategory({ ...newCategory, parent: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Ana Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama (Opsiyonel)
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Kategori açıklaması..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>
                İptal
              </Button>
              <Button className="flex-1" onClick={handleAddCategory}>
                Ekle
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorCategories;

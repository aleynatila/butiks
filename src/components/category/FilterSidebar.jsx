import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSidebar = ({ onFilterChange, availableFilters = {} }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Expanded sections state
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    vendors: true,
    sizes: true,
    colors: true,
    rating: false
  });

  // Filter state
  const [filters, setFilters] = useState({
    priceRange: {
      min: parseInt(searchParams.get('priceMin')) || 0,
      max: parseInt(searchParams.get('priceMax')) || 10000
    },
    vendorIds: searchParams.getAll('vendor'),
    sizes: searchParams.getAll('size'),
    colors: searchParams.getAll('color'),
    inStock: searchParams.get('inStock') === 'true',
    onSale: searchParams.get('onSale') === 'true',
    minRating: parseInt(searchParams.get('rating')) || 0
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    // Keep existing non-filter params (like page, sort)
    const currentSort = searchParams.get('sort');
    if (currentSort) params.set('sort', currentSort);
    
    if (filters.priceRange.min > 0) {
      params.set('priceMin', filters.priceRange.min);
    }
    if (filters.priceRange.max < 10000) {
      params.set('priceMax', filters.priceRange.max);
    }
    filters.vendorIds.forEach(id => params.append('vendor', id));
    filters.sizes.forEach(size => params.append('size', size));
    filters.colors.forEach(color => params.append('color', color));
    if (filters.inStock) params.set('inStock', 'true');
    if (filters.onSale) params.set('onSale', 'true');
    if (filters.minRating > 0) params.set('rating', filters.minRating);
    
    setSearchParams(params, { replace: true });
    onFilterChange(filters);
  }, [filters]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: parseInt(value)
      }
    }));
  };

  const toggleArrayFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 10000 },
      vendorIds: [],
      sizes: [],
      colors: [],
      inStock: false,
      onSale: false,
      minRating: 0
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 10000) count++;
    if (filters.vendorIds.length > 0) count += filters.vendorIds.length;
    if (filters.sizes.length > 0) count += filters.sizes.length;
    if (filters.colors.length > 0) count += filters.colors.length;
    if (filters.inStock) count++;
    if (filters.onSale) count++;
    if (filters.minRating > 0) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();

  // Mock vendors (gerçek uygulamada API'den gelecek)
  const vendors = availableFilters.vendors || [
    { id: 'v1', shopName: 'Trendy Fashion', productCount: 234 },
    { id: 'v2', shopName: 'Classic Style', productCount: 156 },
    { id: 'v3', shopName: 'Modern Butik', productCount: 189 },
    { id: 'v4', shopName: 'Elegant Store', productCount: 98 },
    { id: 'v5', shopName: 'Fashion Corner', productCount: 267 }
  ];

  const sizes = availableFilters.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  const colors = availableFilters.colors || [
    { name: 'Siyah', hex: '#000000' },
    { name: 'Beyaz', hex: '#FFFFFF' },
    { name: 'Kırmızı', hex: '#DC2626' },
    { name: 'Mavi', hex: '#2563EB' },
    { name: 'Yeşil', hex: '#16A34A' },
    { name: 'Sarı', hex: '#EAB308' },
    { name: 'Pembe', hex: '#EC4899' },
    { name: 'Mor', hex: '#9333EA' }
  ];

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h4 className="font-semibold text-gray-900">{title}</h4>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {expandedSections[sectionKey] && <div>{children}</div>}
    </div>
  );

  return (
    <div className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-6 sticky top-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-bold text-gray-900">Filtreler</h3>
          {activeCount > 0 && (
            <span className="px-2 py-1 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Temizle
          </button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection title="Fiyat Aralığı" sectionKey="price">
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={filters.priceRange.max}
            onChange={(e) => handlePriceChange('max', e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Min</label>
              <input
                type="number"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min="0"
                max={filters.priceRange.max}
              />
            </div>
            <span className="text-gray-400 mt-5">-</span>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Max</label>
              <input
                type="number"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min={filters.priceRange.min}
                max="10000"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600 text-center">
            {filters.priceRange.min} TL - {filters.priceRange.max} TL
          </div>
        </div>
      </FilterSection>

      {/* Vendors */}
      <FilterSection title="Butikler" sectionKey="vendors">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {vendors.map(vendor => (
            <label
              key={vendor.id}
              className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.vendorIds.includes(vendor.id)}
                  onChange={() => toggleArrayFilter('vendorIds', vendor.id)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700">{vendor.shopName}</span>
              </div>
              <span className="text-xs text-gray-400">({vendor.productCount})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Sizes */}
      <FilterSection title="Beden" sectionKey="sizes">
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => toggleArrayFilter('sizes', size)}
              className={`px-3 py-2 rounded-md border-2 text-sm font-medium transition-all ${
                filters.sizes.includes(size)
                  ? 'bg-indigo-600 text-white border-indigo-600 scale-105'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Renk" sectionKey="colors">
        <div className="flex flex-wrap gap-3">
          {colors.map(color => (
            <button
              key={color.name}
              onClick={() => toggleArrayFilter('colors', color.name)}
              className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                filters.colors.includes(color.name)
                  ? 'border-indigo-600 scale-110 shadow-lg'
                  : 'border-gray-300 hover:scale-105'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {filters.colors.includes(color.name) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full shadow-md" />
                </div>
              )}
            </button>
          ))}
        </div>
        {filters.colors.length > 0 && (
          <div className="mt-2 text-xs text-gray-600">
            Seçili: {filters.colors.join(', ')}
          </div>
        )}
      </FilterSection>

      {/* Stock & Sale */}
      <div className="space-y-3 mb-4">
        <label className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              inStock: e.target.checked
            }))}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">
            Sadece stokta olanlar
          </span>
        </label>

        <label className="flex items-center p-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={filters.onSale}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              onSale: e.target.checked
            }))}
            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
          />
          <span className="ml-3 text-sm font-medium text-red-700">
            İndirimli ürünler
          </span>
        </label>
      </div>

      {/* Rating */}
      <FilterSection title="Minimum Puan" sectionKey="rating">
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              onClick={() => setFilters(prev => ({
                ...prev,
                minRating: prev.minRating === rating ? 0 : rating
              }))}
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                filters.minRating === rating
                  ? 'bg-indigo-50 text-indigo-600 border-2 border-indigo-200'
                  : 'hover:bg-gray-50 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center">
                <span className="text-yellow-400">{'★'.repeat(rating)}</span>
                <span className="text-gray-300">{'★'.repeat(5 - rating)}</span>
              </div>
              <span className="ml-2 text-sm font-medium">& üzeri</span>
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

export default FilterSidebar;

import { X } from 'lucide-react';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const getActiveFilters = () => {
    const active = [];

    // Price range
    if (filters.priceRange.min > 0 || filters.priceRange.max < 10000) {
      active.push({
        type: 'priceRange',
        label: `${filters.priceRange.min} TL - ${filters.priceRange.max} TL`,
        value: null
      });
    }

    // Vendors
    filters.vendorIds.forEach(id => {
      active.push({
        type: 'vendorIds',
        label: `Butik: ${id}`,
        value: id
      });
    });

    // Sizes
    filters.sizes.forEach(size => {
      active.push({
        type: 'sizes',
        label: `Beden: ${size}`,
        value: size
      });
    });

    // Colors
    filters.colors.forEach(color => {
      active.push({
        type: 'colors',
        label: `Renk: ${color}`,
        value: color
      });
    });

    // In stock
    if (filters.inStock) {
      active.push({
        type: 'inStock',
        label: 'Stokta',
        value: null
      });
    }

    // On sale
    if (filters.onSale) {
      active.push({
        type: 'onSale',
        label: 'İndirimli',
        value: null
      });
    }

    // Rating
    if (filters.minRating > 0) {
      active.push({
        type: 'minRating',
        label: `${filters.minRating}+ Yıldız`,
        value: null
      });
    }

    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">
          Aktif Filtreler ({activeFilters.length})
        </h3>
        <button
          onClick={onClearAll}
          className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
        >
          Tümünü Temizle
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <button
            key={`${filter.type}-${filter.value}-${index}`}
            onClick={() => onRemoveFilter(filter.type, filter.value)}
            className="inline-flex items-center space-x-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors group"
          >
            <span>{filter.label}</span>
            <X className="w-3.5 h-3.5 group-hover:text-indigo-900 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;

import { Grid, List } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ActiveFilters from '../components/category/ActiveFilters';
import Breadcrumb from '../components/category/Breadcrumb';
import CategoryCard from '../components/category/CategoryCard';
import CategoryHero from '../components/category/CategoryHero';
import FilterSidebar from '../components/category/FilterSidebar';
import CategoryIcon from '../components/common/CategoryIcon';
import ProductCard from '../components/product/ProductCard';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import { useShop } from '../context/ShopContext';
import {
    getBreadcrumbs,
    getCategoryBySlug,
    getCategoryPath,
    getSubcategoryBySlug
} from '../data/categories';

const CategoryPage = () => {
  const { gender, category, subcategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, favorites, toggleFavorite } = useShop();
  
  // View mode (grid/list)
  const [viewMode, setViewMode] = useState('grid');
  
  // Filtered products
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Infinite scroll state
  const [displayCount, setDisplayCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  // URL'e göre kategori verisi al
  const categoryData = getCategoryBySlug(gender);
  const subcategoryData = category ? getSubcategoryBySlug(gender, category) : null;
  
  // Breadcrumb oluştur
  const breadcrumbs = getBreadcrumbs(gender, category, subcategory);

  // Infinite scroll implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && displayCount < products.length) {
          setIsLoading(true);
          setTimeout(() => {
            setDisplayCount(prev => Math.min(prev + 12, products.length));
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading, displayCount, products.length]);

  // Reset display count when route changes
  useEffect(() => {
    setDisplayCount(12);
  }, [gender, category, subcategory]);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(12);
  }, [searchParams]);

  // 1. Ana Kategori Görünümü (/shop/women)
  if (!category) {
    if (!categoryData) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Kategori Bulunamadı</h2>
            <p className="text-gray-600">Aradığınız kategori mevcut değil.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbs} />
          
          <CategoryHero
            title={categoryData.title}
            description={categoryData.description}
            image={categoryData.image}
          />

          {/* Alt Kategoriler Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategoriler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(categoryData.subcategories).map((sub) => (
                <CategoryCard
                  key={sub.slug}
                  title={sub.title}
                  description={sub.description}
                  image={sub.image}
                  itemCount={sub.items?.length}
                  path={getCategoryPath(gender, sub.slug)}
                />
              ))}
            </div>
          </div>

          {/* Öne Çıkan Ürünler */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Öne Çıkan Ürünler</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.slice(0, displayCount).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.some(fav => fav.id === product.id)}
                  onToggleFavorite={() => toggleFavorite(product)}
                />
              ))}
            </div>

            {/* Infinite Scroll Loader */}
            {displayCount < products.length && (
              <div ref={loaderRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
                {isLoading && (
                  <>
                    <SkeletonLoader variant="product-card" />
                    <SkeletonLoader variant="product-card" />
                    <SkeletonLoader variant="product-card" />
                    <SkeletonLoader variant="product-card" />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Alt Kategori Görünümü (/shop/women/clothing)
  if (!subcategory) {
    if (!subcategoryData) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Kategori Bulunamadı</h2>
            <p className="text-gray-600">Aradığınız alt kategori mevcut değil.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbs} />

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {subcategoryData.title}
            </h1>
            <p className="text-gray-600">{subcategoryData.description}</p>
          </div>

          {/* Alt Kategori Items - Chip Tarzı */}
          {subcategoryData.items && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {subcategoryData.items.map((item) => (
                  <a
                    key={item.slug}
                    href={getCategoryPath(gender, category, item.slug)}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-200"
                  >
                    <CategoryIcon iconName={item.icon} className="w-5 h-5 text-gray-700" />
                    <span className="font-medium text-gray-900">{item.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Ürünler Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Tüm Ürünler ({products.length})
              </h2>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option>En Popüler</option>
                <option>En Yeni</option>
                <option>Fiyat: Düşükten Yükseğe</option>
                <option>Fiyat: Yüksekten Düşüğe</option>
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.slice(0, displayCount).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.some(fav => fav.id === product.id)}
                  onToggleFavorite={() => toggleFavorite(product)}
                />
              ))}
            </div>

            {/* Infinite Scroll Loader */}
            {displayCount < products.length && (
              <div ref={loaderRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
                {isLoading && (
                  <>
                    <SkeletonLoader variant="product-card" />
                    <SkeletonLoader variant="product-card" />
                    <SkeletonLoader variant="product-card" />
                    <SkeletonLoader variant="product-card" />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Filter handler
  const handleFilterChange = (newFilters) => {
    // Gerçek uygulamada burada API'ye istek atılacak
    // Şimdilik mock filtreleme yapıyoruz
    let filtered = [...products];
    
    // Price filter
    filtered = filtered.filter(p => 
      p.price >= newFilters.priceRange.min && 
      p.price <= newFilters.priceRange.max
    );
    
    // Stock filter
    if (newFilters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }
    
    // Sale filter
    if (newFilters.onSale) {
      filtered = filtered.filter(p => p.salePrice && p.salePrice < p.price);
    }
    
    setFilteredProducts(filtered);
  };

  // Remove single filter
  const handleRemoveFilter = (filterType, value) => {
    const params = new URLSearchParams(searchParams);
    
    if (filterType === 'priceRange') {
      params.delete('priceMin');
      params.delete('priceMax');
    } else if (filterType === 'inStock' || filterType === 'onSale' || filterType === 'minRating') {
      params.delete(filterType === 'inStock' ? 'inStock' : filterType === 'onSale' ? 'onSale' : 'rating');
    } else if (value) {
      // For array filters (vendors, sizes, colors)
      const key = filterType === 'vendorIds' ? 'vendor' : 
                  filterType === 'sizes' ? 'size' : 'color';
      const currentValues = params.getAll(key).filter(v => v !== value);
      params.delete(key);
      currentValues.forEach(v => params.append(key, v));
    }
    
    setSearchParams(params);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    const params = new URLSearchParams();
    const currentSort = searchParams.get('sort');
    if (currentSort) params.set('sort', currentSort);
    setSearchParams(params);
  };

  // Sort handler
  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    setSearchParams(params);
  };

  // 3. En Alt Kategori / Ürün Listesi (/shop/women/clothing/dresses)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbs} />

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {breadcrumbs[breadcrumbs.length - 1]?.title || 'Ürünler'}
          </h1>
          <p className="text-gray-600">{filteredProducts.length} ürün bulundu</p>
        </div>

        {/* Active Filters */}
        <ActiveFilters
          filters={{
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
          }}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Grid Görünüm"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Liste Görünüm"
                >
                  <List className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-500 ml-2">
                  {filteredProducts.length} ürün
                </span>
              </div>

              <select
                value={searchParams.get('sort') || 'relevance'}
                onChange={handleSortChange}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="relevance">En Uygun</option>
                <option value="newest">En Yeni</option>
                <option value="price_asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price_desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="popular">En Popüler</option>
                <option value="rating">En Yüksek Puan</option>
                <option value="discount">En Çok İndirim</option>
              </select>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Ürün Bulunamadı
                </h3>
                <p className="text-gray-600 mb-6">
                  Seçtiğiniz filtrelere uygun ürün bulunamamıştır.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 && (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredProducts.slice(0, displayCount).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isFavorite={favorites.some((fav) => fav.id === product.id)}
                      onToggleFavorite={() => toggleFavorite(product)}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Progress Indicator */}
                <div className="mt-8 text-center text-sm text-gray-600">
                  {displayCount} / {filteredProducts.length} ürün gösteriliyor
                </div>

                {/* Infinite Scroll Loader */}
                {displayCount < filteredProducts.length && (
                  <div ref={loaderRef} className="mt-8">
                    {isLoading && (
                      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {[...Array(4)].map((_, i) => (
                          <SkeletonLoader key={i} variant="product-card" />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

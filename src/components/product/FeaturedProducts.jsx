import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import SkeletonLoader from '../ui/SkeletonLoader';

const FeaturedProducts = ({ products = [], title = 'Öne Çıkan Ürünler' }) => {
  const isLoading = !products || products.length === 0;

  // Show only first 8 products if more are provided
  const displayedProducts = products.slice(0, 8);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-gray-600">
              Özenle seçilmiş koleksiyonlardan ürünler
            </p>
          </div>
          
          <Link
            to="/shop"
            className="hidden md:flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            <span>Tümünü Gör</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLoader key={index} variant="product-card" />
            ))
          ) : (
            displayedProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
              />
            ))
          )}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            to="/shop"
            className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            <span>Tüm Ürünler</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

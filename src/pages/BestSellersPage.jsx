import { TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import { useShop } from '../context/ShopContextNew';

const BestSellersPage = () => {
  const { products } = useShop();
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching best sellers - in real app, this would be from API
    setTimeout(() => {
      // Get random products for demo
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setBestSellers(shuffled.slice(0, 12));
      setLoading(false);
    }, 500);
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Çok Satanlar</h1>
            <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              YENİ
            </span>
          </div>
          <p className="text-gray-600">
            En çok satılan ve beğenilen ürünleri keşfedin
          </p>
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">{bestSellers.length}+</p>
              <p className="text-purple-100">Trend Ürün</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">1000+</p>
              <p className="text-purple-100">Mutlu Müşteri</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">4.8★</p>
              <p className="text-purple-100">Ortalama Puan</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <div key={`bestseller-${product._id}-${index}`} className="relative">
              {/* Best Seller Badge */}
              {index < 3 && (
                <div className="absolute top-2 left-2 z-10">
                  <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    #{index + 1}
                  </div>
                </div>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bestSellers.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz Çok Satan Ürün Yok</h3>
            <p className="text-gray-600">Yakında en popüler ürünleri burada göreceksiniz</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellersPage;

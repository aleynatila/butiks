import { Headphones, RefreshCw, Shield, Sparkles, Truck } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/common/Testimonials';
import Hero from '../components/layout/Hero';
import FeaturedProducts from '../components/product/FeaturedProducts';
import { useShop } from '../context/ShopContext';

// Import videos directly for better Vite handling
import accesoriesVideo from '/accesories.mp4?url';
import manVideo from '/man.mp4?url';
import shoesVideo from '/shoes.mp4?url';
import womanVideo from '/woman.mp4?url';

const CATEGORIES = [
  {
    id: 1,
    name: 'Kadın',
    video: womanVideo,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
    link: '/shop/women'
  },
  {
    id: 2,
    name: 'Erkek',
    video: manVideo,
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&q=80',
    link: '/shop/men'
  },
  {
    id: 3,
    name: 'Aksesuar',
    video: accesoriesVideo,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    link: '/shop/accessories'
  },
  {
    id: 4,
    name: 'Ayakkabı',
    video: shoesVideo,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    link: '/shop/shoes'
  },
];

const CategoryCard = ({ category }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    console.log('🎯 Mouse entered:', category.name);
    setIsHovered(true);
    
    if (videoRef.current) {
      console.log('✅ Video element exists, readyState:', videoRef.current.readyState);
      videoRef.current.currentTime = 0;
      videoRef.current.play()
        .then(() => console.log('✅ Video playing'))
        .catch(err => console.error('❌ Play failed:', err));
    }
  };
  
  const handleMouseLeave = () => {
    console.log('👋 Mouse left:', category.name);
    setIsHovered(false);
    
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  
  return (
    <Link
      to={category.link}
      className="relative aspect-[16/9] overflow-hidden rounded-lg block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fallback Image - z-index 1 */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)', filter: isHovered ? 'brightness(1.1)' : 'brightness(1)', transition: 'all 0.7s' }}
      />

      {/* Video Element - z-index 2 */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-[2] pointer-events-none"
        style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.5s' }}
        muted
        playsInline
        loop
        preload="auto"
      >
        <source src={category.video} type="video/mp4" />
      </video>

      {/* Overlay - z-index 3 */}
      <div 
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          opacity: isHovered ? 0.75 : 1,
          transition: 'opacity 0.3s'
        }}
      />
      
      {/* Category Title - z-index 4 */}
      <div className="absolute inset-0 flex items-center justify-center z-[4] pointer-events-none">
        <h3 
          className="text-white text-2xl font-bold"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s' }}
        >
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

const HomePage = () => {
  const { products, addToCart, toggleFavorite, favorites } = useShop();
  
  const favoriteIds = favorites.map(fav => fav.id);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Truck className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ücretsiz Kargo</h3>
                <p className="text-sm text-gray-600">100 TL üzeri siparişlerde</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Güvenli Ödeme</h3>
                <p className="text-sm text-gray-600">%100 güvenli işlemler</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <RefreshCw className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Kolay İade</h3>
                <p className="text-sm text-gray-600">30 gün iade garantisi</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Headphones className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">7/24 Destek</h3>
                <p className="text-sm text-gray-600">Özel müşteri hizmetleri</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Kategoriler
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => {
              return <CategoryCard key={category.id} category={category} />;
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts
        products={products}
        title="Yeni Ürünler"
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        favorites={favoriteIds}
      />

      {/* Style Finder CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stilini Keşfet
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Stil Bulucu'muz, benzersiz zevkine uygun ürünleri keşfetmene yardımcı olsun. 
            Özenle seçilmiş koleksiyonumuza göz at ve mükemmel gardırobunu oluştur.
          </p>
          <Link
            to="/style-finder"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            Stil Bulucuyu Dene
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

{/* Newsletter Banner
<section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
      Bültenimize Katıl
    </h2>
    <p className="text-lg text-indigo-100 mb-8">
      Özel teklifler, stil ipuçları ve yeni ürünlerden ilk sen haberdar ol
    </p>
    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        placeholder="E-posta adresiniz"
        className="flex-1 px-6 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
      />
      <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
        Abone Ol
      </button>
    </div>
  </div>
</section>
*/}

    </div>
  );
};

export default HomePage;

import { createContext, useContext, useEffect, useState } from 'react';
import storage from '../utils/storage';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop, ShopProvider içinde kullanılmalıdır');
  }
  return context;
};

// Gelişmiş detaylarla mock ürün verisi
const MOCK_URUNLER = [
  { 
    id: 1, 
    name: 'Oversize Keten Blazer', 
    price: 189, 
    originalPrice: 249, 
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    category: 'Dış Giyim',
    isNew: true,
    isSoldOut: false,
    inStock: true,
    rating: 4.5,
    reviews: 23,
    reviewCount: 23,
    stock: 5,
    stockCount: 5,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Bej', 'Lacivert', 'Siyah'],
    description: 'Her mevsim için mükemmel zamansz oversize keten blazer. Doğal olarak nefes alan ve her yıkamada yumuflayan premium keten kumaştan üretilmiştir.'
  },
  { 
    id: 2, 
    name: 'Vintage Denim Ceket', 
    price: 145, 
    image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Dış Giyim',
    isNew: false,
    isSoldOut: false,
    inStock: true,
    rating: 5,
    reviews: 45,
    reviewCount: 45,
    stock: 12,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Mavi', 'Siyah'],
    description: 'Otantik yıkama ve eskitme ile vintage tarzda denim ceket. Her şeyle uyumlu gardrop esast.'
  },
  { 
    id: 3, 
    name: 'Kapitone Deri Çanta', 
    price: 320, 
    originalPrice: 400, 
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    category: 'Aksesuar',
    isNew: true,
    isSoldOut: false,
    inStock: true,
    rating: 4.8,
    reviews: 67,
    reviewCount: 67,
    stock: 8,
    colors: ['Siyah', 'Kahverengi', 'Bordo'],
    description: 'Altın rengi donanımla lüks kapitone deri çanta. Çok bölmeli ve ayarlanabilir askl olarak çok yönlü kullanım sunar.'
  },
  { 
    id: 4, 
    name: 'Retro Spor Ayakkab', 
    price: 175, 
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    category: 'Ayakkab',
    isNew: false,
    isSoldOut: false,
    inStock: true,
    rating: 4.3,
    reviews: 89,
    reviewCount: 89,
    stock: 15,
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
    colors: ['Beyaz', 'Gri', 'Lacivert'],
    description: 'Modern konfor teknolojisiyle retro tarzda koşu ayakkablar. Günlük kullanm için stil ve performansn mükemmel karışm.'
  },
  { 
    id: 5, 
    name: 'İpek Askl Elbise', 
    price: 225, 
    originalPrice: 275, 
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    category: 'Elbise',
    isNew: true,
    isSoldOut: false,
    inStock: true,
    rating: 4.9,
    reviews: 34,
    reviewCount: 34,
    stock: 6,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Siyah', 'Fıldış', 'Zümrüt'],
    description: 'Zarif asklar ve bias kesimli siluetle şik ipek elbise. Güzel dökülür ve cilde karş lüks hissettrir.'
  },
  { 
    id: 6, 
    name: 'Y2K Kelebek Crop Top', 
    price: 68, 
    image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Üst Giyim',
    isNew: false,
    isSoldOut: true,
    inStock: false,
    rating: 4.6,
    reviews: 12,
    reviewCount: 12,
    stock: 0,
    sizes: ['XS', 'S', 'M'],
    colors: ['Pembe', 'Mor'],
    description: 'Nostaljik Y2K kelebek baskl esnek kumaşl crop top. Her kıyafete kişilik katan eğlenceli parça.'
  },
  { 
    id: 7, 
    name: 'Kısa Kargo Pantolon', 
    price: 95, 
    originalPrice: 120, 
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    category: 'Alt Giyim',
    isNew: false,
    isSoldOut: false,
    inStock: true,
    rating: 4.4,
    reviews: 56,
    reviewCount: 56,
    stock: 20,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Haki', 'Siyah', 'Bej'],
    description: 'Çok cepl ve ayarlanabilir bell fonksiyonel kısa kargo pantolon. Tüm gün konforlu pamuklu karışm.'
  },
  { 
    id: 8, 
    name: 'Kaşmir Triko Kazak', 
    price: 285, 
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    category: 'Triko',
    isNew: true,
    isSoldOut: false,
    inStock: true,
    rating: 5,
    reviews: 28,
    reviewCount: 28,
    stock: 3,
    stockCount: 3,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Krem', 'Gri', 'Deve Tüyü'],
    description: 'Fitilli detaylarla saf kaşmir triko kazak. İnamlmaz yumuflak ve scak, katmanl veya tek başna giymek için mükemmel.'
  },
];

export const ShopProvider = ({ children }) => {
  // Ürünler Durumu
  const [products] = useState(MOCK_URUNLER);

  // Ürünü temizle - circular reference önleme
  const sanitizeProduct = (product) => {
    if (!product || typeof product !== 'object') return null;
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      isNew: product.isNew,
      rating: product.rating,
      reviews: product.reviews,
      sizes: product.sizes,
      colors: product.colors,
      description: product.description,
      stock: product.stock,
      inStock: product.inStock,
      quantity: product.quantity
    };
  };

  // Sepet Durumu
  const [cart, setCart] = useState(() => {
    try {
      const kaydedilmisSepet = storage.getItem('butiks-sepet');
      if (!kaydedilmisSepet) return [];
      const parsed = JSON.parse(kaydedilmisSepet);
      return Array.isArray(parsed) ? parsed.map(sanitizeProduct).filter(Boolean) : [];
    } catch (e) {
      console.warn('Sepet verisi bozuk, temizleniyor');
      storage.removeItem('butiks-sepet');
      return [];
    }
  });

  // Favoriler Durumu
  const [favorites, setFavorites] = useState(() => {
    try {
      const kaydedilmisFavoriler = storage.getItem('butiks-favoriler');
      if (!kaydedilmisFavoriler) return [];
      const parsed = JSON.parse(kaydedilmisFavoriler);
      return Array.isArray(parsed) ? parsed.map(sanitizeProduct).filter(Boolean) : [];
    } catch (e) {
      console.warn('Favori verisi bozuk, temizleniyor');
      storage.removeItem('butiks-favoriler');
      return [];
    }
  });

  // Bildirim mesajlar
  const [toast, setToast] = useState(null);

  // Sepeti localStorage'a kaydet
  useEffect(() => {
    try {
      const cleanCart = cart.map(sanitizeProduct).filter(Boolean);
      storage.setItem('butiks-sepet', JSON.stringify(cleanCart));
    } catch (error) {
      console.error('Sepet kaydedilemedi:', error);
    }
  }, [cart]);

  // Favorileri localStorage'a kaydet
  useEffect(() => {
    try {
      const cleanFavorites = favorites.map(sanitizeProduct).filter(Boolean);
      storage.setItem('butiks-favoriler', JSON.stringify(cleanFavorites));
    } catch (error) {
      console.error('Favoriler kaydedilemedi:', error);
    }
  }, [favorites]);

  // Bildirim göster
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Sepete ekle
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    
    setCart((oncekiSepet) => {
      const mevcutUrun = oncekiSepet.find((item) => item.id === product.id);
      
      if (mevcutUrun) {
        showToast('Sepetteki miktar güncellendi', 'info');
        return oncekiSepet.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        showToast('Sepete eklendi!', 'success');
        // Sadece gerekli alanları al, circular reference'ları önle
        const cleanProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          sizes: product.sizes,
          colors: product.colors,
          quantity
        };
        return [...oncekiSepet, cleanProduct];
      }
    });
  };

  // Sepetten çkar
  const removeFromCart = (productId) => {
    setCart((oncekiSepet) => oncekiSepet.filter((item) => item.id !== productId));
    showToast('Sepetten çkarldt', 'info');
  };

  // Sepet ürün miktar güncelle
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart((oncekiSepet) =>
      oncekiSepet.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Sepeti temizle
  const clearCart = () => {
    setCart([]);
    showToast('Sepet temizlendi', 'info');
  };

  // Favori değiştir
  const toggleFavorite = (product) => {
    if (!product || !product.id) return;
    
    setFavorites((oncekiFavoriler) => {
      const favoriMi = oncekiFavoriler.some((fav) => fav.id === product.id);
      
      if (favoriMi) {
        showToast('Favorilerden çıkarıldı', 'info');
        return oncekiFavoriler.filter((fav) => fav.id !== product.id);
      } else {
        showToast('Favorilere eklendi!', 'success');
        // Sadece gerekli alanları al, circular reference'ları önle
        const cleanProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          isNew: product.isNew,
          rating: product.rating,
          reviews: product.reviews,
          sizes: product.sizes,
          colors: product.colors,
          description: product.description,
          stock: product.stock,
          inStock: product.inStock
        };
        return [...oncekiFavoriler, cleanProduct];
      }
    });
  };

  // Ürün favori mi kontrol et
  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.id === productId);
  };

  // Sepet toplam hesapla
  const getCartTotal = () => {
    return cart.reduce((toplam, item) => toplam + item.price * item.quantity, 0);
  };

  // Sepet ürün says hesapla
  const getCartCount = () => {
    return cart.reduce((sayi, item) => sayi + item.quantity, 0);
  };

  const value = {
    products,
    cart,
    favorites,
    toast,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleFavorite,
    isFavorite,
    getCartTotal,
    getCartCount,
    showToast,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

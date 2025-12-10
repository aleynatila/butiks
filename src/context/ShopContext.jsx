import { createContext, useContext, useEffect, useState } from 'react';

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
    image: 'https://images.unsplash.com/photo-1550614000-4b9519e09d5c?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1485968579169-a6b7c4452c8f?w=800&q=80',
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

  // Sepet Durumu
  const [cart, setCart] = useState(() => {
    const kaydedilmisSepet = localStorage.getItem('butiks-sepet');
    return kaydedilmisSepet ? JSON.parse(kaydedilmisSepet) : [];
  });

  // Favoriler Durumu
  const [favorites, setFavorites] = useState(() => {
    const kaydedilmisFavoriler = localStorage.getItem('butiks-favoriler');
    return kaydedilmisFavoriler ? JSON.parse(kaydedilmisFavoriler) : [];
  });

  // Bildirim mesajlar
  const [toast, setToast] = useState(null);

  // Sepeti localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('butiks-sepet', JSON.stringify(cart));
  }, [cart]);

  // Favorileri localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('butiks-favoriler', JSON.stringify(favorites));
  }, [favorites]);

  // Bildirim göster
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Sepete ekle
  const addToCart = (product, quantity = 1) => {
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
        return [...oncekiSepet, { ...product, quantity }];
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
    setFavorites((oncekiFavoriler) => {
      const favoriMi = oncekiFavoriler.some((fav) => fav.id === product.id);
      
      if (favoriMi) {
        showToast('Favorilerden çkarldt', 'info');
        return oncekiFavoriler.filter((fav) => fav.id !== product.id);
      } else {
        showToast('Favorilere eklendi!', 'success');
        return [...oncekiFavoriler, product];
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

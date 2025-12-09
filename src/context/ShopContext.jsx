import { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

// Mock products data with enhanced details
const MOCK_PRODUCTS = [
  { 
    id: 1, 
    name: 'Oversized Linen Blazer', 
    price: 189, 
    originalPrice: 249, 
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    category: 'Outerwear',
    isNew: true,
    isSoldOut: false,
    inStock: true,
    rating: 4.5,
    reviews: 23,
    reviewCount: 23,
    stock: 5,
    stockCount: 5,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Navy', 'Black'],
    description: 'A timeless oversized linen blazer perfect for any season. Made from premium linen fabric that breathes naturally and gets softer with every wear.'
  },
  { 
    id: 2, 
    name: 'Vintage Denim Jacket', 
    price: 145, 
    image: 'https://images.unsplash.com/photo-1550614000-4b9519e09d5c?w=800&q=80',
    category: 'Outerwear',
    isNew: false,
    isSoldOut: false,
    inStock: true,
    rating: 5,
    reviews: 45,
    reviewCount: 45,
    stock: 12,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Black'],
    description: 'Classic vintage-inspired denim jacket with authentic wash and distressing. A wardrobe essential that pairs with everything.'
  },
  { 
    id: 3, 
    name: 'Quilted Leather Bag', 
    price: 320, 
    originalPrice: 400, 
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    category: 'Accessories',
    isNew: true,
    isSoldOut: false,
    inStock: true,
    rating: 4.8,
    reviews: 67,
    reviewCount: 67,
    stock: 8,
    colors: ['Black', 'Brown', 'Burgundy'],
    description: 'Luxurious quilted leather bag with gold-tone hardware. Features multiple compartments and adjustable strap for versatile styling.'
  },
  { 
    id: 4, 
    name: 'Retro Runner Sneakers', 
    price: 175, 
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    category: 'Shoes',
    isNew: false,
    isSoldOut: false,
    inStock: true,
    rating: 4.3,
    reviews: 89,
    reviewCount: 89,
    stock: 15,
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    colors: ['White', 'Grey', 'Navy'],
    description: 'Retro-inspired running sneakers with modern comfort technology. Perfect blend of style and performance for everyday wear.'
  },
  { 
    id: 5, 
    name: 'Silk Slip Dress', 
    price: 225, 
    originalPrice: 275, 
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    category: 'Dresses',
    isNew: true,
    isSoldOut: false,
    inStock: true,
    rating: 4.9,
    reviews: 34,
    reviewCount: 34,
    stock: 6,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Ivory', 'Emerald'],
    description: 'Elegant silk slip dress with delicate straps and bias-cut silhouette. Drapes beautifully and feels luxurious against the skin.'
  },
  { 
    id: 6, 
    name: 'Y2K Butterfly Crop Top', 
    price: 68, 
    image: 'https://images.unsplash.com/photo-1485968579169-a6b7c4452c8f?w=800&q=80',
    category: 'Tops',
    isNew: false,
    isSoldOut: true,
    inStock: false,
    rating: 4.6,
    reviews: 12,
    reviewCount: 12,
    stock: 0,
    sizes: ['XS', 'S', 'M'],
    colors: ['Pink', 'Purple'],
    description: 'Nostalgic Y2K butterfly print crop top with stretchy fabric. A fun throwback piece that adds personality to any outfit.'
  },
  { 
    id: 7, 
    name: 'Cropped Cargo Pants', 
    price: 95, 
    originalPrice: 120, 
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    category: 'Bottoms',
    isNew: false,
    isSoldOut: false,
    inStock: true,
    rating: 4.4,
    reviews: 56,
    reviewCount: 56,
    stock: 20,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Olive', 'Black', 'Khaki'],
    description: 'Functional cropped cargo pants with multiple pockets and adjustable waist. Comfortable cotton blend for all-day wear.'
  },
  { 
    id: 8, 
    name: 'Cashmere Knit Sweater', 
    price: 285, 
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    category: 'Knitwear',
    isNew: true,
    isSoldOut: false,
    inStock: true,
    rating: 5,
    reviews: 28,
    reviewCount: 28,
    stock: 3,
    stockCount: 3,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Grey', 'Camel'],
    description: 'Pure cashmere knit sweater with ribbed details. Incredibly soft and warm, perfect for layering or wearing alone.'
  },
];

export const ShopProvider = ({ children }) => {
  // Products State
  const [products] = useState(MOCK_PRODUCTS);

  // Cart State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('butiks-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Favorites State
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('butiks-favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('butiks-cart', JSON.stringify(cart));
  }, [cart]);

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem('butiks-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        showToast('Updated quantity in cart', 'info');
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        showToast('Added to cart!', 'success');
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showToast('Removed from cart', 'info');
  };

  // Update cart item quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'info');
  };

  // Toggle favorite
  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === product.id);
      
      if (isFavorite) {
        showToast('Removed from favorites', 'info');
        return prevFavorites.filter((fav) => fav.id !== product.id);
      } else {
        showToast('Added to favorites!', 'success');
        return [...prevFavorites, product];
      }
    });
  };

  // Check if product is favorite
  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.id === productId);
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Get cart count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
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

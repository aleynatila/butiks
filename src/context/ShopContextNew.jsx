import { createContext, useContext, useEffect, useState } from 'react';
import {
    authService,
    categoryService,
    orderService,
    productService,
    wishlistService,
} from '../services/api.service';
import storage from '../utils/storage';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  // Auth state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Products state
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  // Categories state
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Cart state (localStorage)
  const [cart, setCart] = useState(() => {
    const savedCart = storage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Toast notifications state
  const [toast, setToast] = useState(null);

  // Initialize auth on mount
  useEffect(() => {
    const initAuth = () => {
      const token = authService.getToken();
      const savedUser = authService.getCurrentUser();

      if (token && savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);
      }

      setAuthLoading(false);
    };

    initAuth();
  }, []);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Load wishlist when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      loadWishlist();
    } else {
      setWishlist([]);
    }
  }, [isAuthenticated]);

  // Save cart to localStorage
  useEffect(() => {
    storage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ===== AUTH FUNCTIONS =====

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, user: response.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, user: response.user };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setWishlist([]);
      setCart([]);
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await authService.updateProfile(userData);
      setUser(response.user);
      return { success: true, user: response.user };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message || 'Update failed' };
    }
  };

  // ===== PRODUCT FUNCTIONS =====

  const loadProducts = async (filters = {}) => {
    setProductsLoading(true);
    try {
      const response = await productService.getProducts(filters);
      setProducts(response.products || []);
      return response;
    } catch (error) {
      console.error('Load products error:', error);
      return { products: [], error: error.message };
    } finally {
      setProductsLoading(false);
    }
  };

  const loadFeaturedProducts = async () => {
    try {
      console.log('🔄 Fetching featured products from API...');
      const response = await productService.getFeaturedProducts();
      console.log('✅ Featured products response:', response);
      console.log('📦 Products array:', response.products);
      setFeaturedProducts(response.products || []);
      return response;
    } catch (error) {
      console.error('❌ Load featured products error:', error);
      console.error('Error details:', error.response?.data || error.message);
      return { products: [] };
    }
  };

  const getProductBySlug = async (slug) => {
    try {
      const response = await productService.getProductBySlug(slug);
      return response.product;
    } catch (error) {
      console.error('Get product error:', error);
      return null;
    }
  };

  // ===== CATEGORY FUNCTIONS =====

  const loadCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await categoryService.getCategories();
      setCategories(response.categories || []);
      return response;
    } catch (error) {
      console.error('Load categories error:', error);
      return { categories: [] };
    } finally {
      setCategoriesLoading(false);
    }
  };

  // ===== CART FUNCTIONS =====

  const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevCart,
        {
          id: product.id || product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0]?.url || product.image,
          selectedSize,
          selectedColor,
          quantity,
          slug: product.slug,
          vendorId: product.vendorId?._id || product.vendorId,
        },
      ];
    });
  };

  const removeFromCart = (productId, selectedSize = null, selectedColor = null) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );
  };

  const updateCartQuantity = (productId, quantity, selectedSize = null, selectedColor = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // ===== WISHLIST FUNCTIONS =====

  const loadWishlist = async () => {
    if (!isAuthenticated) return;

    setWishlistLoading(true);
    try {
      const response = await wishlistService.getWishlist();
      setWishlist(response.wishlist?.items || []);
    } catch (error) {
      console.error('Load wishlist error:', error);
    } finally {
      setWishlistLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    if (!isAuthenticated) {
      return { success: false, error: 'Please login to add to wishlist' };
    }

    try {
      await wishlistService.addToWishlist(productId);
      await loadWishlist();
      return { success: true };
    } catch (error) {
      console.error('Add to wishlist error:', error);
      return { success: false, error: error.message || 'Failed to add to wishlist' };
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated) return;

    try {
      await wishlistService.removeFromWishlist(productId);
      await loadWishlist();
      return { success: true };
    } catch (error) {
      console.error('Remove from wishlist error:', error);
      return { success: false, error: error.message };
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.productId?._id === productId || item.productId === productId);
  };

  // Toggle favorite (wrapper for backward compatibility)
  const toggleFavorite = async (productId) => {
    if (isInWishlist(productId)) {
      return await removeFromWishlist(productId);
    } else {
      return await addToWishlist(productId);
    }
  };

  // ===== TOAST FUNCTIONS =====

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ===== ORDER FUNCTIONS =====

  const createOrder = async (orderData) => {
    try {
      const response = await orderService.createOrder(orderData);
      if (response.order) {
        clearCart();
      }
      return { success: true, order: response.order };
    } catch (error) {
      console.error('Create order error:', error);
      return { success: false, error: error.message || 'Order creation failed' };
    }
  };

  const getMyOrders = async (params = {}) => {
    try {
      const response = await orderService.getMyOrders(params);
      return response;
    } catch (error) {
      console.error('Get orders error:', error);
      return { orders: [] };
    }
  };

  const value = {
    // Auth
    user,
    isAuthenticated,
    authLoading,
    login,
    register,
    logout,
    updateProfile,

    // Products
    products,
    featuredProducts,
    productsLoading,
    loadProducts,
    loadFeaturedProducts,
    getProductBySlug,

    // Categories
    categories,
    categoriesLoading,
    loadCategories,

    // Cart
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getCartCount: getCartItemsCount, // Alias for backward compatibility

    // Wishlist
    wishlist,
    favorites: wishlist, // Alias for backward compatibility
    wishlistLoading,
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleFavorite,

    // Toast
    toast,
    showToast,

    // Orders
    createOrder,
    getMyOrders,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

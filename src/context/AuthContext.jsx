import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/api.service';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = authService.getToken();
        const savedUser = authService.getCurrentUser();

        if (token && savedUser) {
          // Verify token is still valid by fetching current user
          try {
            const response = await authService.getMe();
            setUser(response.user);
            setIsAuthenticated(true);
          } catch (error) {
            // Token invalid, clear it
            console.warn('Token verification failed:', error.message);
            authService.logout();
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, user: response.user };
    } catch (error) {
      const errorMessage = error.message || 'Giriş başarısız';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, user: response.user };
    } catch (error) {
      const errorMessage = error.message || 'Kayıt başarısız';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    }
  };

  const updateProfile = async (userData) => {
    try {
      setError(null);
      const response = await authService.updateProfile(userData);
      setUser(response.user);
      return { success: true, user: response.user };
    } catch (error) {
      const errorMessage = error.message || 'Profil güncellenemedi';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      setError(null);
      await authService.changePassword(passwordData);
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Şifre değiştirilemedi';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      await authService.forgotPassword(email);
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'İşlem başarısız';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const resetPassword = async (token, password) => {
    try {
      setError(null);
      await authService.resetPassword(token, password);
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Şifre sıfırlanamadı';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const refreshUserData = async () => {
    try {
      const response = await authService.getMe();
      setUser(response.user);
      return response.user;
    } catch (error) {
      console.error('Refresh user data error:', error);
      return null;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isVendor = () => {
    return user?.role === 'vendor';
  };

  const isCustomer = () => {
    return user?.role === 'customer' || !user?.role;
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    refreshUserData,
    clearError,
    isAdmin,
    isVendor,
    isCustomer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

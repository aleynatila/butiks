# API Integration Guide - Vendor Panel

## 🎯 Overview
This guide explains how to integrate the vendor panel with your backend API. All pages currently use mock data and are ready for API integration.

## 📁 Service Layer

### Vendor API Service (`/src/services/vendor.api.js`)
Complete service file with all vendor endpoints:

```javascript
import vendorAPI from '../services/vendor.api.js';

// Dashboard
vendorAPI.dashboard.getOverview()
vendorAPI.dashboard.getRecentOrders(limit)

// Products
vendorAPI.products.getAll(filters)
vendorAPI.products.getById(id)
vendorAPI.products.create(productData)
vendorAPI.products.update(id, productData)
vendorAPI.products.delete(id)
vendorAPI.products.bulkUpdate(productIds, updateData)
vendorAPI.products.bulkDelete(productIds)
vendorAPI.products.uploadImages(productId, images)
vendorAPI.products.deleteImage(productId, imageId)

// Orders
vendorAPI.orders.getAll(filters)
vendorAPI.orders.getById(id)
vendorAPI.orders.updateStatus(id, status, note)
vendorAPI.orders.addTracking(id, trackingData)
vendorAPI.orders.addNote(id, note)

// Analytics
vendorAPI.analytics.getOverview(dateRange)
vendorAPI.analytics.getRevenue(period)
vendorAPI.analytics.getTopProducts(limit)
vendorAPI.analytics.getCategoryPerformance()

// Finance
vendorAPI.finance.getBalance()
vendorAPI.finance.getTransactions(filters)
vendorAPI.finance.requestWithdrawal(amount, method)
vendorAPI.finance.getWithdrawals()
vendorAPI.finance.getInvoices()
vendorAPI.finance.downloadInvoice(invoiceId)

// Customers
vendorAPI.customers.getAll(filters)
vendorAPI.customers.getById(id)
vendorAPI.customers.getCustomerOrders(customerId)

// Messages
vendorAPI.messages.getConversations()
vendorAPI.messages.getMessages(conversationId)
vendorAPI.messages.send(conversationId, message, attachments)
vendorAPI.messages.markAsRead(conversationId)

// Profile
vendorAPI.profile.get()
vendorAPI.profile.update(profileData)
vendorAPI.profile.updatePassword(currentPassword, newPassword)
vendorAPI.profile.uploadLogo(file)
vendorAPI.profile.uploadBanner(file)
vendorAPI.profile.getNotifications()
vendorAPI.profile.updateNotifications(settings)
```

## 🔧 Integration Steps

### 1. VendorDashboard Integration

**File:** `/src/pages/vendor/VendorDashboard.jsx`

Replace mock data with API calls:

```javascript
import { useEffect, useState } from 'react';
import vendorAPI from '../../services/vendor.api';

const VendorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [overview, orders] = await Promise.all([
        vendorAPI.dashboard.getOverview(),
        vendorAPI.dashboard.getRecentOrders(10),
      ]);
      
      setStats(overview.stats);
      setRecentOrders(orders.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Rest of component...
};
```

**Expected API Response:**
```json
{
  "success": true,
  "stats": {
    "revenue": 245680,
    "orders": 1234,
    "products": 156,
    "customers": 892
  }
}
```

### 2. VendorProducts Integration

**File:** `/src/pages/vendor/products/VendorProducts.jsx`

```javascript
import { useEffect, useState } from 'react';
import vendorAPI from '../../../services/vendor.api';

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
    page: 1,
    limit: 20,
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await vendorAPI.products.getAll(filters);
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async (productIds) => {
    try {
      await vendorAPI.products.bulkDelete(productIds);
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error('Bulk delete failed:', err);
    }
  };

  const handleBulkUpdate = async (productIds, updateData) => {
    try {
      await vendorAPI.products.bulkUpdate(productIds, updateData);
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error('Bulk update failed:', err);
    }
  };

  // Rest of component...
};
```

**Expected API Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Product Name",
      "sku": "PRD-001",
      "price": 299,
      "discountPrice": 199,
      "stock": 50,
      "category": "Category",
      "status": "active",
      "image": "url",
      "sales": 45
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "pages": 8
  }
}
```

### 3. VendorProductCreate Integration

**File:** `/src/pages/vendor/products/VendorProductCreate.jsx`

```javascript
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import vendorAPI from '../../../services/vendor.api';

const VendorProductCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    // ... rest of fields
  });

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId) => {
    try {
      const response = await vendorAPI.products.getById(productId);
      setProductData(response.data);
    } catch (err) {
      console.error('Error fetching product:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      if (id) {
        await vendorAPI.products.update(id, productData);
      } else {
        const response = await vendorAPI.products.create(productData);
        
        // Upload images if any
        if (images.length > 0) {
          await vendorAPI.products.uploadImages(response.data.id, images);
        }
      }
      
      navigate('/vendor/products');
    } catch (err) {
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  // Rest of component...
};
```

### 4. VendorOrders Integration

**File:** `/src/pages/vendor/orders/VendorOrders.jsx`

```javascript
const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    dateFrom: '',
    dateTo: '',
  });

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const fetchOrders = async () => {
    try {
      const response = await vendorAPI.orders.getAll(filters);
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  // Rest of component...
};
```

### 5. VendorOrderDetail Integration

**File:** `/src/pages/vendor/orders/VendorOrderDetail.jsx`

```javascript
const VendorOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await vendorAPI.orders.getById(id);
      setOrder(response.data);
    } catch (err) {
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      await vendorAPI.orders.updateStatus(id, newStatus);
      fetchOrder(); // Refresh
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleAddTracking = async (trackingNumber, carrier) => {
    try {
      await vendorAPI.orders.addTracking(id, {
        trackingNumber,
        carrier,
      });
      fetchOrder(); // Refresh
    } catch (err) {
      console.error('Error adding tracking:', err);
    }
  };

  // Rest of component...
};
```

### 6. VendorAnalytics Integration

**File:** `/src/pages/vendor/VendorAnalytics.jsx`

```javascript
const VendorAnalytics = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      const [overview, revenue, products, categories] = await Promise.all([
        vendorAPI.analytics.getOverview(dateRange),
        vendorAPI.analytics.getRevenue('monthly'),
        vendorAPI.analytics.getTopProducts(5),
        vendorAPI.analytics.getCategoryPerformance(),
      ]);

      setStats(overview.stats);
      setRevenueData(revenue.data);
      setTopProducts(products.data);
      setCategoryData(categories.data);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    }
  };

  // Rest of component...
};
```

### 7. VendorFinance Integration

**File:** `/src/pages/vendor/VendorFinance.jsx`

```javascript
const VendorFinance = () => {
  const [balanceData, setBalanceData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = async () => {
    try {
      const [balance, trans, with, inv] = await Promise.all([
        vendorAPI.finance.getBalance(),
        vendorAPI.finance.getTransactions(),
        vendorAPI.finance.getWithdrawals(),
        vendorAPI.finance.getInvoices(),
      ]);

      setBalanceData(balance.data);
      setTransactions(trans.data);
      setWithdrawals(with.data);
      setInvoices(inv.data);
    } catch (err) {
      console.error('Error fetching finance data:', err);
    }
  };

  const handleWithdrawal = async (amount) => {
    try {
      await vendorAPI.finance.requestWithdrawal(amount, 'bank_transfer');
      fetchFinanceData(); // Refresh
    } catch (err) {
      console.error('Error requesting withdrawal:', err);
    }
  };

  const handleDownloadInvoice = async (invoiceId) => {
    try {
      const blob = await vendorAPI.finance.downloadInvoice(invoiceId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      a.click();
    } catch (err) {
      console.error('Error downloading invoice:', err);
    }
  };

  // Rest of component...
};
```

### 8. VendorMessages Integration + WebSocket

**File:** `/src/pages/vendor/VendorMessages.jsx`

```javascript
import { useEffect, useState, useRef } from 'react';
import vendorAPI from '../../services/vendor.api';

const VendorMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    fetchConversations();
    initializeWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const initializeWebSocket = () => {
    const token = localStorage.getItem('authToken');
    wsRef.current = new WebSocket(`ws://localhost:5000/ws/messages?token=${token}`);

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'new_message') {
        setMessages((prev) => [...prev, data.message]);
        updateConversationList(data.conversationId);
      }
    };
  };

  const fetchConversations = async () => {
    try {
      const response = await vendorAPI.messages.getConversations();
      setConversations(response.data);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await vendorAPI.messages.getMessages(conversationId);
      setMessages(response.data);
      await vendorAPI.messages.markAsRead(conversationId);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSendMessage = async (text, attachments = []) => {
    try {
      await vendorAPI.messages.send(selectedConversation.id, text, attachments);
      // Message will be added via WebSocket
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  // Rest of component...
};
```

### 9. VendorProfile Integration

**File:** `/src/pages/vendor/VendorProfile.jsx`

```javascript
const VendorProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchNotifications();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await vendorAPI.profile.get();
      setProfileData(response.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await vendorAPI.profile.getNotifications();
      setNotifications(response.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const handleUpdateProfile = async (data) => {
    try {
      await vendorAPI.profile.update(data);
      fetchProfile(); // Refresh
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleUploadLogo = async (file) => {
    try {
      const response = await vendorAPI.profile.uploadLogo(file);
      setProfileData({ ...profileData, logo: response.data.url });
    } catch (err) {
      console.error('Error uploading logo:', err);
    }
  };

  const handleChangePassword = async (currentPassword, newPassword) => {
    try {
      await vendorAPI.profile.updatePassword(currentPassword, newPassword);
      // Show success message
    } catch (err) {
      console.error('Error changing password:', err);
    }
  };

  // Rest of component...
};
```

## 🔐 Environment Variables

Create `.env` file in root:

```bash
VITE_API_URL=http://localhost:5000/api/v1
VITE_WS_URL=ws://localhost:5000
```

## 🚀 Testing API Integration

### 1. Test with Backend Running

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd ..
npm run dev
```

### 2. Check Console for API Calls

Open browser DevTools → Network tab to see API requests

### 3. Handle Errors Gracefully

```javascript
try {
  const response = await vendorAPI.products.getAll();
  // Success
} catch (err) {
  if (err.message === 'Unauthorized') {
    // Redirect to login
    navigate('/auth');
  } else {
    // Show error toast
    setError(err.message);
  }
}
```

## 📊 Loading States

Add loading states to all pages:

```javascript
if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );
}
```

## ✅ Next Steps

1. **Start Backend**: `cd backend && npm run dev`
2. **Update Environment**: Add `VITE_API_URL` to `.env`
3. **Replace Mock Data**: Follow integration steps above for each page
4. **Test Each Feature**: Products, Orders, Analytics, etc.
5. **Add Error Handling**: Toast notifications for success/error
6. **Implement WebSocket**: Real-time messages and notifications
7. **Add Loading States**: Skeleton loaders and spinners
8. **Test Bulk Operations**: Product bulk edit/delete
9. **Test File Uploads**: Product images, logo, banner
10. **Production Build**: `npm run build`

## 🎉 Summary

All vendor pages are API-ready with:
- ✅ Complete service layer (`vendor.api.js`)
- ✅ Bulk operations modal
- ✅ Product selection system
- ✅ Loading & error states structure
- ✅ WebSocket support for messages
- ✅ File upload endpoints
- ✅ Protected routes with authentication

Simply replace the mock data with API calls and you're live! 🚀

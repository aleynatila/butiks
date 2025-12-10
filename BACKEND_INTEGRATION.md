# 🚀 Backend Integration Guide

## Overview
This frontend application is **backend-ready** with a complete API service layer, data models, and authentication structure. This guide will help you integrate with any backend (Node.js, Python, PHP, etc.).

---

## 📁 Project Structure for Backend Integration

```
src/
├── services/
│   └── api.js          # All API calls organized by feature
├── models/
│   └── index.js        # Data models/classes for type safety
├── context/
│   └── ShopContext.jsx # Global state management (can be enhanced)
└── components/         # UI components ready for real data
```

---

## 🔧 Quick Start Integration

### 1. Configure API Endpoint

Update the API base URL in `src/services/api.js`:

```javascript
// Current (line 8):
const BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

// For production:
const BASE_URL = process.env.VITE_API_URL || 'https://api.yoursite.com/v1';
```

Create `.env` file in project root:
```env
VITE_API_URL=http://localhost:3000/api
```

### 2. Authentication Flow

The app expects JWT token-based authentication:

**Login Response (from backend):**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Token Storage:**
- Automatically stored in `localStorage` as `authToken`
- Automatically included in API requests via `Authorization: Bearer {token}` header

---

## 📡 API Endpoints Required

### Authentication Endpoints

| Method | Endpoint | Request Body | Response |
|--------|----------|--------------|----------|
| POST | `/auth/register` | `{email, password, firstName, lastName}` | `{token, user}` |
| POST | `/auth/login` | `{email, password}` | `{token, user}` |
| POST | `/auth/logout` | - | `{message}` |
| GET | `/auth/profile` | - | `{user}` |
| PUT | `/auth/profile` | `{firstName, lastName, phone, etc}` | `{user}` |
| POST | `/auth/password-reset` | `{email}` | `{message}` |
| POST | `/auth/password-reset/confirm` | `{token, newPassword}` | `{message}` |

### Product Endpoints

| Method | Endpoint | Query Params | Response |
|--------|----------|--------------|----------|
| GET | `/products` | `?category=&minPrice=&maxPrice=&inStock=&sort=` | `{products: [], total, page, limit}` |
| GET | `/products/:id` | - | `{product}` |
| GET | `/products/featured` | - | `{products: []}` |
| GET | `/products/search` | `?q=searchQuery` | `{products: []}` |
| GET | `/products/:id/related` | - | `{products: []}` |
| GET | `/products/:id/reviews` | `?page=1` | `{reviews: [], total}` |
| POST | `/products/:id/reviews` | `{rating, title, comment, images[]}` | `{review}` |

### Cart Endpoints

| Method | Endpoint | Request Body | Response |
|--------|----------|--------------|----------|
| GET | `/cart` | - | `{items: [], subtotal, total}` |
| POST | `/cart/items` | `{productId, quantity, options}` | `{cart}` |
| PUT | `/cart/items/:id` | `{quantity}` | `{cart}` |
| DELETE | `/cart/items/:id` | - | `{cart}` |
| DELETE | `/cart` | - | `{message}` |
| POST | `/cart/promo` | `{code}` | `{cart, discount}` |

### Order Endpoints

| Method | Endpoint | Request Body | Response |
|--------|----------|--------------|----------|
| GET | `/orders` | `?page=1&limit=10` | `{orders: [], total}` |
| GET | `/orders/:id` | - | `{order}` |
| POST | `/orders` | `{items, shippingAddress, billingAddress, paymentMethod, etc}` | `{order}` |
| POST | `/orders/:id/cancel` | - | `{order}` |
| GET | `/orders/:id/tracking` | - | `{trackingInfo}` |

### Wishlist Endpoints

| Method | Endpoint | Request Body | Response |
|--------|----------|--------------|----------|
| GET | `/wishlist` | - | `{items: []}` |
| POST | `/wishlist/items` | `{productId}` | `{wishlist}` |
| DELETE | `/wishlist/items/:productId` | - | `{wishlist}` |
| POST | `/wishlist/items/:productId/move-to-cart` | - | `{cart, wishlist}` |

### Address Endpoints

| Method | Endpoint | Request Body | Response |
|--------|----------|--------------|----------|
| GET | `/addresses` | - | `{addresses: []}` |
| POST | `/addresses` | `{firstName, lastName, address, city, state, zip, country, phone}` | `{address}` |
| PUT | `/addresses/:id` | `{...addressFields}` | `{address}` |
| DELETE | `/addresses/:id` | - | `{message}` |
| POST | `/addresses/:id/default` | - | `{address}` |

### Newsletter Endpoint

| Method | Endpoint | Request Body | Response |
|--------|----------|--------------|----------|
| POST | `/newsletter/subscribe` | `{email}` | `{message}` |
| POST | `/newsletter/unsubscribe` | `{email}` | `{message}` |

---

## 📦 Data Models Reference

All data models are defined in `src/models/index.js`. Use these as reference for your database schema:

### Product Model
```javascript
{
  id: string | number,
  name: string,
  slug: string,
  description: string,
  price: number,
  originalPrice: number | null,
  category: string,
  categoryId: string | number,
  brand: string,
  sku: string,
  images: string[],
  colors: string[],
  sizes: string[],
  stock: number,
  inStock: boolean,
  isNew: boolean,
  isFeatured: boolean,
  rating: number (0-5),
  reviewCount: number,
  specifications: object,
  createdAt: Date,
  updatedAt: Date
}
```

### User Model
```javascript
{
  id: string | number,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  avatar: string,
  addresses: Address[],
  createdAt: Date,
  emailVerified: boolean
}
```

### Order Model
```javascript
{
  id: string | number,
  orderNumber: string,
  userId: string | number,
  items: CartItem[],
  subtotal: number,
  tax: number,
  shipping: number,
  discount: number,
  total: number,
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded',
  paymentMethod: string,
  shippingAddress: Address,
  billingAddress: Address,
  trackingNumber: string,
  createdAt: Date
}
```

See `src/models/index.js` for complete model definitions.

---

## 🔌 Integration Steps

### Step 1: Replace Mock Data
Current mock products are in `src/context/ShopContext.jsx` (line 14-200).

**Replace with API calls:**
```javascript
// In ShopContext.jsx
import { productAPI } from '../services/api';

// Replace MOCK_PRODUCTS with:
const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await productAPI.getAll();
      setProducts(data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
  
  fetchProducts();
}, []);
```

### Step 2: Connect Cart to Backend
Currently cart uses localStorage. Update to sync with backend:

```javascript
// In ShopContext.jsx - addToCart function
const addToCart = async (product) => {
  try {
    const data = await cartAPI.addItem(product.id, 1, {
      size: selectedSize,
      color: selectedColor
    });
    setCart(data.cart.items);
  } catch (error) {
    console.error('Failed to add to cart:', error);
  }
};
```

### Step 3: Implement User Authentication
Update login/register in `src/pages/AuthPage.jsx`:

```javascript
import { authAPI } from '../services/api';

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await authAPI.login({
      email: loginData.email,
      password: loginData.password
    });
    // Token is automatically stored
    navigate('/account');
  } catch (error) {
    setErrors({ form: error.message });
  }
};
```

### Step 4: Protect Routes
Create a ProtectedRoute component:

```javascript
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// In App.jsx
<Route 
  path="/account" 
  element={
    <ProtectedRoute>
      <AccountPage />
    </ProtectedRoute>
  } 
/>
```

### Step 5: Handle Checkout
Update checkout in `src/pages/CheckoutPageNew.jsx`:

```javascript
import { orderAPI } from '../services/api';

const handlePlaceOrder = async () => {
  try {
    const orderData = {
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress: shippingInfo,
      shippingMethod: shippingMethod,
      paymentMethod: 'card',
      paymentInfo: {
        last4: paymentInfo.cardNumber.slice(-4)
      }
    };
    
    const response = await orderAPI.createOrder(orderData);
    
    // Clear cart
    clearCart();
    
    // Show success
    navigate(`/order-confirmation/${response.order.orderNumber}`);
  } catch (error) {
    showToast({ message: error.message, type: 'error' });
  }
};
```

---

## 🗄️ Database Schema Recommendations

### PostgreSQL Schema

```sql
-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  avatar TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  category_id INTEGER REFERENCES categories(id),
  brand VARCHAR(100),
  sku VARCHAR(100) UNIQUE,
  images JSONB,
  colors JSONB,
  sizes JSONB,
  stock INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT TRUE,
  is_new BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  rating DECIMAL(2, 1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  specifications JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id),
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  shipping DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  payment_status VARCHAR(20) DEFAULT 'pending',
  payment_method VARCHAR(50),
  shipping_address JSONB,
  billing_address JSONB,
  tracking_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items Table
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  selected_size VARCHAR(10),
  selected_color VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  user_id INTEGER REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  images JSONB,
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  helpful INTEGER DEFAULT 0,
  not_helpful INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Addresses Table
CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  phone VARCHAR(20),
  is_default BOOLEAN DEFAULT FALSE,
  type VARCHAR(20) DEFAULT 'shipping',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### MongoDB Schema

```javascript
// User Schema
{
  _id: ObjectId,
  email: String (unique),
  passwordHash: String,
  firstName: String,
  lastName: String,
  phone: String,
  avatar: String,
  emailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}

// Product Schema
{
  _id: ObjectId,
  name: String,
  slug: String (unique),
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  categoryId: ObjectId,
  brand: String,
  sku: String (unique),
  images: [String],
  colors: [String],
  sizes: [String],
  stock: Number,
  inStock: Boolean,
  isNew: Boolean,
  isFeatured: Boolean,
  rating: Number,
  reviewCount: Number,
  specifications: Object,
  createdAt: Date,
  updatedAt: Date
}

// Order Schema
{
  _id: ObjectId,
  orderNumber: String (unique),
  userId: ObjectId,
  items: [{
    productId: ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    selectedSize: String,
    selectedColor: String
  }],
  subtotal: Number,
  tax: Number,
  shipping: Number,
  discount: Number,
  total: Number,
  status: String,
  paymentStatus: String,
  paymentMethod: String,
  shippingAddress: Object,
  billingAddress: Object,
  trackingNumber: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security Considerations

### Backend Requirements:
1. **Password Hashing**: Use bcrypt with salt rounds >= 10
2. **JWT Tokens**: Set expiration (e.g., 7 days)
3. **Rate Limiting**: Implement on login/register endpoints
4. **Input Validation**: Validate all user inputs server-side
5. **CORS**: Configure properly for your domain
6. **HTTPS**: Always use HTTPS in production
7. **SQL Injection**: Use parameterized queries
8. **XSS Protection**: Sanitize user-generated content

### Environment Variables:
```env
# Backend .env example
DATABASE_URL=postgresql://user:password@localhost:5432/butiks
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRATION=7d
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://yourfrontend.com
```

---

## 🧪 Testing Backend Integration

### 1. Test with Postman
Import this collection structure:
- Auth: Login, Register, Profile
- Products: List, Detail, Search
- Cart: Add, Update, Remove
- Orders: Create, List, Detail

### 2. Mock API Response
During development, you can use services like:
- **JSON Server**: Quick REST API mock
- **MockAPI.io**: Online API mocker
- **Mirage JS**: In-app API mocking

### 3. Error Handling
The frontend expects errors in this format:
```json
{
  "error": true,
  "message": "Error description here"
}
```

---

## 📱 State Management

### Current: React Context API
- Located in `src/context/ShopContext.jsx`
- Manages: cart, favorites, products, toast notifications

### For Larger Apps: Consider
- **Redux Toolkit**: More structured state management
- **Zustand**: Lightweight alternative
- **React Query**: For server state management (recommended!)

### React Query Integration Example:
```bash
npm install @tanstack/react-query
```

```javascript
import { useQuery } from '@tanstack/react-query';
import { productAPI } from '../services/api';

function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productAPI.getAll
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Render products */}</div>;
}
```

---

## 🚀 Deployment Checklist

### Frontend
- [ ] Update `VITE_API_URL` to production API
- [ ] Build for production: `npm run build`
- [ ] Test build: `npm run preview`
- [ ] Deploy to Vercel/Netlify/AWS S3

### Backend
- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Enable CORS for frontend domain
- [ ] Set up SSL certificate
- [ ] Configure reverse proxy (Nginx/Apache)
- [ ] Deploy to AWS/Heroku/DigitalOcean

### DNS & SSL
- [ ] Point domain to backend server
- [ ] Configure SSL certificate (Let's Encrypt)
- [ ] Update API_URL in frontend

---

## 📚 Additional Resources

### API Service (`src/services/api.js`)
- All API functions are documented with JSDoc comments
- Error handling is centralized
- Auth tokens are automatically attached

### Data Models (`src/models/index.js`)
- Class-based models with helper methods
- Can be converted to TypeScript interfaces
- Includes validation methods

### Frontend Components
- All components accept real data props
- Loading states implemented
- Error boundaries recommended

---

## 🆘 Common Integration Issues

### Issue: CORS Errors
**Solution**: Configure backend CORS:
```javascript
// Express.js example
app.use(cors({
  origin: 'https://yourfrontend.com',
  credentials: true
}));
```

### Issue: Authentication Not Working
**Solution**: Check:
1. Token is being sent in Authorization header
2. Token format: `Bearer {token}`
3. Backend validates token correctly

### Issue: Images Not Loading
**Solution**: 
1. Use full URLs for images
2. Or serve images from `/public/uploads/` on backend
3. Configure S3/Cloudinary for image hosting

---

## 📞 Support

For questions about frontend integration:
1. Check `src/services/api.js` for API function documentation
2. Review `src/models/index.js` for data structures
3. See component examples in `src/pages/` and `src/components/`

**Ready to integrate? Start with Step 1 above!** 🚀

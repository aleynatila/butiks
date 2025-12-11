# 🛍️ Butiks Backend API

Node.js + Express + MongoDB backend for Butiks marketplace platform.

## 📦 Tech Stack

- **Runtime**: Node.js v20.19.6 (ES Modules)
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB 7.0.26 with Mongoose 8.0.3
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer + Cloudinary ⭐
- **Email**: Nodemailer ⭐
- **Deployment**: Systemd service (Ubuntu 22.04)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and update values:
```bash
cp .env.example .env
```

Required configurations:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Strong secret key for JWT
- `CORS_ORIGIN`: Your frontend URL (http://localhost:5173)

### 3. Start MongoDB
Make sure MongoDB is running locally or use MongoDB Atlas.

**Local MongoDB:**
```bash
# On Ubuntu/Debian
sudo systemctl start mongod

# On macOS with Homebrew
brew services start mongodb-community
```

**MongoDB Atlas:**
Update `MONGODB_URI` in `.env` with your Atlas connection string.

### 4. Run Development Server
```bash
npm run dev
```

Server will start on http://localhost:3000

### 5. Test API
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "success",
  "message": "Server is running",
  "timestamp": "2025-12-10T..."
}
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── models/
│   │   ├── User.js             # User model (customer, vendor, admin)
│   │   ├── Vendor.js           # Vendor/shop model
│   │   ├── Product.js          # Product model with variants
│   │   ├── Category.js         # Hierarchical category model
│   │   ├── Order.js            # Multi-vendor order model
│   │   ├── Review.js           # Product reviews & ratings ⭐
│   │   └── Wishlist.js         # User favorites ⭐
│   ├── controllers/
│   │   ├── authController.js   # Authentication handlers
│   │   ├── productController.js # Product CRUD
│   │   ├── vendorController.js # Vendor management
│   │   ├── orderController.js  # Order processing
│   │   ├── reviewController.js # Reviews & ratings ⭐
│   │   ├── wishlistController.js # Wishlist management ⭐
│   │   └── adminController.js  # Admin analytics ⭐
│   ├── routes/
│   │   ├── auth.js             # Auth endpoints
│   │   ├── products.js         # Product endpoints
│   │   ├── vendors.js          # Vendor endpoints
│   │   ├── orders.js           # Order endpoints
│   │   ├── categories.js       # Category endpoints
│   │   ├── upload.js           # File upload endpoints ⭐
│   │   ├── reviews.js          # Review endpoints ⭐
│   │   ├── wishlist.js         # Wishlist endpoints ⭐
│   │   └── admin.js            # Admin endpoints ⭐
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication & authorization
│   │   ├── errorHandler.js     # Global error handler
│   │   └── upload.js           # Multer file upload config ⭐
│   ├── services/
│   │   ├── cloudinary.js       # Cloudinary integration ⭐
│   │   └── email.js            # Email notifications ⭐
│   ├── utils/
│   │   └── jwt.js              # JWT utilities
│   └── server.js               # Express app entry point
├── .env                        # Environment variables (not in git)
├── .env.example                # Environment template
├── butiks-api.service          # Systemd service file
├── README.md                   # Main documentation
├── SERVICE.md                  # Service management guide
├── API_TESTING.md              # API testing examples
├── ADVANCED_FEATURES.md        # Advanced features docs ⭐
├── IMPLEMENTATION_SUMMARY.md   # Complete summary ⭐
├── package.json
└── .gitignore
```

## 🗄️ Database Models (8 Models)

### User
- Customer, Vendor, or Admin accounts
- Email/password authentication with bcrypt
- Profile information with avatar
- Address and phone number

### Vendor
- Shop/boutique information
- Business details (tax ID, bank account)
- Statistics (sales, revenue, ratings, reviews)
- Status workflow (pending → active/rejected/suspended)
- Commission rate (default 15%)

### Product
- Product details with variants (size, color, etc.)
- Dynamic attributes based on category
- Multiple images with order priority
- Pricing (regular, compare, cost)
- Stock management with low-stock alerts
- SEO fields (title, description, keywords)
- Statistics (views, favorites, sales, ratings)

### Category
- Hierarchical categories (parent/subcategories)
- Dynamic attribute schemas per category
- Filterable attributes with types
- Icon and image support

### Order
- Multi-vendor order processing
- Split orders by vendor automatically
- Individual status per vendor (pending, processing, shipped, delivered)
- Payment tracking
- Commission calculation and vendor payout
- Shipping information

### Review ⭐ NEW
- Product ratings (1-5 stars)
- Review title and comment
- Review images
- Verified purchase badge
- Helpful votes system
- Vendor response capability
- Auto-update product/vendor ratings

### Wishlist ⭐ NEW
- User favorites list
- Track when products added
- Filter out inactive products
- Quick add/remove functionality

### Email Templates ⭐ NEW
- Welcome email
- Order confirmation
- Vendor approval/rejection
- Order status updates
- Password reset

## 🔐 Authentication

API uses JWT bearer token authentication:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- `customer`: Regular users who can shop
- `vendor`: Shop owners who can manage products
- `admin`: Platform administrators

## 📡 API Endpoints (60+ Endpoints)

### Authentication (8 endpoints)
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/profile
PUT    /api/v1/auth/profile
PUT    /api/v1/auth/change-password
POST   /api/v1/auth/request-password-reset
POST   /api/v1/auth/reset-password
```

### Products (8 endpoints)
```
GET    /api/v1/products                    # List with filters
GET    /api/v1/products/:slug              # Get by slug
POST   /api/v1/products                    # (vendor only)
PUT    /api/v1/products/:id                # (vendor only)
DELETE /api/v1/products/:id                # (vendor only)
GET    /api/v1/products/featured           # Featured products
GET    /api/v1/products/vendor/:vendorId   # Vendor's products
GET    /api/v1/products/category/:slug     # Category products
```

### Vendors (9 endpoints)
```
GET    /api/v1/vendors                     # List all
GET    /api/v1/vendors/:slug               # Get by slug
POST   /api/v1/vendors/apply               # Apply to become vendor
GET    /api/v1/vendors/me/profile          # (vendor only)
PUT    /api/v1/vendors/me/profile          # (vendor only)
GET    /api/v1/vendors/me/stats            # (vendor only)
PATCH  /api/v1/vendors/:id/approve         # (admin only)
PATCH  /api/v1/vendors/:id/reject          # (admin only)
PATCH  /api/v1/vendors/:id/suspend         # (admin only)
```

### Orders (6 endpoints)
```
POST   /api/v1/orders                      # Create order
GET    /api/v1/orders/my-orders            # Customer orders
GET    /api/v1/orders/:id                  # Order details
GET    /api/v1/orders/vendor/orders        # (vendor only)
PATCH  /api/v1/orders/:id/vendor-status    # (vendor only)
PATCH  /api/v1/orders/:id/cancel           # Cancel order
```

### Categories (5 endpoints)
```
GET    /api/v1/categories                  # List all
GET    /api/v1/categories/:slug            # Get by slug
POST   /api/v1/categories                  # (admin only)
PUT    /api/v1/categories/:id              # (admin only)
DELETE /api/v1/categories/:id              # (admin only)
```

### File Upload (4 endpoints) ⭐ NEW
```
POST   /api/v1/upload/image                # Single image
POST   /api/v1/upload/images               # Multiple (max 10)
POST   /api/v1/upload/product-images       # (vendor only)
DELETE /api/v1/upload/image/:publicId      # Delete image
```

### Reviews (7 endpoints) ⭐ NEW
```
POST   /api/v1/reviews                     # Create review
GET    /api/v1/reviews/product/:productId  # Product reviews
GET    /api/v1/reviews/vendor/:vendorId    # Vendor reviews
PUT    /api/v1/reviews/:id                 # Update review
DELETE /api/v1/reviews/:id                 # Delete review
POST   /api/v1/reviews/:id/helpful         # Mark helpful
POST   /api/v1/reviews/:id/response        # (vendor only)
```

### Wishlist (5 endpoints) ⭐ NEW
```
GET    /api/v1/wishlist                    # Get wishlist
POST   /api/v1/wishlist/:productId         # Add to wishlist
DELETE /api/v1/wishlist/:productId         # Remove from wishlist
DELETE /api/v1/wishlist                    # Clear wishlist
GET    /api/v1/wishlist/check/:productId   # Check if in wishlist
```

### Admin Dashboard (6 endpoints) ⭐
```
GET    /api/v1/admin/dashboard/overview    # (admin only)
GET    /api/v1/admin/analytics/sales       # (admin only)
GET    /api/v1/admin/analytics/vendors     # (admin only)
GET    /api/v1/admin/analytics/customers   # (admin only)
GET    /api/v1/admin/analytics/products    # (admin only)
GET    /api/v1/admin/reports/revenue       # (admin only)
```

### Payments (6 endpoints) ⭐ NEW
```
POST   /api/v1/payments/create-intent      # Create payment intent
POST   /api/v1/payments/confirm            # Confirm payment & create order
GET    /api/v1/payments/status/:id         # Get payment status
POST   /api/v1/payments/customer           # Create Stripe customer
POST   /api/v1/payments/refund             # (admin only) Refund
POST   /api/v1/payments/webhook            # Stripe webhook (public)
```

**📖 Full API Documentation:**
- Core APIs: See `API_TESTING.md`
- Advanced Features: See `ADVANCED_FEATURES.md`
- Stripe Payments: See `STRIPE_INTEGRATION.md` ⭐ NEW

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- Use ES6+ features (ES Modules)
- Async/await for asynchronous operations
- Try/catch for error handling
- Use middleware for common operations

### Testing API with curl

**Register user:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent brute force attacks
- **Password Hashing**: bcrypt with salt rounds
- **JWT**: Stateless authentication
- **Input Validation**: express-validator
- **Error Handling**: Centralized error handling

## 🚧 Implementation Status

1. ✅ Basic server setup
2. ✅ Database models (User, Vendor, Product, Category, Order)
3. ✅ Authentication middleware (JWT, role-based)
4. ✅ Authentication routes & controllers
5. ✅ Product CRUD endpoints (with filtering, search)
6. ✅ Vendor management (apply, approve, stats)
7. ✅ Order processing (multi-vendor support)
8. ✅ Category management
9. ✅ Systemd service configuration
10. ⏳ File upload (Multer/Cloudinary) - TODO
11. ⏳ Payment integration (Stripe) - TODO
12. ⏳ Email notifications - TODO
13. ⏳ Reviews & ratings - TODO
14. ⏳ Wishlist/favorites - TODO

## 📝 Environment Variables

All required environment variables are documented in `.env.example`.

**Critical for production:**
- Change `JWT_SECRET` to a strong random string
- Use MongoDB Atlas or secure MongoDB instance
- Configure proper CORS origins
- Set up Cloudinary for image hosting
- Add Stripe production keys

## 🤝 Frontend Integration

This backend is designed to work with the React frontend in `/butiks`.

Frontend API service is already configured at `src/services/api.js` and expects:
- Base URL: `http://localhost:3000/api/v1`
- JWT bearer token authentication
- JSON request/response format

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Happy coding! 🚀**

# 🧪 Butiks API Test Guide

Complete API endpoint testing examples with curl commands.

## 🔐 Authentication Endpoints

### Register User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+905551234567"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Response includes JWT token - save it for authenticated requests!**

### Get Profile
```bash
curl -X GET http://localhost:5000/api/v1/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Profile
```bash
curl -X PUT http://localhost:5000/api/v1/auth/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "firstName": "Jane",
    "phone": "+905559876543"
  }'
```

### Change Password
```bash
curl -X PUT http://localhost:5000/api/v1/auth/password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "currentPassword": "password123",
    "newPassword": "newpassword456"
  }'
```

---

## 🏪 Vendor Endpoints

### Apply to Become Vendor
```bash
curl -X POST http://localhost:5000/api/v1/vendors/apply \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "shopName": "My Boutique",
    "description": "Quality fashion items",
    "email": "shop@myboutique.com",
    "phone": "+905551234567",
    "taxId": "1234567890",
    "address": {
      "street": "Main St. 123",
      "city": "Istanbul",
      "state": "Istanbul",
      "zipCode": "34000",
      "country": "Turkey"
    },
    "bankAccount": {
      "bankName": "Example Bank",
      "accountNumber": "1234567890",
      "iban": "TR330006100519786457841326"
    }
  }'
```

### Get All Vendors
```bash
curl -X GET "http://localhost:5000/api/v1/vendors?page=1&limit=12"
```

### Get Vendor by Slug
```bash
curl -X GET http://localhost:5000/api/v1/vendors/my-boutique
```

### Get My Vendor Profile (Vendor Only)
```bash
curl -X GET http://localhost:5000/api/v1/vendors/me/profile \
  -H "Authorization: Bearer VENDOR_TOKEN_HERE"
```

### Update Vendor Profile (Vendor Only)
```bash
curl -X PUT http://localhost:5000/api/v1/vendors/me/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VENDOR_TOKEN_HERE" \
  -d '{
    "description": "Updated description",
    "website": "https://myboutique.com",
    "social": {
      "instagram": "@myboutique",
      "facebook": "myboutiquepage"
    }
  }'
```

### Get Vendor Dashboard Stats (Vendor Only)
```bash
curl -X GET http://localhost:5000/api/v1/vendors/me/stats \
  -H "Authorization: Bearer VENDOR_TOKEN_HERE"
```

### Approve Vendor Application (Admin Only)
```bash
curl -X PATCH http://localhost:5000/api/v1/vendors/VENDOR_ID/approve \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### Reject Vendor Application (Admin Only)
```bash
curl -X PATCH http://localhost:5000/api/v1/vendors/VENDOR_ID/reject \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "reason": "Incomplete documentation"
  }'
```

### Suspend Vendor (Admin Only)
```bash
curl -X PATCH http://localhost:5000/api/v1/vendors/VENDOR_ID/suspend \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

---

## 📦 Product Endpoints

### Get All Products (with filters)
```bash
# Basic list
curl -X GET "http://localhost:5000/api/v1/products?page=1&limit=24"

# With filters
curl -X GET "http://localhost:5000/api/v1/products?category=CATEGORY_ID&minPrice=100&maxPrice=500&inStock=true&sort=-price"

# Search
curl -X GET "http://localhost:5000/api/v1/products?search=elbise&page=1"
```

### Get Single Product
```bash
curl -X GET http://localhost:5000/api/v1/products/PRODUCT_ID
```

### Get Featured Products
```bash
curl -X GET "http://localhost:5000/api/v1/products/featured?limit=12"
```

### Get Vendor's Products
```bash
curl -X GET "http://localhost:5000/api/v1/products/vendor/VENDOR_ID?page=1&limit=24"
```

### Get Related Products
```bash
curl -X GET http://localhost:5000/api/v1/products/PRODUCT_ID/related?limit=8
```

### Create Product (Vendor Only)
```bash
curl -X POST http://localhost:5000/api/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VENDOR_TOKEN_HERE" \
  -d '{
    "name": "Elegant Dress",
    "description": "Beautiful elegant dress for special occasions",
    "shortDescription": "Elegant dress",
    "categoryId": "CATEGORY_ID",
    "price": 299.99,
    "compareAtPrice": 499.99,
    "sku": "DRESS-001",
    "stock": 50,
    "images": [
      {
        "url": "https://example.com/image.jpg",
        "alt": "Dress photo",
        "order": 0,
        "isMain": true
      }
    ],
    "attributes": {
      "fabric": "Cotton",
      "size": "M",
      "color": "Black"
    },
    "tags": ["elegant", "dress", "evening"],
    "status": "active",
    "isPublished": true
  }'
```

### Update Product (Vendor Only)
```bash
curl -X PUT http://localhost:5000/api/v1/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VENDOR_TOKEN_HERE" \
  -d '{
    "price": 249.99,
    "stock": 45
  }'
```

### Delete Product (Vendor Only)
```bash
curl -X DELETE http://localhost:5000/api/v1/products/PRODUCT_ID \
  -H "Authorization: Bearer VENDOR_TOKEN_HERE"
```

---

## 📑 Category Endpoints

### Get All Categories
```bash
curl -X GET http://localhost:5000/api/v1/categories
```

### Get Category by Slug
```bash
curl -X GET http://localhost:5000/api/v1/categories/kadin-giyim
```

### Create Category (Admin Only)
```bash
curl -X POST http://localhost:5000/api/v1/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "name": "Womens Clothing",
    "description": "Clothing for women",
    "order": 1,
    "attributeSchema": [
      {
        "key": "fabric",
        "label": "Fabric",
        "type": "select",
        "options": ["Cotton", "Polyester", "Denim"],
        "required": true,
        "filterable": true,
        "displayOrder": 1
      }
    ]
  }'
```

### Update Category (Admin Only)
```bash
curl -X PUT http://localhost:5000/api/v1/categories/CATEGORY_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "description": "Updated description"
  }'
```

### Delete Category (Admin Only)
```bash
curl -X DELETE http://localhost:5000/api/v1/categories/CATEGORY_ID \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

---

## 🛒 Order Endpoints

### Create Order
```bash
curl -X POST http://localhost:5000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER_TOKEN_HERE" \
  -d '{
    "items": [
      {
        "productId": "PRODUCT_ID",
        "quantity": 2,
        "selectedSize": "M",
        "selectedColor": "Black"
      }
    ],
    "shippingAddress": {
      "firstName": "John",
      "lastName": "Doe",
      "addressLine1": "Main St 123",
      "city": "Istanbul",
      "state": "Istanbul",
      "postalCode": "34000",
      "country": "Turkey",
      "phone": "+905551234567"
    },
    "paymentMethod": "credit_card",
    "customerNote": "Please deliver to front door"
  }'
```

### Get My Orders
```bash
curl -X GET "http://localhost:5000/api/v1/orders?page=1&limit=10" \
  -H "Authorization: Bearer USER_TOKEN_HERE"
```

### Get Single Order
```bash
curl -X GET http://localhost:5000/api/v1/orders/ORDER_ID \
  -H "Authorization: Bearer USER_TOKEN_HERE"
```

### Get Vendor's Orders (Vendor Only)
```bash
curl -X GET "http://localhost:5000/api/v1/orders/vendor/my-orders?page=1&status=pending" \
  -H "Authorization: Bearer VENDOR_TOKEN_HERE"
```

### Update Order Status (Vendor Only)
```bash
curl -X PATCH http://localhost:5000/api/v1/orders/ORDER_ID/vendor-status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VENDOR_TOKEN_HERE" \
  -d '{
    "status": "shipped",
    "trackingNumber": "123456789"
  }'
```

**Available Statuses:**
- `pending` - Order placed
- `confirmed` - Order confirmed by vendor
- `processing` - Being prepared
- `shipped` - Shipped to customer
- `delivered` - Delivered
- `cancelled` - Cancelled
- `refunded` - Refunded

### Cancel Order
```bash
curl -X POST http://localhost:5000/api/v1/orders/ORDER_ID/cancel \
  -H "Authorization: Bearer USER_TOKEN_HERE"
```

---

## 🧪 Complete Test Flow

### 1. Setup Admin User
```bash
# Register admin
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@butiks.com","password":"admin123","firstName":"Admin","lastName":"User"}'

# Update role in MongoDB
mongosh butiks --eval 'db.users.updateOne({email: "admin@butiks.com"}, {$set: {role: "admin"}})'

# Login and get token
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@butiks.com","password":"admin123"}'
```

### 2. Create Categories
```bash
# Save admin token
ADMIN_TOKEN="your_admin_token_here"

# Create category
curl -X POST http://localhost:5000/api/v1/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"name":"Womens Clothing","description":"Clothing for women","order":1}'
```

### 3. Apply as Vendor
```bash
# Register vendor user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"vendor@example.com","password":"vendor123","firstName":"Vendor","lastName":"Shop"}'

# Login and get token
VENDOR_TOKEN=$(curl -s -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"vendor@example.com","password":"vendor123"}' | jq -r '.token')

# Apply as vendor
curl -X POST http://localhost:5000/api/v1/vendors/apply \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $VENDOR_TOKEN" \
  -d '{"shopName":"My Shop","email":"shop@example.com","phone":"+905551234567","taxId":"1234567890","address":{"street":"Main St","city":"Istanbul","state":"Istanbul","zipCode":"34000","country":"Turkey"}}'
```

### 4. Approve Vendor (Admin)
```bash
# Get vendor ID
VENDOR_ID=$(mongosh butiks --eval 'print(db.vendors.findOne({shopName: "My Shop"})._id)' --quiet)

# Approve vendor
curl -X PATCH "http://localhost:5000/api/v1/vendors/$VENDOR_ID/approve" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### 5. Create Product (Vendor)
```bash
# Get category ID
CATEGORY_ID=$(mongosh butiks --eval 'print(db.categories.findOne({name: "Womens Clothing"})._id)' --quiet)

# Create product
curl -X POST http://localhost:5000/api/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $VENDOR_TOKEN" \
  -d "{\"name\":\"Test Product\",\"description\":\"Test\",\"categoryId\":\"$CATEGORY_ID\",\"price\":99.99,\"sku\":\"TEST-001\",\"stock\":100,\"status\":\"active\",\"isPublished\":true}"
```

### 6. Create Order (Customer)
```bash
# Get product ID
PRODUCT_ID=$(mongosh butiks --eval 'print(db.products.findOne({sku: "TEST-001"})._id)' --quiet)

# Register customer
CUSTOMER_TOKEN=$(curl -s -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@example.com","password":"customer123","firstName":"Customer","lastName":"User"}' | jq -r '.token')

# Create order
curl -X POST http://localhost:5000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $CUSTOMER_TOKEN" \
  -d "{\"items\":[{\"productId\":\"$PRODUCT_ID\",\"quantity\":1}],\"shippingAddress\":{\"firstName\":\"Customer\",\"lastName\":\"User\",\"addressLine1\":\"Test St\",\"city\":\"Istanbul\",\"state\":\"Istanbul\",\"postalCode\":\"34000\",\"country\":\"Turkey\",\"phone\":\"+905551234567\"},\"paymentMethod\":\"credit_card\"}"
```

---

## 🔧 Useful MongoDB Commands

```bash
# View all users
mongosh butiks --eval 'db.users.find().pretty()'

# View all vendors
mongosh butiks --eval 'db.vendors.find().pretty()'

# View all products
mongosh butiks --eval 'db.products.find().pretty()'

# View all orders
mongosh butiks --eval 'db.orders.find().pretty()'

# View all categories
mongosh butiks --eval 'db.categories.find().pretty()'

# Make user admin
mongosh butiks --eval 'db.users.updateOne({email: "user@example.com"}, {$set: {role: "admin"}})'

# Clear all data (BE CAREFUL!)
mongosh butiks --eval 'db.dropDatabase()'
```

---

## 📊 Response Format

### Success Response
```json
{
  "error": false,
  "message": "Operation successful",
  "data": { /* result data */ }
}
```

### Error Response
```json
{
  "error": true,
  "message": "Error description"
}
```

### Paginated Response
```json
{
  "error": false,
  "items": [ /* array of items */ ],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 5,
    "limit": 20
  }
}
```

---

**Happy Testing! 🚀**

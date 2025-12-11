# Butiks API - Advanced Features Documentation

This document covers the advanced features added to the Butiks API: file upload, reviews & ratings, wishlist/favorites, and admin dashboard & analytics.

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication
All protected endpoints require JWT Bearer token:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 1. FILE UPLOAD ENDPOINTS

### Upload Single Image
```bash
POST /upload/image
Content-Type: multipart/form-data
Authorization: Bearer TOKEN

# Example
curl -X POST http://localhost:5000/api/v1/upload/image \
  -H "Authorization: Bearer $TOKEN" \
  -F "image=@/path/to/image.jpg"
```

**Response:**
```json
{
  "error": false,
  "message": "Image uploaded successfully",
  "image": {
    "url": "https://res.cloudinary.com/butiks/image/upload/v1234567890/products/abc123.jpg",
    "publicId": "products/abc123"
  }
}
```

### Upload Multiple Images
```bash
POST /upload/images
Content-Type: multipart/form-data
Authorization: Bearer TOKEN

# Example (max 10 images)
curl -X POST http://localhost:5000/api/v1/upload/images \
  -H "Authorization: Bearer $TOKEN" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```

**Response:**
```json
{
  "error": false,
  "message": "Images uploaded successfully",
  "images": [
    {
      "url": "https://res.cloudinary.com/.../image1.jpg",
      "publicId": "products/abc123"
    },
    {
      "url": "https://res.cloudinary.com/.../image2.jpg",
      "publicId": "products/abc124"
    }
  ]
}
```

### Upload Product Images (Vendor Only)
```bash
POST /upload/product-images
Content-Type: multipart/form-data
Authorization: Bearer VENDOR_TOKEN

# Example
curl -X POST http://localhost:5000/api/v1/upload/product-images \
  -H "Authorization: Bearer $VENDOR_TOKEN" \
  -F "images=@/path/to/product1.jpg" \
  -F "images=@/path/to/product2.jpg"
```

### Delete Image
```bash
DELETE /upload/image/:publicId
Authorization: Bearer TOKEN

# Example
curl -X DELETE "http://localhost:5000/api/v1/upload/image/products%2Fabc123" \
  -H "Authorization: Bearer $TOKEN"
```

**Supported Image Formats:** JPEG, JPG, PNG, GIF, WEBP  
**Max File Size:** 5MB per image  
**Max Multiple Upload:** 10 images

---

## 2. REVIEWS & RATINGS ENDPOINTS

### Create Review
```bash
POST /reviews
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "productId": "693960cc7f3cc5bf49f69cf5",
  "orderId": "69396abc7f3cc5bf49f69d01",
  "rating": 5,
  "title": "Harika bir ürün!",
  "comment": "Kalitesi çok iyi, beğenerek kullanıyorum.",
  "images": [
    "https://res.cloudinary.com/.../review1.jpg"
  ]
}
```

**Response:**
```json
{
  "error": false,
  "message": "Review created successfully",
  "review": {
    "_id": "69397abc...",
    "productId": {
      "_id": "693960cc...",
      "name": "Şık Elbise",
      "slug": "sik-elbise-123"
    },
    "customerId": {
      "_id": "693966...",
      "firstName": "Test",
      "lastName": "Customer",
      "avatar": null
    },
    "rating": 5,
    "title": "Harika bir ürün!",
    "comment": "Kalitesi çok iyi...",
    "isVerifiedPurchase": true,
    "helpfulCount": 0,
    "createdAt": "2025-12-10T12:00:00.000Z"
  }
}
```

### Get Product Reviews
```bash
GET /reviews/product/:productId?page=1&limit=10&rating=5&sort=-createdAt

# Example
curl "http://localhost:5000/api/v1/reviews/product/693960cc7f3cc5bf49f69cf5?page=1&limit=10"
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)
- `rating` - Filter by rating (1-5)
- `sort` - Sort field (default: -createdAt)

**Response:**
```json
{
  "error": false,
  "reviews": [...],
  "ratingDistribution": [
    { "_id": 5, "count": 10 },
    { "_id": 4, "count": 5 },
    { "_id": 3, "count": 2 },
    { "_id": 2, "count": 1 },
    { "_id": 1, "count": 0 }
  ],
  "pagination": {
    "total": 18,
    "page": 1,
    "pages": 2,
    "limit": 10
  }
}
```

### Get Vendor Reviews
```bash
GET /reviews/vendor/:vendorId?page=1&limit=10

# Example
curl "http://localhost:5000/api/v1/reviews/vendor/693960387f3cc5bf49f69cea"
```

### Update Review
```bash
PUT /reviews/:reviewId
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "rating": 4,
  "title": "Güncellendi",
  "comment": "Değerlendirmeyi güncelledim...",
  "images": [...]
}
```

### Delete Review
```bash
DELETE /reviews/:reviewId
Authorization: Bearer TOKEN

# Example
curl -X DELETE http://localhost:5000/api/v1/reviews/69397abc... \
  -H "Authorization: Bearer $TOKEN"
```

### Mark Review as Helpful
```bash
POST /reviews/:reviewId/helpful
Authorization: Bearer TOKEN

# Example - Toggles helpful status
curl -X POST http://localhost:5000/api/v1/reviews/69397abc.../helpful \
  -H "Authorization: Bearer $TOKEN"
```

### Vendor Response to Review
```bash
POST /reviews/:reviewId/response
Authorization: Bearer VENDOR_TOKEN
Content-Type: application/json

{
  "comment": "Teşekkür ederiz! Memnuniyetiniz bizim için önemli."
}
```

**Response:**
```json
{
  "error": false,
  "message": "Response added successfully",
  "review": {
    ...
    "vendorResponse": {
      "comment": "Teşekkür ederiz!...",
      "respondedAt": "2025-12-10T12:30:00.000Z"
    }
  }
}
```

---

## 3. WISHLIST/FAVORITES ENDPOINTS

### Get User Wishlist
```bash
GET /wishlist
Authorization: Bearer TOKEN

# Example
curl http://localhost:5000/api/v1/wishlist \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "error": false,
  "wishlist": {
    "_id": "69397def...",
    "customerId": "693966...",
    "items": [
      {
        "productId": {
          "_id": "693960cc...",
          "name": "Şık Elbise",
          "slug": "sik-elbise-123",
          "price": 299.99,
          "compareAtPrice": 399.99,
          "images": [...],
          "status": "active",
          "isPublished": true,
          "vendorId": {
            "shopName": "Trendy Fashion",
            "slug": "trendy-fashion"
          }
        },
        "addedAt": "2025-12-10T12:00:00.000Z"
      }
    ]
  }
}
```

### Add Product to Wishlist
```bash
POST /wishlist/:productId
Authorization: Bearer TOKEN

# Example
curl -X POST http://localhost:5000/api/v1/wishlist/693960cc7f3cc5bf49f69cf5 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

**Response:**
```json
{
  "error": false,
  "message": "Product added to wishlist",
  "wishlist": {...}
}
```

### Remove Product from Wishlist
```bash
DELETE /wishlist/:productId
Authorization: Bearer TOKEN

# Example
curl -X DELETE http://localhost:5000/api/v1/wishlist/693960cc7f3cc5bf49f69cf5 \
  -H "Authorization: Bearer $TOKEN"
```

### Clear Wishlist
```bash
DELETE /wishlist
Authorization: Bearer TOKEN

# Example
curl -X DELETE http://localhost:5000/api/v1/wishlist \
  -H "Authorization: Bearer $TOKEN"
```

### Check if Product is in Wishlist
```bash
GET /wishlist/check/:productId
Authorization: Bearer TOKEN

# Example
curl http://localhost:5000/api/v1/wishlist/check/693960cc7f3cc5bf49f69cf5 \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "error": false,
  "inWishlist": true
}
```

---

## 4. ADMIN DASHBOARD & ANALYTICS ENDPOINTS

**All admin endpoints require admin role authorization.**

### Dashboard Overview
```bash
GET /admin/dashboard/overview
Authorization: Bearer ADMIN_TOKEN

# Example
curl http://localhost:5000/api/v1/admin/dashboard/overview \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Response:**
```json
{
  "error": false,
  "stats": {
    "users": {
      "total": 150,
      "lastMonth": 25
    },
    "vendors": {
      "total": 30,
      "active": 28,
      "pending": 2
    },
    "products": {
      "total": 450,
      "lastMonth": 50
    },
    "orders": {
      "total": 320,
      "lastMonth": 45
    },
    "revenue": {
      "total": 125000,
      "commission": 18750,
      "lastMonth": 25000
    }
  }
}
```

### Sales Analytics
```bash
GET /admin/analytics/sales?period=month&startDate=2025-11-01&endDate=2025-12-10
Authorization: Bearer ADMIN_TOKEN

# Examples
curl "http://localhost:5000/api/v1/admin/analytics/sales?period=week" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

curl "http://localhost:5000/api/v1/admin/analytics/sales?startDate=2025-11-01&endDate=2025-12-10" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Query Parameters:**
- `period` - Time period: `week`, `month`, `year` (default: month)
- `startDate` - Custom start date (YYYY-MM-DD)
- `endDate` - Custom end date (YYYY-MM-DD)

**Response:**
```json
{
  "error": false,
  "salesData": [
    {
      "_id": "2025-12-01",
      "orders": 15,
      "revenue": 4500,
      "commission": 675
    },
    {
      "_id": "2025-12-02",
      "orders": 12,
      "revenue": 3800,
      "commission": 570
    }
  ],
  "topProducts": [
    {
      "_id": "693960cc...",
      "name": "Şık Elbise",
      "slug": "sik-elbise-123",
      "image": {...},
      "totalSold": 45,
      "totalRevenue": 13495.50
    }
  ]
}
```

### Vendor Analytics
```bash
GET /admin/analytics/vendors
Authorization: Bearer ADMIN_TOKEN

# Example
curl http://localhost:5000/api/v1/admin/analytics/vendors \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Response:**
```json
{
  "error": false,
  "topVendorsByRevenue": [
    {
      "_id": "693960387...",
      "shopName": "Trendy Fashion",
      "slug": "trendy-fashion",
      "logo": "https://...",
      "totalRevenue": 45000,
      "totalOrders": 120,
      "commission": 6750
    }
  ],
  "vendorMetrics": [
    {
      "_id": "693960387...",
      "shopName": "Trendy Fashion",
      "status": "active",
      "productCount": 85,
      "rating": 4.8,
      "reviewCount": 150
    }
  ]
}
```

### Customer Analytics
```bash
GET /admin/analytics/customers
Authorization: Bearer ADMIN_TOKEN

# Example
curl http://localhost:5000/api/v1/admin/analytics/customers \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Response:**
```json
{
  "error": false,
  "topCustomers": [
    {
      "_id": "693966...",
      "name": "Test Customer",
      "email": "test@butiks.com",
      "totalSpent": 5600,
      "totalOrders": 18,
      "avgOrderValue": 311.11
    }
  ],
  "registrationTrends": [
    {
      "_id": "2025-12-01",
      "count": 5
    },
    {
      "_id": "2025-12-02",
      "count": 8
    }
  ]
}
```

### Product Analytics
```bash
GET /admin/analytics/products
Authorization: Bearer ADMIN_TOKEN

# Example
curl http://localhost:5000/api/v1/admin/analytics/products \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Response:**
```json
{
  "error": false,
  "productsByCategory": [
    {
      "_id": "69396027...",
      "category": "Kadın Giyim",
      "count": 150
    }
  ],
  "lowStockProducts": [
    {
      "_id": "693960cc...",
      "name": "Şık Elbise",
      "slug": "sik-elbise-123",
      "stock": 3,
      "images": [...],
      "vendorId": {
        "shopName": "Trendy Fashion"
      }
    }
  ],
  "outOfStockCount": 12,
  "mostReviewedProducts": [
    {
      "_id": "693960cc...",
      "name": "Şık Elbise",
      "slug": "sik-elbise-123",
      "image": {...},
      "reviewCount": 45,
      "avgRating": 4.8
    }
  ]
}
```

### Revenue Report
```bash
GET /admin/reports/revenue?startDate=2025-11-01&endDate=2025-12-10
Authorization: Bearer ADMIN_TOKEN

# Example
curl "http://localhost:5000/api/v1/admin/reports/revenue?startDate=2025-11-01&endDate=2025-12-10" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Response:**
```json
{
  "error": false,
  "summary": {
    "totalRevenue": 125000,
    "totalCommission": 18750,
    "totalOrders": 320,
    "avgOrderValue": 390.62
  },
  "revenueByPaymentMethod": [
    {
      "_id": "credit_card",
      "revenue": 100000,
      "count": 280
    },
    {
      "_id": "bank_transfer",
      "revenue": 25000,
      "count": 40
    }
  ],
  "revenueByVendor": [
    {
      "_id": "693960387...",
      "shopName": "Trendy Fashion",
      "revenue": 45000,
      "commission": 6750,
      "orders": 120
    }
  ]
}
```

---

## Error Responses

All endpoints follow this error format:

```json
{
  "error": true,
  "message": "Error description here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Environment Variables Required

Add these to your `.env` file:

```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@butiks.com
FRONTEND_URL=http://localhost:5173
```

---

## Testing Examples

### Complete Workflow Test

```bash
# 1. Register and login
TOKEN=$(curl -s -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "Test123!"
  }' | jq -r '.token')

# 2. Add product to wishlist
curl -X POST http://localhost:5000/api/v1/wishlist/PRODUCT_ID \
  -H "Authorization: Bearer $TOKEN"

# 3. Upload product image
curl -X POST http://localhost:5000/api/v1/upload/image \
  -H "Authorization: Bearer $TOKEN" \
  -F "image=@./product.jpg"

# 4. Create review after purchase
curl -X POST http://localhost:5000/api/v1/reviews \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PRODUCT_ID",
    "orderId": "ORDER_ID",
    "rating": 5,
    "comment": "Great product!"
  }'

# 5. Admin: Check dashboard
curl http://localhost:5000/api/v1/admin/dashboard/overview \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

---

## Notes

1. **File Upload**: Images are automatically optimized and stored on Cloudinary with transformations (max 1200x1200, auto quality/format)

2. **Reviews**: Users can only review products they have purchased. One review per product per user.

3. **Wishlist**: Products must be active and published to be added to wishlist

4. **Admin Analytics**: All analytics endpoints aggregate real-time data from the database

5. **Email Notifications**: Automatically sent for:
   - User registration (welcome email)
   - Order confirmation
   - Vendor approval/rejection
   - Order status updates

---

## Total API Endpoints

The Butiks API now has **60+ endpoints** across all modules:
- Authentication: 8 endpoints
- Products: 8 endpoints
- Vendors: 8 endpoints
- Orders: 6 endpoints
- Categories: 5 endpoints
- **Upload: 4 endpoints**
- **Reviews: 7 endpoints**
- **Wishlist: 5 endpoints**
- **Admin: 6 endpoints**

# Butiks API Documentation

Complete API reference for Butiks Marketplace Backend.

## Table of Contents

1. [Authentication](#authentication)
2. [Products](#products)
3. [Vendors](#vendors)
4. [Orders](#orders)
5. [Payments](#payments)
6. [Reviews](#reviews)
7. [Wishlist](#wishlist)
8. [Categories](#categories)
9. [Upload](#upload)
10. [Admin](#admin)
11. [Error Handling](#error-handling)
12. [Rate Limiting](#rate-limiting)

## Base URL

```
Development: http://localhost:5000/api/v1
Production:  https://api.butiks.com/api/v1
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

### Register

Register a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "05551234567"
}
```

**Response:** `201 Created`
```json
{
  "error": false,
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer"
  },
  "token": "jwt_token_here"
}
```

### Login

Authenticate user and receive JWT token.

**Endpoint:** `POST /auth/login`

**Rate Limit:** 5 requests per 15 minutes

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "error": false,
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "role": "customer"
  },
  "token": "jwt_token_here"
}
```

### Get Profile

Get current user profile.

**Endpoint:** `GET /auth/profile` 🔒

**Headers:**
```http
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "error": false,
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer",
    "addresses": [],
    "wishlist": [],
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

## Products

### Get All Products

Get paginated list of products with optional filters.

**Endpoint:** `GET /products`

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 24, max: 100) - Items per page
- `category` (string) - Filter by category ID
- `vendorId` (string) - Filter by vendor ID
- `minPrice` (number) - Minimum price
- `maxPrice` (number) - Maximum price
- `inStock` (boolean) - Only in-stock products
- `isFeatured` (boolean) - Only featured products
- `isNew` (boolean) - Only new products (last 30 days)
- `search` (string) - Text search in name/description
- `sort` (string) - Sort field (e.g., '-price', 'createdAt')

**Example Request:**
```http
GET /api/v1/products?page=1&limit=12&category=category_id&minPrice=100&maxPrice=500&sort=-createdAt
```

**Response:** `200 OK`
```json
{
  "error": false,
  "products": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "slug": "product-name",
      "description": "Product description...",
      "price": 299.99,
      "compareAtPrice": 399.99,
      "images": [
        {
          "url": "https://cloudinary.com/image.jpg",
          "alt": "Product image",
          "isMain": true
        }
      ],
      "categoryId": {
        "_id": "category_id",
        "name": "Category Name",
        "slug": "category-slug"
      },
      "vendorId": {
        "_id": "vendor_id",
        "shopName": "Shop Name",
        "slug": "shop-slug",
        "logo": "logo_url"
      },
      "stock": 10,
      "stats": {
        "rating": 4.5,
        "reviewCount": 25,
        "soldCount": 100
      }
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "pages": 13,
    "limit": 12
  }
}
```

### Get Single Product

Get detailed product information.

**Endpoint:** `GET /products/:id`

**Response:** `200 OK`
```json
{
  "error": false,
  "product": {
    "_id": "product_id",
    "name": "Product Name",
    "slug": "product-name",
    "description": "Full product description...",
    "shortDescription": "Brief description",
    "price": 299.99,
    "compareAtPrice": 399.99,
    "sku": "PRD-123456",
    "stock": 10,
    "images": [...],
    "categoryId": {...},
    "vendorId": {...},
    "variants": [],
    "attributes": {},
    "stats": {
      "rating": 4.5,
      "reviewCount": 25,
      "soldCount": 100,
      "viewCount": 1500
    }
  }
}
```

### Create Product

Create a new product (Vendor/Admin only).

**Endpoint:** `POST /products` 🔒

**Rate Limit:** 50 requests per hour

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Full product description",
  "shortDescription": "Brief description",
  "price": 299.99,
  "compareAtPrice": 399.99,
  "categoryId": "category_id",
  "sku": "PRD-123456",
  "stock": 10,
  "images": [
    {
      "url": "https://cloudinary.com/image.jpg",
      "alt": "Product image",
      "isMain": true,
      "order": 0
    }
  ],
  "tags": ["tag1", "tag2"],
  "attributes": {
    "color": "Blue",
    "size": "M",
    "material": "Cotton"
  }
}
```

**Response:** `201 Created`
```json
{
  "error": false,
  "message": "Product created successfully",
  "product": {...}
}
```

## Orders

### Create Order

Create a new order.

**Endpoint:** `POST /orders` 🔒

**Rate Limit:** 10 requests per 15 minutes

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product_id",
      "quantity": 2,
      "selectedSize": "M",
      "selectedColor": "Blue"
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "addressLine1": "123 Main St",
    "city": "Istanbul",
    "postalCode": "34000",
    "phone": "05551234567"
  },
  "billingAddress": {
    // Same structure as shipping
  },
  "paymentIntentId": "pi_stripe_id"
}
```

**Response:** `201 Created`
```json
{
  "error": false,
  "message": "Order created successfully",
  "order": {
    "_id": "order_id",
    "orderNumber": "ORD-2025-ABC123",
    "total": 599.98,
    "payment": {
      "method": "card",
      "status": "paid"
    },
    "vendorOrders": [
      {
        "vendorId": "vendor_id",
        "items": [...],
        "subtotal": 599.98,
        "status": "pending"
      }
    ]
  }
}
```

### Get My Orders

Get current user's orders.

**Endpoint:** `GET /orders` 🔒

**Query Parameters:**
- `page` (number) - Page number
- `limit` (number) - Items per page
- `status` (string) - Filter by status

**Response:** `200 OK`
```json
{
  "error": false,
  "orders": [...],
  "pagination": {...}
}
```

## Payments

### Create Payment Intent

Create Stripe payment intent.

**Endpoint:** `POST /payments/create-intent` 🔒

**Request Body:**
```json
{
  "amount": 599.98,
  "items": [
    {
      "productId": "product_id",
      "quantity": 2
    }
  ]
}
```

**Response:** `200 OK`
```json
{
  "error": false,
  "clientSecret": "pi_secret_here",
  "paymentIntentId": "pi_stripe_id"
}
```

### Stripe Webhook

Handle Stripe webhook events (public endpoint).

**Endpoint:** `POST /payments/webhook`

**Headers:**
```http
Stripe-Signature: webhook_signature
```

**Note:** This endpoint is for Stripe to call, not for direct API use.

## Reviews

### Get Product Reviews

Get reviews for a specific product.

**Endpoint:** `GET /reviews/product/:productId`

**Query Parameters:**
- `page` (number) - Page number
- `limit` (number) - Items per page

**Response:** `200 OK`
```json
{
  "error": false,
  "reviews": [
    {
      "_id": "review_id",
      "userId": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "productId": "product_id",
      "rating": 5,
      "comment": "Great product!",
      "status": "approved",
      "helpful": 10,
      "vendorResponse": {
        "message": "Thank you!",
        "respondedAt": "2025-01-02T00:00:00.000Z"
      },
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {...}
}
```

### Create Review

Create a product review.

**Endpoint:** `POST /reviews` 🔒

**Rate Limit:** 10 requests per hour

**Request Body:**
```json
{
  "productId": "product_id",
  "rating": 5,
  "comment": "Excellent product, highly recommended!"
}
```

**Response:** `201 Created`
```json
{
  "error": false,
  "message": "Review submitted successfully",
  "review": {...}
}
```

## Wishlist

### Get Wishlist

Get current user's wishlist.

**Endpoint:** `GET /wishlist` 🔒

**Response:** `200 OK`
```json
{
  "error": false,
  "wishlist": {
    "userId": "user_id",
    "products": [
      {
        "_id": "product_id",
        "name": "Product Name",
        "price": 299.99,
        "images": [...],
        "stock": 10
      }
    ]
  }
}
```

### Add to Wishlist

Add product to wishlist.

**Endpoint:** `POST /wishlist/:productId` 🔒

**Response:** `200 OK`
```json
{
  "error": false,
  "message": "Product added to wishlist"
}
```

### Remove from Wishlist

Remove product from wishlist.

**Endpoint:** `DELETE /wishlist/:productId` 🔒

**Response:** `200 OK`
```json
{
  "error": false,
  "message": "Product removed from wishlist"
}
```

## Error Handling

All errors follow a consistent format:

```json
{
  "error": true,
  "message": "Error message here",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### Common Error Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

### Example Error Response

```json
{
  "error": true,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

## Rate Limiting

Different endpoints have different rate limits:

| Endpoint Type | Limit | Window |
|--------------|-------|--------|
| Authentication | 5 requests | 15 minutes |
| Password Reset | 3 requests | 1 hour |
| Product Creation | 50 requests | 1 hour |
| File Upload | 20 requests | 15 minutes |
| Order Creation | 10 requests | 15 minutes |
| Review Creation | 10 requests | 1 hour |
| General API | 100 requests | 15 minutes |

### Rate Limit Headers

Responses include rate limit information:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704067200
```

### Rate Limit Exceeded Response

```json
{
  "error": true,
  "message": "Too many requests, please try again later"
}
```

## Pagination

Paginated endpoints return data in this format:

```json
{
  "error": false,
  "data": [...],
  "pagination": {
    "total": 150,
    "page": 1,
    "pages": 13,
    "limit": 12,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Testing

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get Products
curl http://localhost:5000/api/v1/products?page=1&limit=10

# Get Profile (with auth)
curl http://localhost:5000/api/v1/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman

1. Import the Postman collection (if available)
2. Set up environment variables:
   - `baseUrl`: `http://localhost:5000/api/v1`
   - `token`: Your JWT token
3. Use `{{baseUrl}}` and `{{token}}` in requests

## Support

For issues or questions:
- Check the main [README.md](./README.md)
- Review [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Open an issue on GitHub

## Version

Current API Version: `v1`

Last Updated: December 2025

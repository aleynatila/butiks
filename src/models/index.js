/**
 * Data Models / Type Definitions
 * These models represent the data structure for backend integration
 * Can be converted to TypeScript interfaces when migrating to TS
 */

/**
 * Product Model
 * Represents a product in the e-commerce system
 */
export class Product {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.slug = data.slug || '';
    this.description = data.description || '';
    this.shortDescription = data.shortDescription || '';
    this.price = data.price || 0;
    this.originalPrice = data.originalPrice || null;
    this.currency = data.currency || 'TRY';
    this.category = data.category || '';
    this.categoryId = data.categoryId || null;
    this.brand = data.brand || '';
    this.sku = data.sku || '';
    this.images = data.images || [];
    this.image = data.image || ''; // Main image
    this.colors = data.colors || [];
    this.sizes = data.sizes || [];
    this.stock = data.stock || 0;
    this.stockCount = data.stockCount || 0;
    this.inStock = data.inStock !== undefined ? data.inStock : true;
    this.isNew = data.isNew || false;
    this.isSoldOut = data.isSoldOut || false;
    this.isFeatured = data.isFeatured || false;
    this.rating = data.rating || 0;
    this.reviewCount = data.reviewCount || 0;
    this.reviews = data.reviews || 0;
    this.tags = data.tags || [];
    this.specifications = data.specifications || {};
    this.shippingInfo = data.shippingInfo || {};
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Calculate discount percentage
  getDiscountPercentage() {
    if (!this.originalPrice || this.originalPrice <= this.price) return 0;
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }

  // Check if product is on sale
  isOnSale() {
    return this.originalPrice && this.originalPrice > this.price;
  }

  // Get main image or first image
  getMainImage() {
    return this.image || (this.images.length > 0 ? this.images[0] : '');
  }
}

/**
 * User Model
 * Represents a user/customer in the system
 */
export class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.email = data.email || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.phone = data.phone || '';
    this.avatar = data.avatar || '';
    this.dateOfBirth = data.dateOfBirth || null;
    this.gender = data.gender || '';
    this.addresses = data.addresses || [];
    this.defaultAddressId = data.defaultAddressId || null;
    this.createdAt = data.createdAt || new Date();
    this.emailVerified = data.emailVerified || false;
    this.phoneVerified = data.phoneVerified || false;
  }

  // Get full name
  getFullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  // Get default address
  getDefaultAddress() {
    return this.addresses.find(addr => addr.id === this.defaultAddressId);
  }
}

/**
 * Cart Item Model
 * Represents an item in the shopping cart
 */
export class CartItem {
  constructor(data = {}) {
    this.id = data.id || null;
    this.productId = data.productId || null;
    this.product = data.product ? new Product(data.product) : null;
    this.quantity = data.quantity || 1;
    this.selectedSize = data.selectedSize || '';
    this.selectedColor = data.selectedColor || '';
    this.price = data.price || 0;
    this.addedAt = data.addedAt || new Date();
  }

  // Calculate item subtotal
  getSubtotal() {
    return this.price * this.quantity;
  }
}

/**
 * Order Model
 * Represents a customer order
 */
export class Order {
  constructor(data = {}) {
    this.id = data.id || null;
    this.orderNumber = data.orderNumber || '';
    this.userId = data.userId || null;
    this.items = data.items ? data.items.map(item => new CartItem(item)) : [];
    this.subtotal = data.subtotal || 0;
    this.tax = data.tax || 0;
    this.shipping = data.shipping || 0;
    this.discount = data.discount || 0;
    this.total = data.total || 0;
    this.currency = data.currency || 'TRY';
    this.status = data.status || 'pending'; // pending, processing, shipped, delivered, cancelled
    this.paymentStatus = data.paymentStatus || 'pending'; // pending, paid, failed, refunded
    this.paymentMethod = data.paymentMethod || '';
    this.shippingAddress = data.shippingAddress || {};
    this.billingAddress = data.billingAddress || {};
    this.shippingMethod = data.shippingMethod || '';
    this.trackingNumber = data.trackingNumber || '';
    this.notes = data.notes || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Get order total
  calculateTotal() {
    return this.subtotal + this.tax + this.shipping - this.discount;
  }

  // Check if order can be cancelled
  canBeCancelled() {
    return ['pending', 'processing'].includes(this.status);
  }

  // Get status color for UI
  getStatusColor() {
    const colors = {
      pending: 'yellow',
      processing: 'blue',
      shipped: 'purple',
      delivered: 'green',
      cancelled: 'red',
    };
    return colors[this.status] || 'gray';
  }
}

/**
 * Address Model
 * Represents a shipping/billing address
 */
export class Address {
  constructor(data = {}) {
    this.id = data.id || null;
    this.userId = data.userId || null;
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.company = data.company || '';
    this.addressLine1 = data.addressLine1 || '';
    this.addressLine2 = data.addressLine2 || '';
    this.city = data.city || '';
    this.state = data.state || '';
    this.postalCode = data.postalCode || '';
    this.country = data.country || '';
    this.phone = data.phone || '';
    this.isDefault = data.isDefault || false;
    this.type = data.type || 'shipping'; // shipping, billing, both
  }

  // Get formatted address string
  getFormattedAddress() {
    const parts = [
      this.addressLine1,
      this.addressLine2,
      `${this.city}, ${this.state} ${this.postalCode}`,
      this.country,
    ].filter(Boolean);
    
    return parts.join('\n');
  }

  // Get full name
  getFullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}

/**
 * Review Model
 * Represents a product review
 */
export class Review {
  constructor(data = {}) {
    this.id = data.id || null;
    this.productId = data.productId || null;
    this.userId = data.userId || null;
    this.userName = data.userName || 'Anonymous';
    this.userAvatar = data.userAvatar || '';
    this.rating = data.rating || 0;
    this.title = data.title || '';
    this.comment = data.comment || '';
    this.images = data.images || [];
    this.isVerifiedPurchase = data.isVerifiedPurchase || false;
    this.helpful = data.helpful || 0;
    this.notHelpful = data.notHelpful || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Get helpful percentage
  getHelpfulPercentage() {
    const total = this.helpful + this.notHelpful;
    if (total === 0) return 0;
    return Math.round((this.helpful / total) * 100);
  }
}

/**
 * Category Model
 * Represents a product category
 */
export class Category {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.slug = data.slug || '';
    this.description = data.description || '';
    this.image = data.image || '';
    this.parentId = data.parentId || null;
    this.children = data.children || [];
    this.productCount = data.productCount || 0;
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.sortOrder = data.sortOrder || 0;
  }

  // Check if category has children
  hasChildren() {
    return this.children.length > 0;
  }
}

/**
 * Promo Code Model
 * Represents a promotional discount code
 */
export class PromoCode {
  constructor(data = {}) {
    this.id = data.id || null;
    this.code = data.code || '';
    this.description = data.description || '';
    this.discountType = data.discountType || 'percentage'; // percentage, fixed
    this.discountValue = data.discountValue || 0;
    this.minPurchase = data.minPurchase || 0;
    this.maxDiscount = data.maxDiscount || null;
    this.validFrom = data.validFrom || new Date();
    this.validTo = data.validTo || null;
    this.usageLimit = data.usageLimit || null;
    this.usageCount = data.usageCount || 0;
    this.isActive = data.isActive !== undefined ? data.isActive : true;
  }

  // Check if promo code is valid
  isValid() {
    const now = new Date();
    
    if (!this.isActive) return false;
    if (this.validFrom && new Date(this.validFrom) > now) return false;
    if (this.validTo && new Date(this.validTo) < now) return false;
    if (this.usageLimit && this.usageCount >= this.usageLimit) return false;
    
    return true;
  }

  // Calculate discount amount
  calculateDiscount(subtotal) {
    if (!this.isValid() || subtotal < this.minPurchase) return 0;
    
    let discount = 0;
    
    if (this.discountType === 'percentage') {
      discount = (subtotal * this.discountValue) / 100;
    } else {
      discount = this.discountValue;
    }
    
    if (this.maxDiscount && discount > this.maxDiscount) {
      discount = this.maxDiscount;
    }
    
    return discount;
  }
}

export default {
  Product,
  User,
  CartItem,
  Order,
  Address,
  Review,
  Category,
  PromoCode,
};

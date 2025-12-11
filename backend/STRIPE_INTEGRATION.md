# Stripe Payment Integration - Documentation

## Overview

Butiks API now supports secure payment processing through Stripe. This integration handles:
- Payment intents
- Payment confirmation
- Order creation with payment
- Webhooks for payment events
- Refunds
- Customer management

---

## Setup

### 1. Environment Variables

Add to your `.env` file:

```env
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 2. Get Stripe Keys

1. Sign up at [stripe.com](https://stripe.com)
2. Get your **Secret Key** from Dashboard → Developers → API Keys
3. Get your **Webhook Secret** from Dashboard → Developers → Webhooks

### 3. Configure Webhook

In Stripe Dashboard → Webhooks, add endpoint:
```
https://yourdomain.com/api/v1/payments/webhook
```

Select events to listen to:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`

---

## API Endpoints

### Base URL
```
http://localhost:5000/api/v1/payments
```

---

## 1. Create Payment Intent

Create a payment intent before processing payment.

**Endpoint:** `POST /payments/create-intent`  
**Auth:** Required (Bearer token)

**Request Body:**
```json
{
  "amount": 299.99,
  "orderId": "optional-order-id"
}
```

**Response:**
```json
{
  "error": false,
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

**Example:**
```bash
TOKEN="your_jwt_token"

curl -X POST http://localhost:5000/api/v1/payments/create-intent \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 299.99,
    "orderId": "69396abc7f3cc5bf49f69d01"
  }'
```

**Frontend Usage (React):**
```javascript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_your_publishable_key');

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create payment intent
    const response = await fetch('/api/v1/payments/create-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ amount: 299.99 })
    });

    const { clientSecret } = await response.json();

    // 2. Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      // Payment successful
      console.log('Payment succeeded:', result.paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
}
```

---

## 2. Confirm Payment and Create Order

Confirm payment and automatically create order.

**Endpoint:** `POST /payments/confirm`  
**Auth:** Required (Bearer token)

**Request Body:**
```json
{
  "paymentIntentId": "pi_xxx",
  "orderData": {
    "items": [
      {
        "productId": "693960cc7f3cc5bf49f69cf5",
        "quantity": 2,
        "price": 299.99,
        "vendorId": "693960387f3cc5bf49f69cea"
      }
    ],
    "shippingAddress": {
      "fullName": "Aleyna Tila",
      "phone": "+905551234567",
      "addressLine1": "Example Street 123",
      "city": "Istanbul",
      "state": "Istanbul",
      "postalCode": "34000",
      "country": "Turkey"
    },
    "subtotal": 599.98,
    "shippingFee": 25.00,
    "totalAmount": 624.98
  }
}
```

**Response:**
```json
{
  "error": false,
  "message": "Payment successful and order created",
  "order": {
    "_id": "69397xxx...",
    "orderNumber": "BT-20251210-0001",
    "customerId": {...},
    "vendorOrders": [...],
    "payment": {
      "method": "credit_card",
      "status": "paid",
      "transactionId": "pi_xxx",
      "paidAt": "2025-12-10T12:00:00.000Z"
    },
    "status": "processing",
    "totalAmount": 624.98
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/v1/payments/confirm \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "paymentIntentId": "pi_xxx",
    "orderData": {
      "items": [{
        "productId": "693960cc7f3cc5bf49f69cf5",
        "quantity": 1,
        "price": 299.99,
        "vendorId": "693960387f3cc5bf49f69cea"
      }],
      "shippingAddress": {
        "fullName": "Test User",
        "phone": "+905551234567",
        "addressLine1": "Test Street 123",
        "city": "Istanbul",
        "postalCode": "34000",
        "country": "Turkey"
      },
      "subtotal": 299.99,
      "shippingFee": 25.00,
      "totalAmount": 324.99
    }
  }'
```

---

## 3. Get Payment Status

Check status of a payment intent.

**Endpoint:** `GET /payments/status/:paymentIntentId`  
**Auth:** Required (Bearer token)

**Response:**
```json
{
  "error": false,
  "status": "succeeded",
  "paymentIntent": {
    "id": "pi_xxx",
    "amount": 29999,
    "currency": "try",
    "status": "succeeded"
  }
}
```

**Example:**
```bash
curl http://localhost:5000/api/v1/payments/status/pi_xxx \
  -H "Authorization: Bearer $TOKEN"
```

---

## 4. Create Stripe Customer

Create a Stripe customer for the logged-in user.

**Endpoint:** `POST /payments/customer`  
**Auth:** Required (Bearer token)

**Response:**
```json
{
  "error": false,
  "message": "Stripe customer created",
  "customerId": "cus_xxx"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/v1/payments/customer \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

---

## 5. Request Refund (Admin Only)

Process a refund for an order.

**Endpoint:** `POST /payments/refund`  
**Auth:** Required (Admin role)

**Request Body:**
```json
{
  "orderId": "69397xxx...",
  "amount": 324.99,
  "reason": "Customer requested cancellation"
}
```

**Response:**
```json
{
  "error": false,
  "message": "Refund processed successfully",
  "refund": {
    "id": "re_xxx",
    "amount": 32499,
    "status": "succeeded"
  },
  "order": {...}
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/v1/payments/refund \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "69397xxx...",
    "amount": 324.99,
    "reason": "Customer requested"
  }'
```

**Partial Refund:**
```json
{
  "orderId": "69397xxx...",
  "amount": 100.00,
  "reason": "Partial refund for damaged item"
}
```

**Full Refund (omit amount):**
```json
{
  "orderId": "69397xxx...",
  "reason": "Order cancelled"
}
```

---

## 6. Webhook Handler

Stripe webhooks for payment events.

**Endpoint:** `POST /payments/webhook`  
**Auth:** Public (verified by Stripe signature)

**Handled Events:**
- `payment_intent.succeeded` - Payment completed successfully
- `payment_intent.payment_failed` - Payment failed
- `charge.refunded` - Refund processed

**Note:** This endpoint is automatically called by Stripe. Do not call manually.

---

## Payment Flow

### Complete Checkout Flow

```javascript
// 1. User adds items to cart
const cart = [
  { productId: 'xxx', quantity: 2, price: 299.99 }
];

// 2. Calculate total
const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
const shippingFee = 25.00;
const totalAmount = subtotal + shippingFee;

// 3. Create payment intent
const intentResponse = await fetch('/api/v1/payments/create-intent', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ amount: totalAmount })
});

const { clientSecret } = await intentResponse.json();

// 4. Collect payment method (Stripe Elements)
const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: elements.getElement(CardElement),
    billing_details: {
      name: 'Customer Name',
      email: 'customer@example.com'
    }
  }
});

if (error) {
  console.error('Payment failed:', error.message);
  return;
}

// 5. Create order with payment confirmation
const orderResponse = await fetch('/api/v1/payments/confirm', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    paymentIntentId: paymentIntent.id,
    orderData: {
      items: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        vendorId: item.vendorId
      })),
      shippingAddress: {
        fullName: 'Customer Name',
        phone: '+905551234567',
        addressLine1: 'Street 123',
        city: 'Istanbul',
        postalCode: '34000',
        country: 'Turkey'
      },
      subtotal,
      shippingFee,
      totalAmount
    }
  })
});

const { order } = await orderResponse.json();
console.log('Order created:', order);

// 6. Redirect to success page
window.location.href = `/order-confirmation/${order._id}`;
```

---

## Currency

All amounts are in **Turkish Lira (TRY)**:
- API accepts amounts in TRY (e.g., 299.99)
- Stripe receives amounts in **kuruş** (smallest currency unit)
- Conversion: `TRY * 100 = kuruş`

Example:
- 299.99 TRY → 29999 kuruş
- 25.00 TRY → 2500 kuruş

---

## Error Handling

### Common Errors

**Invalid Amount:**
```json
{
  "error": true,
  "message": "Valid amount is required"
}
```

**Payment Not Confirmed:**
```json
{
  "error": true,
  "message": "Payment not confirmed"
}
```

**No Transaction Found:**
```json
{
  "error": true,
  "message": "No payment transaction found for this order"
}
```

**Webhook Verification Failed:**
```json
{
  "error": true,
  "message": "Webhook verification failed"
}
```

---

## Testing

### Test Cards

Use Stripe test cards for development:

**Successful Payment:**
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**Failed Payment:**
```
Card Number: 4000 0000 0000 0002
```

**Requires Authentication (3D Secure):**
```
Card Number: 4000 0027 6000 3184
```

More test cards: [Stripe Testing Docs](https://stripe.com/docs/testing)

---

## Security

1. **Never expose Secret Key**: Keep `STRIPE_SECRET_KEY` in `.env` file
2. **Use HTTPS in production**: Stripe requires HTTPS for webhooks
3. **Verify webhook signatures**: Automatically handled by `verifyWebhook()`
4. **Validate amounts server-side**: Never trust client-sent amounts
5. **Use environment-specific keys**: Test keys for development, live keys for production

---

## Production Checklist

- [ ] Switch to live Stripe keys (remove `_test_` prefix)
- [ ] Configure production webhook URL
- [ ] Enable HTTPS
- [ ] Set correct `FRONTEND_URL` in `.env`
- [ ] Test payment flow end-to-end
- [ ] Test refund process
- [ ] Monitor Stripe Dashboard for transactions
- [ ] Set up email notifications for failed payments

---

## Support

**Stripe Documentation:** [stripe.com/docs](https://stripe.com/docs)  
**Stripe Dashboard:** [dashboard.stripe.com](https://dashboard.stripe.com)  
**Test Mode:** Use test keys for development  
**Support:** Read Stripe docs for detailed integration guides

---

## Summary

Stripe payment integration is now complete with:
- ✅ Payment intent creation
- ✅ Payment confirmation with order creation
- ✅ Webhook event handling
- ✅ Refund processing
- ✅ Customer management
- ✅ Automatic email notifications
- ✅ Multi-vendor commission tracking
- ✅ Secure payment processing

**Total Payment Endpoints: 6**

Ready for production with proper Stripe configuration! 🎉

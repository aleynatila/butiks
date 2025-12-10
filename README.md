# 🛍️ Butiks - Modern E-Commerce Application

A fully-featured, production-ready e-commerce web application built with React, Vite, and Tailwind CSS v4.

![React](https://img.shields.io/badge/React-19.2-blue)
![Vite](https://img.shields.io/badge/Vite-7.2-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🛒 E-Commerce Core
- ✅ **Product Catalog** with filtering, sorting, and search
- ✅ **Product Detail Pages** with image galleries, size/color selection
- ✅ **Shopping Cart** with full CRUD operations
- ✅ **Mini Cart Drawer** with slide-out panel
- ✅ **Checkout Process** with multi-step form (4 steps)
- ✅ **Style Finder** - Tinder-like product discovery (Unique Feature!)
- ✅ **Testimonials & Reviews** section

### 🎨 User Experience
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Auto-rotating Hero Carousel** (5-second intervals)
- ✅ **Toast Notifications** for user feedback
- ✅ **Loading States** with skeleton screens
- ✅ **Smooth Animations** and transitions
- ✅ **Wishlist/Favorites** functionality

### 🔐 Authentication
- ✅ **Login/Register** pages with form validation
- ✅ **Social Login** UI (Google, Facebook)
- ✅ **Password Reset** flow (UI ready)
- ✅ **Protected Routes** structure

### 🎯 Developer Features
- ✅ **Backend-Ready Architecture** (See [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md))
- ✅ **Complete API Service Layer** (`src/services/api.js`)
- ✅ **Data Models** for type safety (`src/models/index.js`)
- ✅ **Reusable UI Components** (Button, Input, Modal)
- ✅ **Context API** for state management
- ✅ **localStorage** for cart persistence

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/aleynatila/butiks.git

# Navigate to project directory
cd butiks

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5174`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components (Toast, MiniCart, Testimonials)
│   ├── layout/          # Layout components (Navbar, Footer, Hero)
│   ├── product/         # Product-specific components
│   └── ui/              # Base UI components (Button, Input, Modal)
├── pages/               # Route pages
│   ├── HomePage.jsx
│   ├── ShopPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPageNew.jsx
│   ├── StyleFinderPage.jsx      # 🆕 Tinder-like product discovery
│   └── AuthPage.jsx              # 🆕 Login/Register
├── context/
│   └── ShopContext.jsx  # Global state management
├── services/
│   └── api.js           # 🆕 Complete API service layer
├── models/
│   └── index.js         # 🆕 Data models for backend integration
└── App.jsx              # Main app with routing
```

---

## 🎯 Key Pages & Features

### 1. **Style Finder** (`/style-finder`) 🌟
A unique Tinder-like interface for product discovery:
- Swipe right (❤️) to like products
- Swipe left (✕) to pass
- Automatically adds liked items to favorites
- Progress tracking and completion summary

### 2. **Multi-Step Checkout** (`/checkout`)
Professional 4-step checkout process:
- **Step 1**: Shipping Information
- **Step 2**: Shipping Method selection
- **Step 3**: Payment Information
- **Step 4**: Order Review

### 3. **Product Discovery** (`/shop`)
Advanced product browsing:
- Filter by category, price range, stock status
- Sort by price, rating, newest
- Search functionality
- Responsive grid layout

### 4. **Authentication** (`/login`, `/register`)
Complete auth system UI:
- Login with email/password
- Register with validation
- Social login buttons (Google, Facebook)
- Password visibility toggle
- Form validation with error messages

---

## 🔌 Backend Integration

This frontend is **100% backend-ready**! See [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) for:
- Complete API endpoint specifications
- Database schema recommendations (PostgreSQL & MongoDB)
- Step-by-step integration guide
- Data model documentation
- Authentication flow
- Security best practices

### Quick Backend Setup

1. **Update API URL** in `.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

2. **Use API Services**:
```javascript
import { productAPI, authAPI, cartAPI } from './services/api';

// Fetch products
const products = await productAPI.getAll();

// User login
const response = await authAPI.login({ email, password });

// Add to cart
await cartAPI.addItem(productId, quantity);
```

3. **Data Models** available in `src/models/index.js`:
   - Product, User, Order, CartItem, Address, Review, etc.

---

## 🎨 Design System

### Colors
- **Primary**: Gray-900 (dark)
- **Secondary**: Gray-500
- **Accent**: Indigo-600, Purple-600, Pink-500
- **Success**: Green-500
- **Error**: Red-500

### Components
All in `src/components/ui/`:
- **Button** - 6 variants (primary, secondary, outline, ghost, danger, success)
- **Input** - With label, error, helper text, icons
- **Modal** - Customizable sizes, backdrop, animations

### Typography
- Font Family: Inter (default)
- Responsive font sizes
- Proper heading hierarchy (H1-H6)

---

## 📱 Responsive Breakpoints

- **Mobile**: 0-639px (`sm`)
- **Tablet**: 640-1023px (`md`)
- **Desktop**: 1024-1279px (`lg`)
- **Large Desktop**: 1280px+ (`xl`)

---

## 🧪 Testing

### Run Linter
```bash
npm run lint
```

### Recommended Testing Stack
- **Jest** + **React Testing Library** for unit tests
- **Cypress** or **Playwright** for E2E tests
- **Storybook** for component documentation

---

## 📊 Progress Overview

**Overall Completion: ~85%** 🎉

### ✅ Completed
- Core e-commerce functionality
- Product catalog with filtering/sorting
- Shopping cart with persistence
- Checkout process (4 steps)
- Style Finder feature
- Authentication UI
- Testimonials section
- Backend-ready API layer
- Data models for integration
- Reusable UI components

### 🚧 In Progress / TODO
- User Dashboard (Orders, Profile, Addresses)
- Product Reviews functionality
- Infinite scroll / Pagination
- Advanced accessibility (ARIA labels)
- Dark mode
- Wishlist page implementation
- Order confirmation page
- Admin panel (future)

See [frontend-todo.md](frontend-todo.md) and [TODO.md](TODO.md) for detailed task lists.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2 | UI Framework |
| Vite | 7.2 | Build Tool & Dev Server |
| Tailwind CSS | 4.1 | Styling Framework |
| React Router | 7.10 | Client-side Routing |
| Lucide React | 0.556 | Icon Library |
| Context API | Built-in | State Management |

---

## 📖 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Author

**Aleyna Tila**
- GitHub: [@aleynatila](https://github.com/aleynatila)

---

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- Design inspiration from modern e-commerce platforms

---

## 📞 Support

For backend integration help, see [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)

For frontend development tasks, see [frontend-todo.md](frontend-todo.md)

**Happy Coding! 🚀**

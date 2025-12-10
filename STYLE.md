# 🎨 BUTIKS Design System & Style Guide

> A comprehensive guide to maintain visual consistency across all pages and components

---

## 📋 Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Components](#components)
5. [Page Layouts](#page-layouts)
6. [Interactive States](#interactive-states)
7. [Animations & Transitions](#animations--transitions)
8. [Accessibility Guidelines](#accessibility-guidelines)

---

## 🎨 Color Palette

### Primary Colors
```css
--color-primary: rgb(17, 24, 39)       /* gray-900 - Main brand color */
--color-secondary: rgb(107, 114, 128)  /* gray-500 - Secondary text */
--color-accent: rgb(79, 70, 229)       /* indigo-600 - CTA buttons */
```

### Semantic Colors
```css
--color-success: rgb(34, 197, 94)      /* green-500 - Success states */
--color-error: rgb(239, 68, 68)        /* red-500 - Error states */
--color-warning: rgb(251, 146, 60)     /* orange-400 - Warning states */
--color-info: rgb(59, 130, 246)        /* blue-500 - Info states */
```

### Background Colors
- **Page Background**: `bg-gray-50` (Light gray for main content areas)
- **Card Background**: `bg-white` (White for cards and containers)
- **Section Alternating**: Alternate between `bg-white` and `bg-gray-50`

### Border Colors
- **Default**: `border-gray-200` (Light borders)
- **Hover**: `border-gray-300` (Slightly darker on interaction)
- **Focus**: `border-indigo-500` (Accent color for focused inputs)

---

## 📝 Typography

### Font Family
```css
font-family: Inter, system-ui, Helvetica, Arial, sans-serif;
```

### Headings
```jsx
// Page Titles (H1)
<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">

// Section Titles (H2)
<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">

// Subsection Titles (H3)
<h3 className="text-lg font-semibold text-gray-900 mb-4">

// Card Titles (H4)
<h4 className="font-semibold text-gray-900">
```

### Body Text
```jsx
// Large body text
<p className="text-lg text-gray-600">

// Regular body text
<p className="text-base text-gray-700">

// Small text
<p className="text-sm text-gray-600">

// Extra small (captions)
<p className="text-xs text-gray-500">
```

### Font Weights
- **Normal**: `font-normal` (400)
- **Medium**: `font-medium` (500)
- **Semibold**: `font-semibold` (600)
- **Bold**: `font-bold` (700)

---

## 📐 Spacing & Layout

### Container Widths
```jsx
// Standard page container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Narrow content (forms, articles)
<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

// Wide content (galleries)
<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
```

### Section Spacing
```jsx
// Standard section padding
<section className="py-12 px-4 sm:px-6 lg:px-8">

// Large section padding
<section className="py-16 px-4 sm:px-6 lg:px-8">

// Extra large section padding
<section className="py-20 px-4 sm:px-6 lg:px-8">
```

### Gap Utilities
- **Tight**: `gap-2` (8px)
- **Normal**: `gap-4` (16px)
- **Comfortable**: `gap-6` (24px)
- **Spacious**: `gap-8` (32px)

---

## 🧩 Components

### Buttons

#### Primary Button
```jsx
<button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
  Button Text
</button>
```

#### Secondary Button
```jsx
<button className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
  Button Text
</button>
```

#### Outline Button
```jsx
<button className="border-2 border-gray-900 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors">
  Button Text
</button>
```

#### Ghost Button
```jsx
<button className="text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
  Button Text
</button>
```

#### Button Sizes
```jsx
// Small
<button className="px-3 py-1.5 text-sm rounded-md">

// Medium (default)
<button className="px-4 py-2 text-base rounded-lg">

// Large
<button className="px-6 py-3 text-lg rounded-xl">

// Extra Large
<button className="px-8 py-4 text-xl rounded-xl">
```

### Input Fields
```jsx
<input 
  type="text"
  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  placeholder="Enter text..."
/>
```

### Cards

#### Standard Card
```jsx
<div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
  {/* Card content */}
</div>
```

#### Product Card
```jsx
<div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
  <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
    <img 
      src={image}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
    />
  </div>
  <div className="p-4">
    {/* Card content */}
  </div>
</div>
```

### Badges

#### Status Badges
```jsx
// Success/Delivered
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">

// Info/Shipped
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">

// Warning/Processing
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">

// Error/Cancelled
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
```

#### Label Badges
```jsx
// New
<span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>

// Sale
<span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">-20%</span>

// Sold Out
<span className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">SOLD OUT</span>
```

### Icons

#### Icon Containers (Features)
```jsx
// Primary
<div className="p-3 bg-indigo-100 rounded-lg">
  <Icon className="w-6 h-6 text-indigo-600" />
</div>

// Success
<div className="p-3 bg-green-100 rounded-lg">
  <Icon className="w-6 h-6 text-green-600" />
</div>

// Warning
<div className="p-3 bg-orange-100 rounded-lg">
  <Icon className="w-6 h-6 text-orange-600" />
</div>

// Info
<div className="p-3 bg-blue-100 rounded-lg">
  <Icon className="w-6 h-6 text-blue-600" />
</div>
```

---

## 📄 Page Layouts

### Standard Page Structure
```jsx
<div className="min-h-screen bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Page Title
      </h1>
      <p className="text-gray-600">Page description</p>
    </div>

    {/* Page Content */}
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <aside className="lg:col-span-1">
        {/* Sidebar content */}
      </aside>

      {/* Main Content */}
      <main className="lg:col-span-3">
        {/* Main content */}
      </main>
    </div>
  </div>
</div>
```

### Two-Column Layout (Account, Settings)
```jsx
<div className="grid lg:grid-cols-4 gap-8">
  {/* Sidebar Navigation (1 column) */}
  <div className="lg:col-span-1">
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
      {/* Navigation menu */}
    </div>
  </div>

  {/* Main Content (3 columns) */}
  <div className="lg:col-span-3">
    <div className="bg-white rounded-lg shadow-sm p-8">
      {/* Content */}
    </div>
  </div>
</div>
```

### Grid Layouts

#### Product Grid
```jsx
// 2 columns mobile, 3 columns tablet, 4 columns desktop
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  {/* Product cards */}
</div>

// 2 columns mobile, 3 columns desktop (featured)
<div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Product cards */}
</div>
```

#### Category Grid
```jsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Category cards */}
</div>
```

---

## 🎭 Interactive States

### Hover States
```jsx
// Cards
className="hover:shadow-lg transition-shadow duration-300"

// Buttons
className="hover:bg-gray-800 transition-colors"

// Images
className="transition-transform duration-500 hover:scale-110"

// Links
className="hover:text-gray-900 transition-colors"
```

### Focus States
```jsx
// Inputs
className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"

// Buttons
className="focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"

// Links
className="focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded"
```

### Active States
```jsx
// Navigation Active Tab
className="bg-indigo-50 text-indigo-600"

// Navigation Inactive Tab
className="text-gray-700 hover:bg-gray-50"
```

### Disabled States
```jsx
className="disabled:opacity-50 disabled:cursor-not-allowed"
```

---

## ✨ Animations & Transitions

### Standard Transitions
```jsx
// Fast (hover effects)
className="transition-colors duration-150"

// Medium (most UI interactions)
className="transition-all duration-300"

// Slow (images, complex animations)
className="transition-transform duration-500"
```

### Common Animations

#### Fade In
```jsx
className="animate-fade-in"
```

#### Scale on Hover
```jsx
className="transition-transform duration-300 hover:scale-105"
```

#### Image Zoom
```jsx
className="transition-transform duration-500 group-hover:scale-110"
```

#### Slide Up on Hover
```jsx
className="transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
```

### Loading States
```jsx
// Spinner
<svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>

// Skeleton
<div className="bg-gray-200 animate-pulse rounded-lg h-64" />
```

---

## ♿ Accessibility Guidelines

### Color Contrast
- Ensure text has at least 4.5:1 contrast ratio for body text
- Ensure text has at least 3:1 contrast ratio for large text
- Use semantic colors consistently (green for success, red for error, etc.)

### Focus Indicators
- Always provide visible focus indicators: `focus:ring-2 focus:ring-indigo-500`
- Never use `outline-none` without providing alternative focus styles

### ARIA Labels
```jsx
// Interactive buttons without text
<button aria-label="Add to cart">
  <ShoppingBag className="w-5 h-5" />
</button>

// Navigation
<nav aria-label="Main navigation">
  {/* Navigation items */}
</nav>

// Modal
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  {/* Modal content */}
</div>
```

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Use proper semantic HTML (`<button>`, `<a>`, `<input>`)
- Support Tab navigation through all interactive elements

### Screen Reader Text
```jsx
<span className="sr-only">Screen reader only text</span>
```

---

## 📱 Responsive Design

### Breakpoints
```css
sm: 640px   /* Small devices (landscape phones) */
md: 768px   /* Medium devices (tablets) */
lg: 1024px  /* Large devices (laptops) */
xl: 1280px  /* Extra large devices (desktops) */
2xl: 1536px /* Extra extra large devices */
```

### Responsive Patterns

#### Hide/Show Elements
```jsx
// Hide on mobile, show on desktop
className="hidden lg:block"

// Show on mobile, hide on desktop
className="lg:hidden"

// Show on mobile and tablet, hide on desktop
className="xl:hidden"
```

#### Responsive Text
```jsx
className="text-2xl md:text-3xl lg:text-4xl"
```

#### Responsive Spacing
```jsx
className="px-4 sm:px-6 lg:px-8"
className="py-8 md:py-12 lg:py-16"
```

#### Responsive Grids
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
```

---

## 🎯 Component Usage Examples

### Feature Section
```jsx
<section className="py-12 bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-indigo-100 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Feature Title</h3>
          <p className="text-sm text-gray-600">Feature description</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Hero Section
```jsx
<section className="relative h-[600px] lg:h-[700px] overflow-hidden">
  <img 
    src={heroImage}
    alt="Hero"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black bg-opacity-40" />
  <div className="absolute inset-0 flex items-center justify-center text-center px-4">
    <div className="max-w-3xl">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        Hero Title
      </h1>
      <p className="text-lg md:text-xl text-white/90 mb-8">
        Hero description text
      </p>
      <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
        Call to Action
      </button>
    </div>
  </div>
</section>
```

### Empty State
```jsx
<div className="text-center py-12">
  <Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
  <p className="text-gray-500 mb-4">No items found</p>
  <Button onClick={handleAction}>
    Take Action
  </Button>
</div>
```

---

## 📦 Best Practices

### Do's
✅ Use consistent spacing from the spacing scale
✅ Maintain 4.5:1 color contrast for text
✅ Use semantic HTML elements
✅ Provide hover and focus states for all interactive elements
✅ Use transitions for smooth interactions
✅ Test on mobile devices
✅ Use the existing Button component for all buttons
✅ Follow the established grid patterns
✅ Use rounded corners consistently (rounded-lg for most elements)
✅ Stick to the defined color palette

### Don'ts
❌ Don't use arbitrary spacing values
❌ Don't mix different button styles on the same page
❌ Don't forget to add aria-labels to icon buttons
❌ Don't use pure black (#000000) or pure white (#FFFFFF)
❌ Don't create custom shadows - use the shadow utilities
❌ Don't skip responsive design considerations
❌ Don't use inline styles
❌ Don't create one-off components - reuse existing ones
❌ Don't forget loading and error states
❌ Don't use different border radius values arbitrarily

---

## 🔄 Quick Reference

### Common Class Combinations

#### Card Container
```jsx
className="bg-white rounded-lg shadow-sm p-6"
```

#### Section Header
```jsx
className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center"
```

#### Form Input
```jsx
className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
```

#### Grid Container
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

#### Image Overlay
```jsx
className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"
```

---

## 📞 Need Help?

If you're unsure about styling decisions:
1. Check existing pages for similar components
2. Refer to this style guide
3. Use the pre-built components in `/src/components/ui/`
4. Maintain consistency with the established patterns

**Remember**: Consistency is key to a professional user experience!

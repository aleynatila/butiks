# Kategori Mimarisi ve Sayfa Yapısı

## 📋 Genel Bakış
E-ticaret sitelerinde kategori yapısı genellikle **hiyerarşik (ağaç yapısı)** olarak kurgulanır. Bu yaklaşım SEO, kullanıcı deneyimi ve kod organizasyonu açısından endüstri standardıdır.

## 🌳 Kategori Ağaç Yapısı

```
/shop
├── /women (Kadın)
│   ├── /clothing (Giyim)
│   │   ├── /dresses (Elbiseler)
│   │   ├── /tops (Üst Giyim)
│   │   ├── /pants-skirts (Pantolon & Etekler)
│   │   ├── /outerwear (Dış Giyim)
│   │   ├── /underwear (İç Giyim)
│   │   └── /swimwear (Mayo & Bikini)
│   ├── /shoes (Ayakkabı)
│   │   ├── /heels (Topuklu Ayakkabılar)
│   │   ├── /sneakers (Spor Ayakkabılar)
│   │   ├── /boots (Botlar)
│   │   ├── /sandals (Sandalet)
│   │   └── /flats (Babet)
│   └── /accessories (Aksesuar)
│       ├── /bags (Çanta)
│       ├── /jewelry (Takı)
│       ├── /hats (Şapka & Bere)
│       ├── /belts (Kemer)
│       ├── /scarves (Şal & Atkı)
│       └── /sunglasses (Güneş Gözlüğü)
│
├── /men (Erkek)
│   ├── /clothing (Giyim)
│   │   ├── /shirts (Tişört & Gömlek)
│   │   ├── /pants (Pantolon)
│   │   ├── /jackets (Ceket & Mont)
│   │   ├── /sweaters (Kazak & Hırka)
│   │   ├── /underwear (İç Giyim)
│   │   └── /sportswear (Spor Giyim)
│   ├── /shoes (Ayakkabı)
│   │   ├── /sneakers (Spor Ayakkabılar)
│   │   ├── /formal (Klasik Ayakkabılar)
│   │   ├── /boots (Bot & Postal)
│   │   ├── /sandals (Sandalet & Terlik)
│   │   └── /athletic (Sneaker)
│   └── /accessories (Aksesuar)
│       ├── /bags-wallets (Çanta & Cüzdan)
│       ├── /watches (Saat)
│       ├── /belts (Kemer)
│       ├── /hats (Şapka & Bere)
│       ├── /sunglasses (Güneş Gözlüğü)
│       └── /ties (Kravat & Papyon)
│
├── /accessories (Aksesuar - Genel)
│   ├── /bags (Çantalar)
│   │   ├── /shoulder-bags (Omuz Çantası)
│   │   ├── /handbags (El Çantası)
│   │   ├── /backpacks (Sırt Çantası)
│   │   ├── /laptop-bags (Laptop Çantası)
│   │   ├── /clutch (Clutch)
│   │   └── /wallets (Cüzdan)
│   ├── /jewelry (Takı & Saat)
│   │   ├── /necklaces (Kolye)
│   │   ├── /earrings (Küpe)
│   │   ├── /bracelets (Bileklik)
│   │   ├── /rings (Yüzük)
│   │   ├── /watches (Saat)
│   │   └── /sets (Takı Setleri)
│   └── /other (Diğer)
│       ├── /sunglasses (Güneş Gözlüğü)
│       ├── /hats (Şapka & Bere)
│       ├── /belts (Kemer)
│       ├── /scarves (Şal & Atkı)
│       └── /gloves (Eldiven)
│
└── /shoes (Ayakkabı - Genel)
    ├── /women-shoes (Kadın Ayakkabı)
    │   ├── /heels (Topuklu)
    │   ├── /sneakers (Spor Ayakkabı)
    │   ├── /boots (Bot)
    │   ├── /sandals (Sandalet)
    │   ├── /flats (Babet)
    │   └── /athletic (Sneaker)
    ├── /men-shoes (Erkek Ayakkabı)
    │   ├── /sneakers (Spor Ayakkabı)
    │   ├── /formal (Klasik Ayakkabı)
    │   ├── /boots (Bot & Postal)
    │   ├── /sandals (Sandalet)
    │   ├── /athletic (Sneaker)
    │   └── /loafers (Loafer)
    └── /seasonal (Sezona Özel)
        ├── /winter-boots (Kış Botları)
        ├── /summer-sandals (Yaz Sandaletleri)
        ├── /waterproof (Su Geçirmez)
        └── /running-shoes (Koşu Ayakkabıları)
```

## 🎯 Routing Stratejisi

### 1. **Dinamik Route Yapısı (Önerilen)**
```javascript
// React Router v7 yapısı
<Route path="/shop/:gender/:category/:subcategory?" element={<CategoryPage />} />

// Örnekler:
/shop/women → Kadın ana kategori
/shop/women/clothing → Kadın giyim
/shop/women/clothing/dresses → Kadın elbiseler
/shop/men/shoes/sneakers → Erkek spor ayakkabılar
```

### 2. **Catch-All Route (Alternatif)**
```javascript
<Route path="/shop/*" element={<DynamicCategoryPage />} />
// URL'yi parse edip kategoriyi dinamik olarak belirle
```

## 📁 Dosya ve Komponent Yapısı

```
src/
├── pages/
│   ├── CategoryPage.jsx          # Ana kategori sayfası
│   ├── SubCategoryPage.jsx       # Alt kategori sayfası (opsiyonel)
│   └── ProductListPage.jsx       # Ürün listeleme sayfası
│
├── components/
│   ├── category/
│   │   ├── CategoryHero.jsx      # Kategori hero banner
│   │   ├── CategoryGrid.jsx      # Kategori kartları grid
│   │   ├── CategoryCard.jsx      # Tek kategori kartı
│   │   ├── Breadcrumb.jsx        # Breadcrumb navigasyon
│   │   ├── CategoryFilters.jsx   # Filtreleme sidebar
│   │   ├── CategorySort.jsx      # Sıralama dropdown
│   │   └── SubCategoryNav.jsx    # Alt kategori navigasyonu
│   │
│   └── product/
│       ├── ProductGrid.jsx       # Ürün grid layout
│       ├── ProductCard.jsx       # Tek ürün kartı (var)
│       └── ProductListItem.jsx   # Liste görünümü kartı
│
├── data/
│   └── categories.js             # Kategori metadata ve yapılandırma
│
├── hooks/
│   ├── useCategory.js            # Kategori verisi hook'u
│   ├── useProducts.js            # Ürün verisi hook'u
│   └── useFilters.js             # Filtreleme logic hook'u
│
└── utils/
    ├── categoryHelpers.js        # Kategori yardımcı fonksiyonlar
    └── urlHelpers.js             # URL parse/generate fonksiyonlar
```

## 🗂️ Veri Modeli

### categories.js
```javascript
export const categoryStructure = {
  women: {
    slug: 'women',
    title: 'Kadın',
    description: 'Kadın giyim, ayakkabı ve aksesuar koleksiyonları',
    image: '/images/categories/women-hero.jpg',
    icon: 'User',
    seo: {
      title: 'Kadın Giyim ve Aksesuar | BUTIKS',
      description: 'En yeni kadın giyim, ayakkabı ve aksesuar koleksiyonları',
      keywords: ['kadın giyim', 'kadın ayakkabı', 'kadın aksesuar']
    },
    subcategories: {
      clothing: {
        slug: 'clothing',
        title: 'Giyim',
        description: 'Kadın giyim ürünleri',
        image: '/images/categories/women-clothing.jpg',
        items: [
          {
            slug: 'dresses',
            title: 'Elbiseler',
            count: 234,
            image: '/images/categories/dresses.jpg',
            tags: ['günlük', 'abiye', 'casual', 'mini', 'maxi']
          },
          // ... diğer items
        ]
      },
      // ... diğer subcategories
    }
  },
  // ... diğer ana kategoriler
}
```

## 🎨 Sayfa Türleri ve Bileşenleri

### 1. **Ana Kategori Sayfası** (`/shop/women`)
```
┌─────────────────────────────────────┐
│  Hero Banner (Kategori görseli)    │
│  "Kadın Koleksiyonu"                │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  Breadcrumb: Ana Sayfa > Kadın      │
└─────────────────────────────────────┘
┌──────────┬──────────┬──────────┐
│  Giyim   │ Ayakkabı │ Aksesuar │
│  (Card)  │  (Card)  │  (Card)  │
│  234 Ürün│  156 Ürün│  89 Ürün │
└──────────┴──────────┴──────────┘
┌─────────────────────────────────────┐
│  Öne Çıkan Ürünler (Grid)           │
│  [Product] [Product] [Product]...   │
└─────────────────────────────────────┘
```

### 2. **Alt Kategori Sayfası** (`/shop/women/clothing`)
```
┌─────────────────────────────────────┐
│  Breadcrumb: Ana > Kadın > Giyim    │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  Alt Kategori Çipleri (Chips)       │
│  [Elbiseler] [Üst Giyim] [Pantolon] │
└─────────────────────────────────────┘
┌──────────┬──────────────────────────┐
│ Filters  │  Sort: Popüler ▼          │
│ ▼ Beden  │  ┌──────┬──────┬──────┐  │
│ □ XS     │  │Product│Product│Product│
│ □ S      │  │ Card  │ Card  │ Card  │
│ □ M      │  ├──────┼──────┼──────┤  │
│ ▼ Renk   │  │Product│Product│Product│
│ □ Siyah  │  └──────┴──────┴──────┘  │
│ □ Beyaz  │  [Sayfalama: 1 2 3 ... 10]│
└──────────┴──────────────────────────┘
```

### 3. **En Alt Kategori Sayfası** (`/shop/women/clothing/dresses`)
```
┌─────────────────────────────────────┐
│  Breadcrumb: Ana > Kadın > Giyim >  │
│              Elbiseler               │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  "Elbiseler" - 234 Ürün Bulundu     │
└─────────────────────────────────────┘
┌──────────┬──────────────────────────┐
│ Filters  │  Grid/List View Toggle    │
│ Sidebar  │  [🔲] [☰]                 │
│          │  ┌────────────────────┐   │
│ ▼ Stil   │  │ 4 Ürün / Satır     │   │
│ □ Günlük │  │ Product Grid       │   │
│ □ Abiye  │  │                    │   │
│ □ Casual │  └────────────────────┘   │
│          │                           │
│ ▼ Uzunluk│  [Daha Fazla Yükle]       │
│ □ Mini   │                           │
│ □ Midi   │                           │
│ □ Maxi   │                           │
└──────────┴──────────────────────────┘
```

## 🔧 Uygulama Yaklaşımları

### Yaklaşım 1: **Tek Bileşen, Dinamik Render** (Önerilen)
```javascript
// CategoryPage.jsx
const CategoryPage = () => {
  const { gender, category, subcategory } = useParams();
  const { categoryData, products } = useCategory(gender, category, subcategory);
  
  // URL derinliğine göre farklı layout render et
  if (!category) {
    return <MainCategoryView data={categoryData} />;
  } else if (!subcategory) {
    return <SubCategoryView data={categoryData} products={products} />;
  } else {
    return <ProductListView data={categoryData} products={products} />;
  }
};
```

**Avantajları:**
- Tek dosya, kolay bakım
- Kod tekrarı yok
- State management basit
- Route tanımı minimal

### Yaklaşım 2: **Ayrı Sayfa Bileşenleri**
```javascript
// Farklı route'lar
<Route path="/shop/:gender" element={<MainCategoryPage />} />
<Route path="/shop/:gender/:category" element={<SubCategoryPage />} />
<Route path="/shop/:gender/:category/:subcategory" element={<ProductListPage />} />
```

**Avantajları:**
- Her sayfa bağımsız optimize edilebilir
- Code splitting daha kolay
- Test edilmesi daha basit

### Yaklaşım 3: **Hibrit Yaklaşım** (En İyi Seçenek)
```javascript
// Ana container
<Route path="/shop/*" element={<CategoryLayout />}>
  <Route index element={<AllCategoriesPage />} />
  <Route path=":gender" element={<GenderCategoryPage />} />
  <Route path=":gender/:category" element={<SubCategoryPage />} />
  <Route path=":gender/:category/:subcategory" element={<ProductListPage />} />
</Route>
```

## 🎯 Filtreleme ve Sıralama

### Filtre Tipleri
```javascript
const filterTypes = {
  price: {
    type: 'range',
    min: 0,
    max: 10000,
    step: 100
  },
  size: {
    type: 'checkbox',
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  color: {
    type: 'color-picker',
    options: [
      { name: 'Siyah', hex: '#000000' },
      { name: 'Beyaz', hex: '#FFFFFF' },
      // ...
    ]
  },
  brand: {
    type: 'checkbox-search',
    options: ['Nike', 'Adidas', 'Zara', ...]
  },
  style: {
    type: 'tag',
    options: ['Casual', 'Formal', 'Sport', ...]
  }
}
```

### Sıralama Seçenekleri
```javascript
const sortOptions = [
  { value: 'popularity', label: 'En Popüler' },
  { value: 'newest', label: 'En Yeni' },
  { value: 'price-asc', label: 'Fiyat: Düşükten Yükseğe' },
  { value: 'price-desc', label: 'Fiyat: Yüksekten Düşüğe' },
  { value: 'rating', label: 'En Yüksek Puan' },
  { value: 'discount', label: 'En Çok İndirim' }
]
```

## 📱 Responsive Davranış

### Desktop (>1024px)
- Sidebar filtreleme (sol)
- 4 ürün/satır grid
- Sticky sidebar scroll
- Hover efektleri aktif

### Tablet (768px - 1024px)
- Collapsible sidebar veya drawer
- 3 ürün/satır grid
- Touch-friendly butonlar

### Mobile (<768px)
- Bottom sheet filtreleme
- 2 ürün/satır grid (1 ürün çok küçük olur)
- Sticky sıralama bar
- Infinite scroll önerilen

## 🔍 SEO ve Meta

### Her kategori için:
```javascript
{
  title: "Kadın Elbise Modelleri | En Yeni Koleksiyon | BUTIKS",
  description: "2025 yılının en şık kadın elbiseleri BUTIKS'te. Günlük, abiye ve özel koleksiyonlar uygun fiyatlarla.",
  canonical: "https://butiks.com/shop/women/clothing/dresses",
  og: {
    image: "/images/categories/women-dresses-og.jpg",
    type: "product.group"
  },
  schema: {
    "@type": "CollectionPage",
    "@id": "https://butiks.com/shop/women/clothing/dresses",
    name: "Kadın Elbiseleri",
    description: "...",
    numberOfItems: 234
  }
}
```

## 🚀 Performans Optimizasyonları

1. **Lazy Loading**: Alt kategoriler lazy load
2. **Pagination**: 24-48 ürün/sayfa
3. **Image Optimization**: WebP format, lazy load, blur placeholder
4. **Cache Strategy**: Category metadata cache, product cache (5 min)
5. **Prefetching**: Hover'da next category prefetch

## 📊 Analytics ve Tracking

```javascript
// Her kategori view için
trackEvent('category_view', {
  category: 'women',
  subcategory: 'clothing',
  item: 'dresses',
  path: '/shop/women/clothing/dresses'
});

// Filter kullanımı
trackEvent('filter_applied', {
  filterType: 'size',
  filterValue: 'M',
  category: 'women/clothing/dresses'
});
```

## 🎨 UI/UX Best Practices

1. **Breadcrumb her sayfada görünür olmalı**
2. **Aktif kategori highlight edilmeli**
3. **Boş kategori state'i için güzel empty state**
4. **Skeleton loading states**
5. **Filter count badges** (Giyim (234))
6. **Quick view modal** (popup ürün detayı)
7. **Sticky "Filtrele" butonu** mobile'da
8. **Back to top button** uzun listelerde

## 🔄 State Management

### Context API Yapısı
```javascript
CategoryContext
├── selectedFilters
├── sortBy
├── viewMode (grid/list)
├── priceRange
└── currentPage

ProductsContext
├── products
├── loading
├── error
└── pagination
```

### URL Query Params (Önerilen)
```
/shop/women/clothing/dresses?
  size=M,L&
  color=black,white&
  price=100-500&
  sort=price-asc&
  page=2
```

## 📝 Sonraki Adımlar

1. ✅ Kategori data structure oluştur (`categories.js`)
2. ✅ Dinamik route yapısını kur
3. ✅ CategoryPage bileşenini oluştur
4. ✅ Filtreleme sistemini implement et
5. ✅ Product grid ve list view
6. ✅ Breadcrumb component
7. ✅ SEO meta tags
8. ✅ Mobile responsive
9. ✅ Loading states
10. ✅ Empty states

## 🎯 MVP İçin Öncelikli Özellikler

1. **Temel routing** (3 seviye: gender/category/subcategory)
2. **Basit filtreleme** (sadece beden, fiyat, renk)
3. **Grid view** (list view sonra)
4. **Breadcrumb**
5. **Sayfalama** (infinite scroll sonra)

---

*Bu mimari modüler, ölçeklenebilir ve maintainable bir yapı sağlar. İhtiyaca göre özelleştirilebilir.*

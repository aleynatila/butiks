# 🏪 Butiks Marketplace Mimarisi

## 📋 Genel Bakış

**Butiks.com** - Çok Satıcılı (Multi-Vendor) E-Ticaret Marketplace Platformu

### Konsept
- Her butik sahibi kendi mağazasını açabilir
- Ürünlerini ekleyip yönetebilir
- Stok takibi yapabilir
- Siparişleri görebilir
- Gelir raporlarını takip edebilir
- Müşteriler tüm butiklerden alışveriş yapabilir

---

## 🎭 Kullanıcı Rolleri

### 1. **Super Admin** (Platform Sahibi)
- Tüm butiksları yönetir
- Butik başvurularını onaylar/reddeder
- Platform ayarlarını yönetir
- Komisyon oranlarını belirler
- Tüm istatistikleri görür
- Ödeme dağıtımlarını yapar

### 2. **Vendor (Butik Sahibi)**
- Kendi butik paneline erişir
- Ürün ekler/düzenler/siler
- Stok yönetimi yapar
- Siparişleri görür ve durumlarını günceller
- Kendi satış raporlarını görür
- Butik profili düzenler (logo, açıklama, iletişim)
- Müşteri yorumlarını görür

### 3. **Customer (Müşteri)**
- Tüm butiklerdeki ürünleri görebilir
- Farklı butiklerden alışveriş yapabilir
- Ürünleri favorilere ekler
- Siparişlerini takip eder
- Ürünleri değerlendirir ve yorum yapar
- Butikleri takip edebilir

---

## 🗄️ Veri Modelleri (Database Schema)

### Users Table
```javascript
{
  id: UUID,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  phone: String,
  role: Enum ['customer', 'vendor', 'admin'],
  isEmailVerified: Boolean,
  isActive: Boolean,
  avatar: String (URL),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Vendors (Butikler) Table
```javascript
{
  id: UUID,
  userId: UUID (FK -> Users),
  shopName: String (unique),
  slug: String (unique, URL-friendly),
  description: Text,
  logo: String (URL),
  banner: String (URL),
  
  // İletişim
  email: String,
  phone: String,
  website: String,
  
  // Adres
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  
  // Sosyal Medya
  social: {
    instagram: String,
    facebook: String,
    twitter: String
  },
  
  // İş Bilgileri
  taxId: String,
  bankAccount: {
    bankName: String,
    accountNumber: String,
    iban: String
  },
  
  // Platform Ayarları
  status: Enum ['pending', 'active', 'suspended', 'rejected'],
  commissionRate: Number (0-100), // Platform komisyon oranı
  isVerified: Boolean,
  verifiedAt: Timestamp,
  
  // İstatistikler
  stats: {
    totalProducts: Number,
    totalSales: Number,
    totalRevenue: Number,
    rating: Number (0-5),
    reviewCount: Number,
    followerCount: Number
  },
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Products Table
```javascript
{
  id: UUID,
  vendorId: UUID (FK -> Vendors),
  
  // Temel Bilgiler
  name: String,
  slug: String (unique per vendor),
  description: Text,
  shortDescription: String (160 chars),
  
  // Kategori & Etiketler
  categoryId: UUID (FK -> Categories),
  subcategoryId: UUID (FK -> Subcategories),
  tags: Array<String>,
  
  // Fiyatlandırma
  price: Decimal,
  compareAtPrice: Decimal, // Karşılaştırma fiyatı (indirim gösterimi için)
  costPrice: Decimal, // Maliyet (sadece vendor görür)
  
  // Stok
  sku: String (unique),
  barcode: String,
  stock: Number,
  lowStockThreshold: Number,
  trackInventory: Boolean,
  allowBackorder: Boolean,
  
  // Varyantlar (Beden, Renk vb.)
  hasVariants: Boolean,
  variants: [{
    id: UUID,
    name: String, // "Kırmızı - M"
    sku: String,
    price: Decimal,
    stock: Number,
    attributes: {
      color: String,
      size: String,
      material: String,
      pattern: String,
      // custom attributes...
    },
    image: String
  }],
  
  // Ürün Özellikleri (Kategori Bazlı - Dynamic Attributes)
  attributes: {
    // GİYİM için:
    fabric: String,              // "Pamuk", "Polyester", "Denim", "Yün"
    fabricComposition: String,   // "%100 Pamuk", "%80 Pamuk %20 Polyester"
    pattern: String,             // "Düz", "Çizgili", "Desenli", "Noktalı"
    fit: String,                 // "Slim Fit", "Regular Fit", "Oversize"
    sleeve: String,              // "Kısa Kol", "Uzun Kol", "Kolsuz"
    neckline: String,            // "Bisiklet Yaka", "V Yaka", "Boğazlı"
    length: String,              // "Kısa", "Midi", "Maxi", "Diz Üstü"
    waist: String,               // "Yüksek Bel", "Normal Bel", "Düşük Bel"
    closure: String,             // "Fermuarlı", "Düğmeli", "Lastikli"
    
    // AYAKKABI için:
    heelHeight: String,          // "0-3 cm", "3-5 cm", "5-8 cm", "8+ cm"
    heelType: String,            // "Düz", "Topuklu", "Platform", "Dolgu"
    toeStyle: String,            // "Açık Burun", "Kapalı Burun", "Sivri"
    fastening: String,           // "Bağcıklı", "Fermuarlı", "Tokalı", "Slip-On"
    sole: String,                // "Kauçuk", "Deri", "TPU", "Eva"
    
    // AKSESUAR için:
    material: String,            // "Deri", "Suni Deri", "Kumaş", "Metal"
    closure: String,             // "Fermuar", "Magnet", "Toka"
    strap: String,               // "Ayarlanabilir", "Sabit", "Çıkarılabilir"
    
    // ÇANTA için:
    capacity: String,            // "Küçük", "Orta", "Büyük"
    compartments: Number,        // Bölme sayısı
    waterproof: Boolean,         // Su geçirmez mi?
    
    // GENEL:
    season: String,              // "İlkbahar/Yaz", "Sonbahar/Kış", "4 Mevsim"
    occasion: String,            // "Günlük", "İş", "Spor", "Gece"
    careInstructions: Text,      // Bakım talimatları
    madeIn: String,              // "Türkiye", "İtalya", "Çin"
    brand: String,               // Marka (eğer butik çoklu marka satıyorsa)
    
    // Custom Fields (Vendor ekleyebilir)
    custom: {
      [key: String]: any         // Serbest alan
    }
  },
  
  // Görseller
  images: [{
    id: UUID,
    url: String,
    alt: String,
    order: Number,
    isMain: Boolean
  }],
  
  // Boyutlar & Ağırlık (Kargo için)
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: Enum ['cm', 'inch']
  },
  weight: {
    value: Number,
    unit: Enum ['kg', 'lb']
  },
  
  // SEO
  seo: {
    title: String,
    description: String,
    keywords: Array<String>
  },
  
  // Durum
  status: Enum ['draft', 'active', 'outOfStock', 'archived'],
  isPublished: Boolean,
  publishedAt: Timestamp,
  
  // İstatistikler
  stats: {
    viewCount: Number,
    favoriteCount: Number,
    soldCount: Number,
    rating: Number (0-5),
    reviewCount: Number
  },
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Categories Table
```javascript
{
  id: UUID,
  name: String,
  slug: String (unique),
  description: Text,
  image: String,
  parentId: UUID (FK -> Categories, null for top-level),
  order: Number,
  isActive: Boolean,
  
  // Kategori bazlı özellik şablonları
  attributeSchema: [{
    key: String,           // "fabric", "heelHeight", etc.
    label: String,         // "Kumaş", "Topuk Yüksekliği"
    type: Enum ['text', 'select', 'multiselect', 'number', 'boolean'],
    options: Array<String>, // Select için seçenekler
    required: Boolean,
    filterable: Boolean,   // Filtre olarak gösterilsin mi?
    displayOrder: Number
  }],
  
  // Örnek: Elbise kategorisi için
  // attributeSchema: [
  //   { key: 'fabric', label: 'Kumaş', type: 'select', 
  //     options: ['Pamuk', 'Polyester', 'Denim', 'Yün'], 
  //     required: true, filterable: true },
  //   { key: 'length', label: 'Boy', type: 'select',
  //     options: ['Kısa', 'Midi', 'Maxi'],
  //     required: true, filterable: true },
  //   { key: 'sleeve', label: 'Kol Tipi', type: 'select',
  //     options: ['Kısa Kol', 'Uzun Kol', 'Kolsuz'],
  //     filterable: true }
  // ]
  
  seo: {
    title: String,
    description: String
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Product Attributes (Detaylı Şema)

Her kategori için önceden tanımlanmış özellik setleri:

#### 🎽 GİYİM (Clothing)
```javascript
{
  // Kumaş Bilgileri
  fabric: {
    type: 'select',
    label: 'Kumaş Türü',
    options: [
      'Pamuk',
      'Polyester', 
      'Viskon',
      'Denim',
      'Yün',
      'Keten',
      'İpek',
      'Şifon',
      'Kadife',
      'Örme',
      'Triko',
      'Kot'
    ],
    required: true,
    filterable: true
  },
  
  fabricComposition: {
    type: 'text',
    label: 'Kumaş Kompozisyonu',
    placeholder: 'Örn: %80 Pamuk %20 Polyester',
    required: false
  },
  
  // Kalıp & Kesim
  fit: {
    type: 'select',
    label: 'Kalıp',
    options: [
      'Slim Fit',
      'Regular Fit', 
      'Oversize',
      'Bol Kesim',
      'Dar Kesim',
      'Vücuda Oturan'
    ],
    filterable: true
  },
  
  pattern: {
    type: 'select',
    label: 'Desen',
    options: [
      'Düz',
      'Çizgili',
      'Desenli',
      'Noktalı',
      'Çiçekli',
      'Kareli',
      'Geometrik',
      'Hayvan Deseni',
      'Baskılı'
    ],
    filterable: true
  },
  
  // Detaylar
  sleeve: {
    type: 'select',
    label: 'Kol Tipi',
    options: [
      'Kolsuz',
      'Kısa Kol',
      'Uzun Kol',
      '3/4 Kol',
      'Reglan Kol',
      'Yarasa Kol'
    ],
    filterable: true
  },
  
  neckline: {
    type: 'select',
    label: 'Yaka Tipi',
    options: [
      'Bisiklet Yaka',
      'V Yaka',
      'Boğazlı',
      'Polo Yaka',
      'Gömlek Yaka',
      'Hakim Yaka',
      'Kayık Yaka',
      'Degaje',
      'Yuvarlak Yaka',
      'Yakasız'
    ],
    filterable: true
  },
  
  length: {
    type: 'select',
    label: 'Boy',
    options: [
      'Kısa',
      'Midi',
      'Maxi',
      'Diz Üstü',
      'Diz Hizası',
      'Bilekte',
      'Crop'
    ],
    filterable: true
  },
  
  waist: {
    type: 'select',
    label: 'Bel',
    options: [
      'Yüksek Bel',
      'Normal Bel',
      'Düşük Bel'
    ],
    filterable: true
  },
  
  closure: {
    type: 'select',
    label: 'Kapanma Şekli',
    options: [
      'Fermuarlı',
      'Düğmeli',
      'Çıtçıtlı',
      'Bağlamalı',
      'Lastikli',
      'Kopça',
      'Çekme'
    ]
  },
  
  pockets: {
    type: 'boolean',
    label: 'Cepli'
  },
  
  lining: {
    type: 'boolean',
    label: 'Astarlı'
  }
}
```

#### 👟 AYAKKABI (Shoes)
```javascript
{
  heelHeight: {
    type: 'select',
    label: 'Topuk Yüksekliği',
    options: [
      'Düz (0-2 cm)',
      'Alçak Topuk (3-5 cm)',
      'Orta Topuk (5-8 cm)',
      'Yüksek Topuk (8-10 cm)',
      'Çok Yüksek (10+ cm)'
    ],
    filterable: true
  },
  
  heelType: {
    type: 'select',
    label: 'Topuk Tipi',
    options: [
      'Düz',
      'Kalın Topuk',
      'İnce Topuk',
      'Dolgu Topuk',
      'Platform',
      'Kama Topuk'
    ],
    filterable: true
  },
  
  toeStyle: {
    type: 'select',
    label: 'Burun Tipi',
    options: [
      'Kapalı Burun',
      'Açık Burun',
      'Sivri Burun',
      'Yuvarlak Burun',
      'Kare Burun'
    ],
    filterable: true
  },
  
  fastening: {
    type: 'select',
    label: 'Bağlama Şekli',
    options: [
      'Bağcıklı',
      'Fermuarlı',
      'Tokalı',
      'Cırtcırtlı',
      'Slip-On (Geçmeli)',
      'Lastikli'
    ],
    filterable: true
  },
  
  sole: {
    type: 'select',
    label: 'Taban Malzemesi',
    options: [
      'Kauçuk',
      'Deri',
      'TPU',
      'Eva',
      'Lastik',
      'Polyüretan'
    ]
  },
  
  upperMaterial: {
    type: 'select',
    label: 'Üst Malzeme',
    options: [
      'Deri',
      'Suni Deri',
      'Süet',
      'Nubuk',
      'Kumaş',
      'Patent',
      'Mesh'
    ],
    filterable: true
  },
  
  waterproof: {
    type: 'boolean',
    label: 'Su Geçirmez'
  },
  
  cushioned: {
    type: 'boolean',
    label: 'Yastıklamalı Taban'
  }
}
```

#### 👜 ÇANTA (Bags)
```javascript
{
  bagType: {
    type: 'select',
    label: 'Çanta Tipi',
    options: [
      'Omuz Çantası',
      'El Çantası',
      'Sırt Çantası',
      'Laptop Çantası',
      'Clutch',
      'Bel Çantası',
      'Postacı Çantası',
      'Tote Bag',
      'Çapraz Çanta'
    ],
    filterable: true,
    required: true
  },
  
  material: {
    type: 'select',
    label: 'Malzeme',
    options: [
      'Hakiki Deri',
      'Suni Deri',
      'Kumaş',
      'Süet',
      'Hasır',
      'Nubuk',
      'Canvas',
      'Plastik'
    ],
    filterable: true,
    required: true
  },
  
  closure: {
    type: 'select',
    label: 'Kapanma Şekli',
    options: [
      'Fermuar',
      'Manyetik',
      'Toka',
      'Çıtçıt',
      'Bağcık',
      'Açık'
    ]
  },
  
  strap: {
    type: 'select',
    label: 'Askı',
    options: [
      'Ayarlanabilir',
      'Sabit',
      'Çıkarılabilir',
      'Çift Askı',
      'Zincir',
      'Askısız'
    ],
    filterable: true
  },
  
  capacity: {
    type: 'select',
    label: 'Hacim',
    options: [
      'Mini',
      'Küçük',
      'Orta',
      'Büyük',
      'Extra Büyük'
    ],
    filterable: true
  },
  
  compartments: {
    type: 'number',
    label: 'Bölme Sayısı',
    min: 1,
    max: 10
  },
  
  waterproof: {
    type: 'boolean',
    label: 'Su Geçirmez'
  },
  
  laptopCompatible: {
    type: 'boolean',
    label: 'Laptop Uyumlu'
  },
  
  laptopSize: {
    type: 'select',
    label: 'Laptop Boyutu',
    options: [
      '13 inç',
      '14 inç',
      '15 inç',
      '16 inç',
      '17 inç'
    ],
    dependsOn: 'laptopCompatible'
  }
}
```

#### 💍 AKSESUAR (Accessories)
```javascript
{
  // Takı için
  jewelryType: {
    type: 'select',
    label: 'Takı Tipi',
    options: [
      'Kolye',
      'Küpe',
      'Bileklik',
      'Yüzük',
      'Broş',
      'Halhal',
      'Set'
    ],
    filterable: true
  },
  
  material: {
    type: 'select',
    label: 'Malzeme',
    options: [
      'Altın',
      'Gümüş',
      '925 Ayar Gümüş',
      'Pirinç',
      'Çelik',
      'Titanyum',
      'Taş',
      'İnci',
      'Kristal',
      'Reçine'
    ],
    filterable: true
  },
  
  plating: {
    type: 'select',
    label: 'Kaplama',
    options: [
      'Altın Kaplama',
      'Gümüş Kaplama',
      'Rodyum Kaplama',
      'Rose Gold',
      'Kaplamassız'
    ]
  },
  
  // Şapka için
  hatType: {
    type: 'select',
    label: 'Şapka Tipi',
    options: [
      'Bere',
      'Kasket',
      'Fötr',
      'Bucket',
      'Vizör',
      'Şapka'
    ],
    filterable: true
  },
  
  // Kemer için
  beltType: {
    type: 'select',
    label: 'Kemer Tipi',
    options: [
      'Klasik Kemer',
      'Kuşak',
      'Zincir Kemer',
      'Kordonlu Kemer'
    ],
    filterable: true
  },
  
  buckleType: {
    type: 'select',
    label: 'Toka Tipi',
    options: [
      'Metal Toka',
      'Otomatik Toka',
      'Çift Halka',
      'D Halka'
    ]
  }
}
```

#### 🕶️ Genel Özellikler (Tüm Ürünler)
```javascript
{
  season: {
    type: 'multiselect',
    label: 'Mevsim',
    options: [
      'İlkbahar',
      'Yaz',
      'Sonbahar',
      'Kış',
      '4 Mevsim'
    ],
    filterable: true
  },
  
  occasion: {
    type: 'multiselect',
    label: 'Kullanım Alanı',
    options: [
      'Günlük',
      'İş',
      'Spor',
      'Gece',
      'Düğün',
      'Parti',
      'Plaj',
      'Tatil'
    ],
    filterable: true
  },
  
  style: {
    type: 'multiselect',
    label: 'Stil',
    options: [
      'Casual',
      'Classic',
      'Sporty',
      'Elegant',
      'Bohemian',
      'Vintage',
      'Modern',
      'Minimalist',
      'Street Style'
    ],
    filterable: true
  },
  
  ageGroup: {
    type: 'select',
    label: 'Yaş Grubu',
    options: [
      'Çocuk (0-12)',
      'Genç (13-17)',
      'Yetişkin (18-35)',
      'Orta Yaş (36-55)',
      'Üst Yaş (55+)',
      'Her Yaş'
    ]
  },
  
  careInstructions: {
    type: 'multiselect',
    label: 'Bakım Talimatları',
    options: [
      'Makinede Yıkanabilir 30°',
      'Makinede Yıkanabilir 40°',
      'El İle Yıkayın',
      'Kuru Temizleme',
      'Ütü Yapılabilir',
      'Ütü Yapılamaz',
      'Çamaşır Suyu Kullanmayın',
      'Düz Kurutun',
      'Askıda Kurutun'
    ]
  },
  
  madeIn: {
    type: 'select',
    label: 'Üretim Yeri',
    options: [
      'Türkiye',
      'İtalya',
      'Fransa',
      'İspanya',
      'Çin',
      'Hindistan',
      'Bangladeş',
      'Portekiz',
      'ABD'
    ]
  },
  
  sustainability: {
    type: 'multiselect',
    label: 'Sürdürülebilirlik',
    options: [
      'Organik',
      'Geri Dönüştürülmüş',
      'Vegan',
      'Cruelty-Free',
      'El Yapımı',
      'Adil Ticaret',
      'Ekolojik'
    ],
    filterable: true
  }
}
```

### Orders Table
```javascript
{
  id: UUID,
  orderNumber: String (unique, auto-generated: "BT-20250001"),
  customerId: UUID (FK -> Users),
  
  // Her sipariş birden fazla vendor içerebilir
  vendorOrders: [{
    vendorId: UUID (FK -> Vendors),
    subOrderNumber: String, // "BT-20250001-V1"
    items: [{
      productId: UUID,
      variantId: UUID (optional),
      name: String,
      sku: String,
      price: Decimal,
      quantity: Number,
      image: String,
      vendorId: UUID
    }],
    subtotal: Decimal,
    shippingFee: Decimal,
    vendorTotal: Decimal,
    status: Enum ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    trackingNumber: String,
    shippingCarrier: String,
    statusHistory: [{
      status: String,
      note: String,
      timestamp: Timestamp
    }]
  }],
  
  // Müşteri Bilgileri
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String
  },
  
  // Teslimat Adresi
  shippingAddress: {
    firstName: String,
    lastName: String,
    street: String,
    street2: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  
  // Fatura Adresi
  billingAddress: {
    // same structure as shippingAddress
  },
  
  // Ödeme
  payment: {
    method: Enum ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
    status: Enum ['pending', 'paid', 'failed', 'refunded'],
    transactionId: String,
    paidAt: Timestamp,
    gateway: String // 'stripe', 'iyzico', etc.
  },
  
  // Tutarlar
  subtotal: Decimal,
  shippingTotal: Decimal,
  tax: Decimal,
  discount: Decimal,
  total: Decimal,
  
  // Platform Komisyonu
  platformCommission: Decimal,
  vendorPayouts: [{
    vendorId: UUID,
    amount: Decimal,
    commission: Decimal,
    netAmount: Decimal,
    status: Enum ['pending', 'processing', 'paid'],
    paidAt: Timestamp
  }],
  
  // Notlar
  customerNote: Text,
  adminNote: Text,
  
  // IP ve Tarayıcı (Fraud detection için)
  ipAddress: String,
  userAgent: String,
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Reviews Table
```javascript
{
  id: UUID,
  productId: UUID (FK -> Products),
  vendorId: UUID (FK -> Vendors),
  customerId: UUID (FK -> Users),
  orderId: UUID (FK -> Orders),
  
  rating: Number (1-5),
  title: String,
  comment: Text,
  
  // Fotoğraflar (müşteri ürün fotoğrafı ekleyebilir)
  images: Array<String>,
  
  // Moderasyon
  status: Enum ['pending', 'approved', 'rejected'],
  isVerifiedPurchase: Boolean,
  
  // Vendor Yanıtı
  vendorResponse: {
    comment: Text,
    respondedAt: Timestamp
  },
  
  // Yardımcı oldu mu?
  helpfulCount: Number,
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Vendor Followers Table
```javascript
{
  id: UUID,
  vendorId: UUID (FK -> Vendors),
  customerId: UUID (FK -> Users),
  createdAt: Timestamp
}
```

### Payout Requests Table (Vendor Ödemeleri)
```javascript
{
  id: UUID,
  vendorId: UUID (FK -> Vendors),
  amount: Decimal,
  status: Enum ['pending', 'processing', 'completed', 'rejected'],
  requestedAt: Timestamp,
  processedAt: Timestamp,
  processedBy: UUID (FK -> Users, admin),
  note: Text,
  bankAccount: Object,
  transactionId: String
}
```

---

## 🎯 Gelişmiş Filtreleme Sistemi

### Filtreleme Kategorileri

#### 1. **Temel Filtreler**
```javascript
{
  // Fiyat Aralığı
  price: {
    min: Number,
    max: Number
  },
  
  // Kategori
  categoryId: UUID,
  subcategoryId: UUID,
  
  // Marka/Butik
  vendorIds: Array<UUID>,
  
  // Durum
  inStock: Boolean,
  onSale: Boolean, // İndirimli ürünler
  isNew: Boolean, // Son 30 gün içinde eklenenler
  
  // Rating
  minRating: Number (1-5)
}
```

#### 2. **Ürün Özellikleri (Dynamic Filters)**
```javascript
{
  // Beden (Clothing)
  sizes: Array<String>, // ['XS', 'S', 'M', 'L', 'XL']
  
  // Renk
  colors: Array<String>, // ['Siyah', 'Beyaz', 'Kırmızı']
  
  // Malzeme (Fabric)
  materials: Array<String>, // ['Pamuk', 'Polyester', 'Denim']
  
  // Stil
  styles: Array<String>, // ['Casual', 'Formal', 'Sport']
  
  // Custom Attributes (Kategori bazlı)
  attributes: {
    [key: String]: Array<any>
  }
}
```

#### 3. **Sıralama (Sorting)**
```javascript
{
  sortBy: Enum [
    'relevance',     // En uygun
    'newest',        // En yeni
    'price_asc',     // Fiyat: Düşükten Yükseğe
    'price_desc',    // Fiyat: Yüksekten Düşüğe
    'popular',       // En popüler (satış sayısı)
    'rating',        // En yüksek puan
    'discount'       // En çok indirim
  ]
}
```

#### 4. **Görünüm Tercihleri**
```javascript
{
  view: Enum ['grid', 'list'],
  perPage: Number, // 24, 48, 96
  page: Number
}
```

### URL Query String Formatı
```
/shop/women/clothing/dresses?
  price=100-500&
  sizes=M,L&
  colors=black,white&
  vendors=vendor-1,vendor-2&
  inStock=true&
  sortBy=price_asc&
  page=1
```

---

## 🎨 Frontend Sayfalar ve Bileşenler

### Müşteri Tarafı (Customer-Facing)

#### 1. Ana Sayfa
- Hero slider
- Öne çıkan butikler
- Yeni ürünler
- İndirimli ürünler
- Kategoriler
- Testimonials

#### 2. Ürün Listeleme Sayfası
```
/shop/:gender/:category/:subcategory
```
**Bileşenler:**
- `FilterSidebar.jsx` - Sol sidebar filtreler
  - Fiyat aralığı slider
  - Kategori checkbox'ları
  - Butik seçimi (multi-select)
  - Beden seçimi
  - Renk paleti
  - Malzeme seçimi
  - Stok durumu toggle
  - İndirim toggle
- `ProductGrid.jsx` - Ürün kartları grid
- `SortDropdown.jsx` - Sıralama dropdown
- `ActiveFilters.jsx` - Aktif filtreler (removable chips)
- `Pagination.jsx` - Sayfa navigasyonu

#### 3. Ürün Detay Sayfası
```
/product/:vendorSlug/:productSlug
```
**Ek Bilgiler:**
- Butik bilgisi (logo, isim, takip butonu)
- Satıcı istatistikleri (rating, satış sayısı)
- Aynı butikten diğer ürünler
- Benzer ürünler

#### 4. Butik Sayfası
```
/shop/:vendorSlug
```
**İçerik:**
- Butik banner ve logo
- Butik açıklaması
- İstatistikler (ürün sayısı, rating, takipçi)
- Takip butonu
- Ürün kategorileri
- Tüm ürünleri (filtrelenebilir)
- Butik yorumları

#### 5. Sepet Sayfası
**Özellik:** Vendor'lara göre gruplanmış sepet
```
Sepetiniz (3 Butik, 5 Ürün)

┌─────────────────────────────────┐
│ 🏪 Butik 1 - "Trendy Fashion"  │
│   → Ürün 1: Elbise - 299 TL    │
│   → Ürün 2: Ayakkabı - 450 TL  │
│   Kargo: 30 TL                  │
│   Ara Toplam: 779 TL            │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 🏪 Butik 2 - "Classic Style"   │
│   → Ürün 3: Gömlek - 199 TL    │
│   → Ürün 4: Pantolon - 350 TL  │
│   → Ürün 5: Kemer - 89 TL      │
│   Kargo: 30 TL                  │
│   Ara Toplam: 668 TL            │
└─────────────────────────────────┘

Genel Toplam: 1,447 TL
```

#### 6. Checkout Sayfası
**Değişiklik:** Vendor bazlı kargo seçenekleri
- Her vendor için ayrı kargo seçimi
- Farklı teslimat süreleri

#### 7. Sipariş Takip Sayfası
**Özellik:** Vendor bazlı durum takibi
```
Sipariş #BT-20250001

┌─────────────────────────────────┐
│ Alt Sipariş #BT-20250001-V1     │
│ Butik: Trendy Fashion           │
│ Durum: Kargoya Verildi          │
│ Kargo Takip: 123456789          │
│ [Durum Çizelgesi]               │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Alt Sipariş #BT-20250001-V2     │
│ Butik: Classic Style            │
│ Durum: Hazırlanıyor             │
│ [Durum Çizelgesi]               │
└─────────────────────────────────┘
```

### Vendor Paneli (Butik Yönetim)

#### Dosya Yapısı
```
src/
├── pages/
│   └── vendor/
│       ├── VendorDashboard.jsx        # Ana panel
│       ├── VendorProducts.jsx         # Ürün listesi
│       ├── VendorProductEdit.jsx      # Ürün düzenleme
│       ├── VendorProductCreate.jsx    # Yeni ürün
│       ├── VendorOrders.jsx           # Siparişler
│       ├── VendorOrderDetail.jsx      # Sipariş detayı
│       ├── VendorInventory.jsx        # Stok yönetimi
│       ├── VendorReports.jsx          # Raporlar
│       ├── VendorSettings.jsx         # Ayarlar
│       ├── VendorProfile.jsx          # Butik profili
│       └── VendorPayouts.jsx          # Ödemeler
└── components/
    └── vendor/
        ├── VendorSidebar.jsx          # Sol menü
        ├── VendorHeader.jsx           # Üst bar
        ├── VendorStats.jsx            # İstatistik kartları
        ├── ProductForm.jsx            # Ürün formu
        ├── InventoryTable.jsx         # Stok tablosu
        ├── OrderTable.jsx             # Sipariş tablosu
        └── RevenueChart.jsx           # Gelir grafiği
```

#### 1. Dashboard (Ana Panel)
```
┌────────────────────────────────────────┐
│  Hoş Geldiniz, Trendy Fashion 🏪       │
└────────────────────────────────────────┘

┌──────────┬──────────┬──────────┬──────────┐
│ Toplam   │ Bekleyen │ Günlük   │ Toplam   │
│ Satış    │ Sipariş  │ Gelir    │ Ürün     │
│ 1,234    │    12    │ 4,500 TL │   89     │
└──────────┴──────────┴──────────┴──────────┘

[Son Siparişler Tablosu - 10 satır]
[Düşük Stoklu Ürünler - Uyarı]
[Satış Grafiği - Son 30 gün]
[En Çok Satan Ürünler - Top 5]
```

#### 2. Ürün Yönetimi
**Özellikler:**
- Tablo görünümü (sortable, filterable)
- Toplu işlemler (çoklu seçim)
  - Toplu fiyat güncelleme
  - Toplu durum değiştirme
  - Toplu silme
- Hızlı düzenleme (inline editing)
- CSV içe/dışa aktarma
- Fotoğraf toplu yükleme

**Ürün Ekleme Formu:**
```javascript
// Sekmeler
1. Temel Bilgiler
   - Ürün adı *
   - Açıklama (Rich text editor)
   - Kategori seçimi *
   - Etiketler

2. Fiyatlandırma & Stok
   - Satış fiyatı *
   - Karşılaştırma fiyatı
   - Maliyet fiyatı
   - SKU *
   - Stok miktarı *
   - Düşük stok uyarısı

3. Varyantlar (Opsiyonel)
   - Beden/Renk kombinasyonları
   - Her varyant için ayrı fiyat/stok

4. Görseller
   - Sürükle-bırak upload
   - Çoklu görsel
   - Ana görsel seçimi
   - Görselleri yeniden sırala

5. Kargo
   - Ağırlık
   - Boyutlar (UzxGexY)
   - Kargo ücreti

6. SEO (Opsiyonel)
   - Meta başlık
   - Meta açıklama
   - URL slug
```

#### 3. Sipariş Yönetimi
**Tablo Kolonları:**
- Sipariş No
- Tarih
- Müşteri
- Ürün Sayısı
- Toplam
- Durum
- Aksiyon

**Sipariş Durumları:**
- Beklemede (Pending)
- Onaylandı (Confirmed)
- Hazırlanıyor (Processing)
- Kargoya Verildi (Shipped)
- Teslim Edildi (Delivered)
- İptal (Cancelled)
- İade (Refunded)

**Sipariş Detay Sayfası:**
- Müşteri bilgileri
- Teslimat adresi
- Ürün listesi
- Ödeme bilgileri
- Durum geçmişi
- Kargo takip numarası girişi
- Sipariş notları
- Fatura yazdırma

#### 4. Stok Yönetimi
**Özellikler:**
- Düşük stoklu ürünler vurgulanır
- Toplu stok güncelleme
- Stok geçmişi (kim, ne zaman değiştirdi)
- Stok uyarı ayarları
- Stok hareketi raporu

**Tablo:**
```
┌──────────┬─────────┬───────┬────────┬────────┐
│ Ürün     │ SKU     │ Stok  │ Uyarı  │ Durum  │
├──────────┼─────────┼───────┼────────┼────────┤
│ Elbise 1 │ DR-001  │  5    │   10   │ 🔴 Düşük│
│ Ayakkabı │ SH-045  │  23   │    5   │ ✅ İyi  │
│ Çanta 3  │ BG-012  │  0    │    3   │ ⚫ Yok  │
└──────────┴─────────┴───────┴────────┴────────┘
```

#### 5. Raporlar & Analizler
**Rapor Tipleri:**
- Satış raporu (günlük/haftalık/aylık)
- Gelir raporu
- Ürün performans raporu
- Müşteri analizi
- En çok satanlar
- Kategori bazlı satışlar

**Grafikler:**
- Çizgi grafik (satış trendi)
- Bar grafik (kategori karşılaştırma)
- Pasta grafik (ürün dağılımı)

#### 6. Ödeme & Kazançlar
**Bakiye Kartı:**
```
┌─────────────────────────────────┐
│ Mevcut Bakiye: 12,450 TL        │
│ Bekleyen: 3,200 TL              │
│ Toplam Kazanç: 45,670 TL        │
│                                 │
│ [Ödeme Talep Et]                │
└─────────────────────────────────┘
```

**Ödeme Geçmişi Tablosu:**
- Tarih
- Tutar
- Durum
- İşlem No

#### 7. Butik Ayarları
**Sekmeler:**
- Genel Bilgiler
  - Butik adı
  - Açıklama
  - Logo & Banner
  - İletişim bilgileri
- Sosyal Medya
  - Instagram, Facebook, Twitter
- Banka Bilgileri
  - Hesap bilgileri (ödeme almak için)
- Bildirimler
  - Email bildirimleri
  - SMS bildirimleri
- Kargo Ayarları
  - Sabit kargo ücreti
  - Ücretsiz kargo minimum tutarı
  - Tahmini teslimat süresi

### Admin Paneli (Super Admin)

#### Dosya Yapısı
```
src/
└── pages/
    └── admin/
        ├── AdminDashboard.jsx
        ├── AdminVendors.jsx            # Butik yönetimi
        ├── AdminVendorApplications.jsx # Başvurular
        ├── AdminUsers.jsx              # Kullanıcı yönetimi
        ├── AdminOrders.jsx             # Tüm siparişler
        ├── AdminProducts.jsx           # Tüm ürünler
        ├── AdminCategories.jsx         # Kategori yönetimi
        ├── AdminReports.jsx            # Platform raporları
        ├── AdminPayouts.jsx            # Vendor ödemeleri
        └── AdminSettings.jsx           # Platform ayarları
```

#### Özellikler:
- Tüm butikleri görüntüleme
- Butik başvurularını onaylama/reddetme
- Butikleri askıya alma
- Komisyon oranlarını belirleme
- Kategori ekleme/düzenleme
- Platform geneli istatistikler
- Ödeme dağıtımı yönetimi

---

## 🔌 API Endpoint'leri

### Vendor Endpoints

```
POST   /api/vendor/apply                # Butik başvurusu
GET    /api/vendor/profile              # Butik profili
PUT    /api/vendor/profile              # Profil güncelleme
GET    /api/vendor/stats                # İstatistikler

# Ürünler
GET    /api/vendor/products             # Ürün listesi
POST   /api/vendor/products             # Yeni ürün
GET    /api/vendor/products/:id         # Ürün detayı
PUT    /api/vendor/products/:id         # Ürün güncelleme
DELETE /api/vendor/products/:id         # Ürün silme
PATCH  /api/vendor/products/bulk        # Toplu işlem

# Siparişler
GET    /api/vendor/orders               # Sipariş listesi
GET    /api/vendor/orders/:id           # Sipariş detayı
PATCH  /api/vendor/orders/:id/status    # Durum güncelleme
POST   /api/vendor/orders/:id/tracking  # Kargo takip no

# Stok
GET    /api/vendor/inventory            # Stok listesi
PATCH  /api/vendor/inventory/:id        # Stok güncelleme
GET    /api/vendor/inventory/low        # Düşük stoklar

# Raporlar
GET    /api/vendor/reports/sales        # Satış raporu
GET    /api/vendor/reports/revenue      # Gelir raporu
GET    /api/vendor/reports/products     # Ürün performansı

# Ödemeler
GET    /api/vendor/payouts              # Ödeme geçmişi
POST   /api/vendor/payouts/request      # Ödeme talebi
GET    /api/vendor/balance              # Bakiye
```

### Customer Endpoints

```
# Ürünler
GET    /api/products                    # Ürün listesi (filtreleme ile)
GET    /api/products/:id                # Ürün detayı
GET    /api/products/vendor/:slug       # Butik ürünleri

# Butikler
GET    /api/vendors                     # Butik listesi
GET    /api/vendors/:slug               # Butik detayı
POST   /api/vendors/:id/follow          # Butiği takip et
DELETE /api/vendors/:id/follow          # Takibi bırak

# Siparişler
POST   /api/orders                      # Sipariş oluştur
GET    /api/orders                      # Siparişlerim
GET    /api/orders/:id                  # Sipariş detayı

# Yorumlar
POST   /api/reviews                     # Yorum yap
GET    /api/reviews/product/:id         # Ürün yorumları
GET    /api/reviews/vendor/:id          # Butik yorumları
```

### Admin Endpoints

```
# Vendor Yönetimi
GET    /api/admin/vendors               # Tüm butikler
GET    /api/admin/vendors/pending       # Bekleyen başvurular
PATCH  /api/admin/vendors/:id/approve   # Başvuru onay
PATCH  /api/admin/vendors/:id/reject    # Başvuru red
PATCH  /api/admin/vendors/:id/suspend   # Askıya al

# Ödeme Yönetimi
GET    /api/admin/payouts/pending       # Bekleyen ödemeler
PATCH  /api/admin/payouts/:id/process   # Ödeme işle

# Platform İstatistikleri
GET    /api/admin/stats                 # Genel istatistikler
```

---

## 🎯 Filtreleme Sistemi Implementasyonu

### Frontend Komponenti - FilterSidebar.jsx

```javascript
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSidebar = ({ categories, vendors, onFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State
  const [filters, setFilters] = useState({
    priceRange: {
      min: searchParams.get('priceMin') || 0,
      max: searchParams.get('priceMax') || 10000
    },
    categoryId: searchParams.get('category') || '',
    vendorIds: searchParams.getAll('vendor'),
    sizes: searchParams.getAll('size'),
    colors: searchParams.getAll('color'),
    inStock: searchParams.get('inStock') === 'true',
    onSale: searchParams.get('onSale') === 'true',
    minRating: parseInt(searchParams.get('rating')) || 0
  });

  // Filter değiştiğinde URL'yi güncelle
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.priceRange.min > 0) {
      params.set('priceMin', filters.priceRange.min);
    }
    if (filters.priceRange.max < 10000) {
      params.set('priceMax', filters.priceRange.max);
    }
    if (filters.categoryId) {
      params.set('category', filters.categoryId);
    }
    filters.vendorIds.forEach(id => params.append('vendor', id));
    filters.sizes.forEach(size => params.append('size', size));
    filters.colors.forEach(color => params.append('color', color));
    if (filters.inStock) params.set('inStock', 'true');
    if (filters.onSale) params.set('onSale', 'true');
    if (filters.minRating > 0) params.set('rating', filters.minRating);
    
    setSearchParams(params);
    onFilterChange(filters);
  }, [filters]);

  const handlePriceChange = (min, max) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { min, max }
    }));
  };

  const toggleArrayFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 10000 },
      categoryId: '',
      vendorIds: [],
      sizes: [],
      colors: [],
      inStock: false,
      onSale: false,
      minRating: 0
    });
  };

  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-sm">
      {/* Filtre Başlığı */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Filtreler</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          Temizle
        </button>
      </div>

      {/* Fiyat Aralığı */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Fiyat Aralığı</h4>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={filters.priceRange.max}
            onChange={(e) => handlePriceChange(
              filters.priceRange.min,
              parseInt(e.target.value)
            )}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <input
              type="number"
              value={filters.priceRange.min}
              onChange={(e) => handlePriceChange(
                parseInt(e.target.value),
                filters.priceRange.max
              )}
              className="w-20 px-2 py-1 border rounded"
            />
            <span>-</span>
            <input
              type="number"
              value={filters.priceRange.max}
              onChange={(e) => handlePriceChange(
                filters.priceRange.min,
                parseInt(e.target.value)
              )}
              className="w-20 px-2 py-1 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Butikler */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Butikler</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {vendors.map(vendor => (
            <label key={vendor.id} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.vendorIds.includes(vendor.id)}
                onChange={() => toggleArrayFilter('vendorIds', vendor.id)}
                className="mr-2"
              />
              <span className="text-sm">{vendor.shopName}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Beden */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Beden</h4>
        <div className="flex flex-wrap gap-2">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <button
              key={size}
              onClick={() => toggleArrayFilter('sizes', size)}
              className={`px-3 py-1 rounded-md border ${
                filters.sizes.includes(size)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Renk */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Renk</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { name: 'Siyah', hex: '#000000' },
            { name: 'Beyaz', hex: '#FFFFFF' },
            { name: 'Kırmızı', hex: '#FF0000' },
            { name: 'Mavi', hex: '#0000FF' },
            { name: 'Yeşil', hex: '#00FF00' }
          ].map(color => (
            <button
              key={color.name}
              onClick={() => toggleArrayFilter('colors', color.name)}
              className={`w-8 h-8 rounded-full border-2 ${
                filters.colors.includes(color.name)
                  ? 'border-indigo-600'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Stok Durumu */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              inStock: e.target.checked
            }))}
            className="mr-2"
          />
          <span className="text-sm">Sadece stokta olanlar</span>
        </label>
      </div>

      {/* İndirimli */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.onSale}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              onSale: e.target.checked
            }))}
            className="mr-2"
          />
          <span className="text-sm">İndirimli ürünler</span>
        </label>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Minimum Puan</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              onClick={() => setFilters(prev => ({
                ...prev,
                minRating: rating
              }))}
              className={`flex items-center w-full px-3 py-2 rounded ${
                filters.minRating === rating
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-yellow-400">{'★'.repeat(rating)}</span>
              <span className="ml-2 text-sm">& üzeri</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
```

### Backend API - Product Filtering

```javascript
// Node.js + Express + MongoDB örneği
router.get('/api/products', async (req, res) => {
  try {
    const {
      // Pagination
      page = 1,
      limit = 24,
      
      // Filters
      priceMin,
      priceMax,
      category,
      vendor,
      size,
      color,
      inStock,
      onSale,
      rating,
      
      // Sort
      sortBy = 'relevance'
    } = req.query;

    // Build query
    let query = {
      status: 'active',
      isPublished: true
    };

    // Price filter
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = parseFloat(priceMin);
      if (priceMax) query.price.$lte = parseFloat(priceMax);
    }

    // Category filter
    if (category) {
      query.categoryId = category;
    }

    // Vendor filter (multi-select)
    if (vendor) {
      const vendors = Array.isArray(vendor) ? vendor : [vendor];
      query.vendorId = { $in: vendors };
    }

    // Size filter (variant içinde ara)
    if (size) {
      const sizes = Array.isArray(size) ? size : [size];
      query['variants.attributes.size'] = { $in: sizes };
    }

    // Color filter
    if (color) {
      const colors = Array.isArray(color) ? color : [color];
      query['variants.attributes.color'] = { $in: colors };
    }

    // Stock filter
    if (inStock === 'true') {
      query.stock = { $gt: 0 };
    }

    // Sale filter (compareAtPrice > price)
    if (onSale === 'true') {
      query.$expr = { $gt: ['$compareAtPrice', '$price'] };
    }

    // Rating filter
    if (rating) {
      query['stats.rating'] = { $gte: parseFloat(rating) };
    }

    // Sorting
    let sort = {};
    switch (sortBy) {
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'price_asc':
        sort = { price: 1 };
        break;
      case 'price_desc':
        sort = { price: -1 };
        break;
      case 'popular':
        sort = { 'stats.soldCount': -1 };
        break;
      case 'rating':
        sort = { 'stats.rating': -1 };
        break;
      case 'discount':
        // Sort by discount percentage
        sort = { discountPercentage: -1 };
        break;
      default:
        sort = { 'stats.viewCount': -1 }; // relevance
    }

    // Execute query
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('vendorId', 'shopName slug logo stats')
      .lean();

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    // Calculate discount percentages if needed
    if (sortBy === 'discount') {
      products.forEach(product => {
        if (product.compareAtPrice && product.price) {
          product.discountPercentage = 
            ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100;
        }
      });
      products.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    }

    res.json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        applied: Object.keys(req.query).length - 2, // exclude page & limit
        available: await getAvailableFilters(query) // dynamic filters
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Dynamic filter options
async function getAvailableFilters(baseQuery) {
  const products = await Product.find(baseQuery);
  
  return {
    priceRange: {
      min: Math.min(...products.map(p => p.price)),
      max: Math.max(...products.map(p => p.price))
    },
    sizes: [...new Set(products.flatMap(p => 
      p.variants.map(v => v.attributes.size)
    ))],
    colors: [...new Set(products.flatMap(p => 
      p.variants.map(v => v.attributes.color)
    ))],
    vendors: await getVendorsInResults(products)
  };
}
```

---

## 🚀 İmplementasyon Adımları

### Faz 1: Temel Marketplace Altyapısı (2-3 Hafta)
1. ✅ Veri modellerini oluştur (Users, Vendors, Products)
2. ✅ Çok satıcılı ürün yapısını implement et
3. ✅ Vendor kayıt/onay sistemi
4. ✅ Temel vendor paneli (ürün ekleme)
5. ✅ Vendor bazlı ürün listeleme

### Faz 2: Filtreleme & Arama (1-2 Hafta)
1. ✅ FilterSidebar komponenti
2. ✅ Backend filtreleme API'si
3. ✅ URL query sync
4. ✅ Aktif filtre göstergesi
5. ✅ Sıralama sistemi

### Faz 3: Sipariş Yönetimi (2 Hafta)
1. ✅ Vendor bazlı sepet gruplaması
2. ✅ Çoklu vendor checkout
3. ✅ Vendor panel sipariş yönetimi
4. ✅ Sipariş durum takibi
5. ✅ Email bildirimleri

### Faz 4: Vendor Panel Geliştirme (2 Hafta)
1. ✅ Dashboard & istatistikler
2. ✅ Stok yönetimi
3. ✅ Raporlar & grafikler
4. ✅ Ödeme sistemi
5. ✅ Butik profil yönetimi

### Faz 5: Admin Panel (1 Hafta)
1. ✅ Butik onay/red sistemi
2. ✅ Platform istatistikleri
3. ✅ Kategori yönetimi
4. ✅ Ödeme dağıtım sistemi

### Faz 6: İleri Özellikler (2 Hafta)
1. ✅ Yorum & rating sistemi
2. ✅ Butik takip sistemi
3. ✅ Butik sayfası
4. ✅ Ürün karşılaştırma
5. ✅ Gelişmiş arama (ElasticSearch)

---

## 💾 Teknoloji Stack Önerileri

### Backend Options

#### Option 1: Node.js + Express
```
- Express.js (API)
- MongoDB + Mongoose (Database)
- JWT (Authentication)
- Stripe/Iyzico (Payment)
- AWS S3 (File Storage)
- Redis (Caching)
- Socket.io (Real-time)
```

#### Option 2: Python + Django
```
- Django REST Framework
- PostgreSQL
- Celery (Background tasks)
- Redis
- AWS S3
```

#### Option 3: Laravel (PHP)
```
- Laravel 10
- MySQL
- Laravel Nova (Admin panel)
- Stripe
```

### Frontend (Mevcut)
```
- React 19
- Vite
- Tailwind CSS
- React Router
- Context API / Redux
- Axios
- Chart.js (Grafikler için)
```

### DevOps
```
- Docker
- GitHub Actions (CI/CD)
- AWS / DigitalOcean
- Nginx
- Cloudflare (CDN)
```

---

## 📊 Başarı Metrikleri

### Platform KPI'ları
- Aktif butik sayısı
- Toplam ürün sayısı
- Günlük/aylık işlem hacmi
- Platform komisyon geliri
- Ortalama sipariş değeri
- Müşteri memnuniyeti (rating)

### Vendor KPI'ları
- Satış sayısı
- Gelir
- Dönüşüm oranı
- Ortalama sipariş değeri
- Ürün rating ortalaması
- Stok devir hızı

---

## 🔒 Güvenlik Önlemleri

1. **Authentication**
   - JWT token based auth
   - Refresh token mechanism
   - Password hashing (bcrypt)
   - 2FA (optional)

2. **Authorization**
   - Role-based access control (RBAC)
   - Vendor sadece kendi verilerini görebilir
   - Admin full access

3. **Data Protection**
   - HTTPS only
   - XSS protection
   - CSRF protection
   - SQL injection prevention
   - Rate limiting
   - Input validation & sanitization

4. **Payment Security**
   - PCI DSS compliance
   - 3D Secure
   - Fraud detection
   - Encrypted payment data

---

## 📝 Sonraki Adımlar

1. **Backend Development** başlat
   - API endpoints oluştur
   - Database setup
   - Authentication middleware

2. **Frontend Adaptation**
   - Vendor panel sayfalarını oluştur
   - FilterSidebar implement et
   - Multi-vendor cart logic

3. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

4. **Deployment**
   - Production setup
   - Domain & SSL
   - Database migration
   - Go live! 🚀

---

**Bu mimari dokümantasyonu, butiks.com'u tam özellikli bir marketplace platformuna dönüştürmek için gereken tüm detayları içerir. Soru işaretleriniz varsa benimle paylaşın!** 🎯

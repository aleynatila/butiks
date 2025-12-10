// Icon mapping for categories (Lucide icon names)
export const categoryIcons = {
  // Women - Clothing
  'dresses': 'Sparkles',
  'tops': 'Shirt',
  'pants-skirts': 'Shrub',
  'outerwear': 'CloudRain',
  'underwear': 'Shield',
  'swimwear': 'Waves',
  
  // Women - Shoes
  'heels': 'TrendingUp',
  'sneakers': 'Zap',
  'boots': 'Mountain',
  'sandals': 'Sun',
  'flats': 'Minus',
  
  // Women - Accessories
  'bags': 'ShoppingBag',
  'jewelry': 'Gem',
  'hats': 'CircleDot',
  'belts': 'Link',
  'scarves': 'Wind',
  'sunglasses': 'Glasses',
  
  // Men - Clothing
  'shirts': 'Shirt',
  'pants': 'Shrub',
  'jackets': 'CloudRain',
  'sweaters': 'LucideWind',
  'underwear': 'Shield',
  'sportswear': 'Activity',
  
  // Men - Shoes
  'formal': 'Briefcase',
  'athletic': 'Star',
  'loafers': 'Circle',
  
  // Bags
  'shoulder-bags': 'ShoppingBag',
  'handbags': 'Inbox',
  'backpacks': 'Package',
  'laptop-bags': 'Briefcase',
  'clutch': 'Mail',
  'wallets': 'CreditCard',
  
  // Jewelry
  'necklaces': 'Circle',
  'earrings': 'Gem',
  'bracelets': 'CircleDot',
  'rings': 'Circle',
  'watches': 'Clock',
  'sets': 'Sparkles',
  
  // Other Accessories
  'gloves': 'Hand',
  
  // Seasonal Shoes
  'winter-boots': 'Snowflake',
  'summer-sandals': 'Sun',
  'waterproof': 'Droplets',
  'running-shoes': 'Activity'
};

// Kategori yapılandırması ve metadata
export const categoryStructure = {
  women: {
    slug: 'women',
    title: 'Kadın',
    description: 'Kadın giyim, ayakkabı ve aksesuar koleksiyonları',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    subcategories: {
      clothing: {
        slug: 'clothing',
        title: 'Giyim',
        description: 'Kadın giyim ürünleri',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
        items: [
          { slug: 'dresses', title: 'Elbiseler', icon: 'Sparkles' },
          { slug: 'tops', title: 'Üst Giyim', icon: 'Shirt' },
          { slug: 'pants-skirts', title: 'Pantolon & Etekler', icon: 'Shrub' },
          { slug: 'outerwear', title: 'Dış Giyim', icon: 'CloudRain' },
          { slug: 'underwear', title: 'İç Giyim', icon: 'Shield' },
          { slug: 'swimwear', title: 'Mayo & Bikini', icon: 'Waves' }
        ]
      },
      shoes: {
        slug: 'shoes',
        title: 'Ayakkabı',
        description: 'Kadın ayakkabı modelleri',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
        items: [
          { slug: 'heels', title: 'Topuklu Ayakkabılar', icon: 'TrendingUp' },
          { slug: 'sneakers', title: 'Spor Ayakkabılar', icon: 'Zap' },
          { slug: 'boots', title: 'Botlar', icon: 'Mountain' },
          { slug: 'sandals', title: 'Sandalet', icon: 'Sun' },
          { slug: 'flats', title: 'Babet', icon: 'Minus' }
        ]
      },
      accessories: {
        slug: 'accessories',
        title: 'Aksesuar',
        description: 'Kadın aksesuar ürünleri',
        image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800',
        items: [
          { slug: 'bags', title: 'Çanta', icon: 'ShoppingBag' },
          { slug: 'jewelry', title: 'Takı', icon: 'Gem' },
          { slug: 'hats', title: 'Şapka & Bere', icon: 'CircleDot' },
          { slug: 'belts', title: 'Kemer', icon: 'Link' },
          { slug: 'scarves', title: 'Şal & Atkı', icon: 'Wind' },
          { slug: 'sunglasses', title: 'Güneş Gözlüğü', icon: 'Glasses' }
        ]
      }
    }
  },
  men: {
    slug: 'men',
    title: 'Erkek',
    description: 'Erkek giyim, ayakkabı ve aksesuar koleksiyonları',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800',
    subcategories: {
      clothing: {
        slug: 'clothing',
        title: 'Giyim',
        description: 'Erkek giyim ürünleri',
        image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800',
        items: [
          { slug: 'shirts', title: 'Tişört & Gömlek', icon: 'Shirt' },
          { slug: 'pants', title: 'Pantolon', icon: 'Shrub' },
          { slug: 'jackets', title: 'Ceket & Mont', icon: 'CloudRain' },
          { slug: 'sweaters', title: 'Kazak & Hırka', icon: 'Wind' },
          { slug: 'underwear', title: 'İç Giyim', icon: 'Shield' },
          { slug: 'sportswear', title: 'Spor Giyim', icon: 'Activity' }
        ]
      },
      shoes: {
        slug: 'shoes',
        title: 'Ayakkabı',
        description: 'Erkek ayakkabı modelleri',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
        items: [
          { slug: 'sneakers', title: 'Spor Ayakkabılar', icon: 'Zap' },
          { slug: 'formal', title: 'Klasik Ayakkabılar', icon: 'Briefcase' },
          { slug: 'boots', title: 'Bot & Postal', icon: 'Mountain' },
          { slug: 'sandals', title: 'Sandalet & Terlik', icon: 'Waves' },
          { slug: 'athletic', title: 'Sneaker', icon: 'Star' }
        ]
      },
      accessories: {
        slug: 'accessories',
        title: 'Aksesuar',
        description: 'Erkek aksesuar ürünleri',
        image: 'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?w=800',
        items: [
          { slug: 'bags-wallets', title: 'Çanta & Cüzdan', icon: 'Briefcase' },
          { slug: 'watches', title: 'Saat', icon: 'Clock' },
          { slug: 'belts', title: 'Kemer', icon: 'Link' },
          { slug: 'hats', title: 'Şapka & Bere', icon: 'CircleDot' },
          { slug: 'sunglasses', title: 'Güneş Gözlüğü', icon: 'Glasses' },
          { slug: 'ties', title: 'Kravat & Papyon', icon: 'Shirt' }
        ]
      }
    }
  },
  accessories: {
    slug: 'accessories',
    title: 'Aksesuar',
    description: 'Tüm aksesuar ürünleri',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
    subcategories: {
      bags: {
        slug: 'bags',
        title: 'Çantalar',
        description: 'Her tarz için çanta modelleri',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
        items: [
          { slug: 'shoulder-bags', title: 'Omuz Çantası', icon: 'ShoppingBag' },
          { slug: 'handbags', title: 'El Çantası', icon: 'Inbox' },
          { slug: 'backpacks', title: 'Sırt Çantası', icon: 'Package' },
          { slug: 'laptop-bags', title: 'Laptop Çantası', icon: 'Briefcase' },
          { slug: 'clutch', title: 'Clutch', icon: 'Mail' },
          { slug: 'wallets', title: 'Cüzdan', icon: 'CreditCard' }
        ]
      },
      jewelry: {
        slug: 'jewelry',
        title: 'Takı & Saat',
        description: 'Zarif takı ve saat koleksiyonları',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
        items: [
          { slug: 'necklaces', title: 'Kolye', icon: 'Circle' },
          { slug: 'earrings', title: 'Küpe', icon: 'Gem' },
          { slug: 'bracelets', title: 'Bileklik', icon: 'CircleDot' },
          { slug: 'rings', title: 'Yüzük', icon: 'Circle' },
          { slug: 'watches', title: 'Saat', icon: 'Clock' },
          { slug: 'sets', title: 'Takı Setleri', icon: 'Sparkles' }
        ]
      },
      other: {
        slug: 'other',
        title: 'Diğer Aksesuarlar',
        description: 'Şapka, kemer, gözlük ve daha fazlası',
        image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800',
        items: [
          { slug: 'sunglasses', title: 'Güneş Gözlüğü', icon: 'Glasses' },
          { slug: 'hats', title: 'Şapka & Bere', icon: 'CircleDot' },
          { slug: 'belts', title: 'Kemer', icon: 'Link' },
          { slug: 'scarves', title: 'Şal & Atkı', icon: 'Wind' },
          { slug: 'gloves', title: 'Eldiven', icon: 'Hand' }
        ]
      }
    }
  },
  shoes: {
    slug: 'shoes',
    title: 'Ayakkabı',
    description: 'Tüm ayakkabı modelleri',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800',
    subcategories: {
      'women-shoes': {
        slug: 'women-shoes',
        title: 'Kadın Ayakkabı',
        description: 'Kadın ayakkabı modelleri',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
        items: [
          { slug: 'heels', title: 'Topuklu', icon: 'TrendingUp' },
          { slug: 'sneakers', title: 'Spor Ayakkabı', icon: 'Zap' },
          { slug: 'boots', title: 'Bot', icon: 'Mountain' },
          { slug: 'sandals', title: 'Sandalet', icon: 'Sun' },
          { slug: 'flats', title: 'Babet', icon: 'Minus' },
          { slug: 'athletic', title: 'Sneaker', icon: 'Star' }
        ]
      },
      'men-shoes': {
        slug: 'men-shoes',
        title: 'Erkek Ayakkabı',
        description: 'Erkek ayakkabı modelleri',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
        items: [
          { slug: 'sneakers', title: 'Spor Ayakkabı', icon: 'Zap' },
          { slug: 'formal', title: 'Klasik Ayakkabı', icon: 'Briefcase' },
          { slug: 'boots', title: 'Bot & Postal', icon: 'Mountain' },
          { slug: 'sandals', title: 'Sandalet', icon: 'Waves' },
          { slug: 'athletic', title: 'Sneaker', icon: 'Star' },
          { slug: 'loafers', title: 'Loafer', icon: 'Circle' }
        ]
      },
      seasonal: {
        slug: 'seasonal',
        title: 'Sezona Özel',
        description: 'Mevsime özel ayakkabı koleksiyonları',
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
        items: [
          { slug: 'winter-boots', title: 'Kış Botları', icon: 'Snowflake' },
          { slug: 'summer-sandals', title: 'Yaz Sandaletleri', icon: 'Sun' },
          { slug: 'waterproof', title: 'Su Geçirmez', icon: 'Droplets' },
          { slug: 'running-shoes', title: 'Koşu Ayakkabıları', icon: 'Activity' }
        ]
      }
    }
  }
};

// Yardımcı fonksiyonlar
export const getCategoryBySlug = (slug) => {
  return categoryStructure[slug] || null;
};

export const getSubcategoryBySlug = (categorySlug, subcategorySlug) => {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories[subcategorySlug] || null;
};

export const getItemBySlug = (categorySlug, subcategorySlug, itemSlug) => {
  const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug);
  return subcategory?.items.find(item => item.slug === itemSlug) || null;
};

export const getCategoryPath = (categorySlug, subcategorySlug = null, itemSlug = null) => {
  let path = `/shop/${categorySlug}`;
  if (subcategorySlug) path += `/${subcategorySlug}`;
  if (itemSlug) path += `/${itemSlug}`;
  return path;
};

export const getBreadcrumbs = (categorySlug, subcategorySlug = null, itemSlug = null) => {
  const breadcrumbs = [{ title: 'Ana Sayfa', path: '/' }];
  
  const category = getCategoryBySlug(categorySlug);
  if (category) {
    breadcrumbs.push({
      title: category.title,
      path: getCategoryPath(categorySlug)
    });
    
    if (subcategorySlug) {
      const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug);
      if (subcategory) {
        breadcrumbs.push({
          title: subcategory.title,
          path: getCategoryPath(categorySlug, subcategorySlug)
        });
        
        if (itemSlug) {
          const item = getItemBySlug(categorySlug, subcategorySlug, itemSlug);
          if (item) {
            breadcrumbs.push({
              title: item.title,
              path: getCategoryPath(categorySlug, subcategorySlug, itemSlug)
            });
          }
        }
      }
    }
  }
  
  return breadcrumbs;
};

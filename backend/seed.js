import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Category from './src/models/Category.js';
import Product from './src/models/Product.js';
import User from './src/models/User.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('Mevcut veriler temizlendi');

    // Create vendor user
    const vendor = await User.create({
      name: 'Demo Satıcı',
      email: 'vendor@butiks.com',
      password: '123456',
      role: 'vendor',
      isVendorApproved: true,
    });

    console.log('Vendor oluşturuldu:', vendor.email);

    // Create customer users
    const customer1 = await User.create({
      firstName: 'Ayşe',
      lastName: 'Yılmaz',
      name: 'Ayşe Yılmaz',
      email: 'customer1@butiks.com',
      password: 'Customer123!',
      role: 'customer',
      phone: '+905551112233',
    });

    const customer2 = await User.create({
      firstName: 'Mehmet',
      lastName: 'Demir',
      name: 'Mehmet Demir',
      email: 'customer2@butiks.com',
      password: 'Customer123!',
      role: 'customer',
      phone: '+905554445566',
    });

    const customer3 = await User.create({
      firstName: 'Zeynep',
      lastName: 'Kaya',
      name: 'Zeynep Kaya',
      email: 'customer3@butiks.com',
      password: 'Customer123!',
      role: 'customer',
      phone: '+905557778899',
    });

    console.log('Customer kullanıcıları oluşturuldu:', customer1.email, customer2.email, customer3.email);

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Kadın Giyim',
        slug: 'kadin-giyim',
        description: 'Kadınlar için giyim ürünleri',
      },
      {
        name: 'Erkek Giyim',
        slug: 'erkek-giyim',
        description: 'Erkekler için giyim ürünleri',
      },
      {
        name: 'Aksesuar',
        slug: 'aksesuar',
        description: 'Moda aksesuarları',
      },
      {
        name: 'Ayakkabı',
        slug: 'ayakkabi',
        description: 'Kadın ve erkek ayakkabıları',
      },
    ]);

    console.log(`${categories.length} kategori oluşturuldu`);

    // Create products
    const products = [
      {
        name: 'Beyaz Pamuklu Tişört',
        slug: 'beyaz-pamuklu-tisort',
        sku: 'TSH-001',
        description: 'Rahat ve şık beyaz pamuklu tişört. %100 pamuk kumaş.',
        price: 299,
        discountPrice: 199,
        categoryId: categories[0]._id,
        vendorId: vendor._id,
        stock: 50,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
            altText: 'Beyaz Tişört',
          },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Beyaz', 'Siyah', 'Gri'],
        isFeatured: true,
        status: 'active',
        isPublished: true,
      },
      {
        name: 'Slim Fit Jean Pantolon',
        slug: 'slim-fit-jean-pantolon',
        sku: 'PNT-001',
        description: 'Modern slim fit kesim jean pantolon. Rahat ve şık.',
        price: 599,
        categoryId: categories[1]._id,
        vendorId: vendor._id,
        stock: 30,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
            altText: 'Jean Pantolon',
          },
        ],
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Mavi', 'Siyah', 'Açık Mavi'],
        isFeatured: true,
        status: 'active',
        isPublished: true,
      },
      {
        name: 'Deri Çanta',
        slug: 'deri-canta',
        sku: 'BAG-001',
        description: 'Şık ve kullanışlı deri omuz çantası. Gerçek deri.',
        price: 899,
        discountPrice: 699,
        categoryId: categories[2]._id,
        vendorId: vendor._id,
        stock: 20,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
            altText: 'Deri Çanta',
          },
        ],
        colors: ['Kahverengi', 'Siyah', 'Krem'],
        isFeatured: true,
        status: 'active',
        isPublished: true,
      },
      {
        name: 'Spor Ayakkabı',
        slug: 'spor-ayakkabi',
        sku: 'SHO-001',
        description: 'Rahat günlük spor ayakkabı. Hafif ve dayanıklı.',
        price: 799,
        discountPrice: 599,
        categoryId: categories[3]._id,
        vendorId: vendor._id,
        stock: 40,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
            altText: 'Spor Ayakkabı',
          },
        ],
        sizes: ['38', '39', '40', '41', '42', '43', '44'],
        colors: ['Beyaz', 'Siyah', 'Lacivert'],
        isFeatured: true,
        status: 'active',
        isPublished: true,
      },
      {
        name: 'Kadın Elbise',
        slug: 'kadin-elbise',
        sku: 'DRS-001',
        description: 'Zarif ve şık günlük elbise. Her ortama uygun.',
        price: 499,
        categoryId: categories[0]._id,
        vendorId: vendor._id,
        stock: 25,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
            altText: 'Kadın Elbise',
          },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Siyah', 'Lacivert', 'Bordo'],
        isFeatured: true,
        status: 'active',
        isPublished: true,
      },
      {
        name: 'Erkek Gömlek',
        slug: 'erkek-gomlek',
        sku: 'SHR-001',
        description: 'Klasik kesim düz renk erkek gömlek. İş ve günlük kullanım için ideal.',
        price: 399,
        categoryId: categories[1]._id,
        vendorId: vendor._id,
        stock: 35,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
            altText: 'Erkek Gömlek',
          },
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Beyaz', 'Mavi', 'Siyah'],
        isFeatured: true,
        status: 'active',
        isPublished: true,
      },
      {
        name: 'Güneş Gözlüğü',
        slug: 'gunes-gozlugu',
        sku: 'SUN-001',
        description: 'UV korumalı şık güneş gözlüğü. Trend model.',
        price: 299,
        discountPrice: 199,
        categoryId: categories[2]._id,
        vendorId: vendor._id,
        stock: 60,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
            altText: 'Güneş Gözlüğü',
          },
        ],
        colors: ['Siyah', 'Kahverengi', 'Yeşil'],
        isFeatured: true,
        status: 'active',
        isPublished: true,
      },
      {
        name: 'Bot Ayakkabı',
        slug: 'bot-ayakkabi',
        sku: 'BOT-001',
        description: 'Deri kış botu. Su geçirmez ve sıcak tutan.',
        price: 999,
        categoryId: categories[3]._id,
        vendorId: vendor._id,
        stock: 15,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500',
            altText: 'Bot Ayakkabı',
          },
        ],
        sizes: ['38', '39', '40', '41', '42', '43', '44'],
        colors: ['Siyah', 'Kahverengi'],
        isFeatured: true,
        status: 'active',
        isPublished: true,
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} ürün oluşturuldu`);

    console.log('\n✅ Seed işlemi başarıyla tamamlandı!');
    console.log('\nTest hesapları:');
    console.log('Vendor: vendor@butiks.com / 123456');
    console.log('\nAdmin hesabı oluşturmak için:');
    console.log('POST /api/v1/auth/register');
    console.log('{ "name": "Admin", "email": "admin@butiks.com", "password": "123456", "role": "admin" }');

    process.exit(0);
  } catch (error) {
    console.error('Seed hatası:', error);
    process.exit(1);
  }
};

seedData();

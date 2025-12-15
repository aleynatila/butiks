import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './src/models/Product.js';

dotenv.config();

const activateAllProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı');

    // Find all products that are not active or not published
    const result = await Product.updateMany(
      {},
      {
        $set: {
          status: 'active',
          isPublished: true,
          publishedAt: new Date()
        }
      }
    );

    console.log(`✅ ${result.modifiedCount} ürün aktif ve yayınlı hale getirildi`);
    
    // Show all products
    const products = await Product.find({}).select('name status isPublished');
    console.log('\n📦 Tüm ürünler:');
    products.forEach(p => {
      console.log(`  - ${p.name}: status=${p.status}, published=${p.isPublished}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  }
};

activateAllProducts();

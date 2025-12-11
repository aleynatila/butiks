import {
    ArrowLeft,
    ArrowRight,
    Check,
    Image as ImageIcon,
    Package,
    Save,
    X
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import VendorBreadcrumb from '../../../components/vendor/layout/VendorBreadcrumb';

const VendorProductCreate = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    category: '',
    description: '',
    tags: [],
    
    // Pricing
    price: '',
    discountPrice: '',
    discountStartDate: '',
    discountEndDate: '',
    
    // Inventory
    sku: '',
    stock: '',
    lowStockThreshold: '10',
    trackInventory: true,
    
    // Variants
    sizes: [],
    colors: [],
    hasVariants: false,
    
    // Images
    images: [],
    
    // Shipping
    weight: '',
    length: '',
    width: '',
    height: '',
    
    // SEO
    metaTitle: '',
    metaDescription: '',
    slug: '',
    
    // Status
    status: 'draft',
  });

  const steps = [
    { id: 1, name: 'Temel Bilgiler', icon: Package },
    { id: 2, name: 'Fiyatlandırma', icon: Package },
    { id: 3, name: 'Stok', icon: Package },
    { id: 4, name: 'Varyantlar', icon: Package },
    { id: 5, name: 'Görseller', icon: ImageIcon },
    { id: 6, name: 'SEO', icon: Package },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = (status) => {
    // TODO: API call to save product
    console.log('Saving product:', { ...formData, status });
    navigate('/vendor/products');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (formData.images.length + files.length > 8) {
      alert('En fazla 8 görsel yükleyebilirsiniz');
      return;
    }

    files.forEach(file => {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} çok büyük. Maksimum 5MB yükleyebilirsiniz.`);
        return;
      }

      // Check file type
      if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)) {
        alert(`${file.name} desteklenmeyen format. PNG, JPG veya WEBP kullanın.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas for resizing to 800x800
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set canvas size to 800x800
          canvas.width = 800;
          canvas.height = 800;
          
          // Fill with white background
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, 800, 800);
          
          // Calculate scaling to fit within 800x800 while maintaining aspect ratio
          const scale = Math.min(800 / img.width, 800 / img.height);
          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;
          
          // Center the image
          const x = (800 - scaledWidth) / 2;
          const y = (800 - scaledHeight) / 2;
          
          // Draw image centered with white padding
          ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
          
          // Convert to base64
          const resizedImage = canvas.toDataURL('image/jpeg', 0.9);
          
          // Add to images array
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, resizedImage]
          }));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = '';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Temel Bilgiler</h2>
            
            <Input
              label="Ürün Adı *"
              placeholder="Örn: Beyaz Pamuklu Tişört"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Kategori Seçin</option>
                <option value="kadin">Kadın Giyim</option>
                <option value="erkek">Erkek Giyim</option>
                <option value="aksesuar">Aksesuar</option>
                <option value="ayakkabi">Ayakkabı</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                placeholder="Ürününüzün detaylı açıklamasını yazın..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Etiketler
              </label>
              <input
                type="text"
                placeholder="Virgülle ayırarak etiket ekleyin"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Örn: yaz, günlük, rahat
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Fiyatlandırma</h2>
            
            <Input
              label="Normal Fiyat (₺) *"
              type="number"
              placeholder="299"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              required
            />

            <Input
              label="İndirimli Fiyat (₺)"
              type="number"
              placeholder="199"
              value={formData.discountPrice}
              onChange={(e) => handleInputChange('discountPrice', e.target.value)}
            />

            {formData.discountPrice && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="İndirim Başlangıç Tarihi"
                  type="date"
                  value={formData.discountStartDate}
                  onChange={(e) => handleInputChange('discountStartDate', e.target.value)}
                />
                <Input
                  label="İndirim Bitiş Tarihi"
                  type="date"
                  value={formData.discountEndDate}
                  onChange={(e) => handleInputChange('discountEndDate', e.target.value)}
                />
              </div>
            )}

            {formData.discountPrice && formData.price && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">İndirim Oranı:</span>{' '}
                  {Math.round(((formData.price - formData.discountPrice) / formData.price) * 100)}%
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Stok Yönetimi</h2>
            
            <Input
              label="SKU (Stok Kodu) *"
              placeholder="TSH-001"
              value={formData.sku}
              onChange={(e) => handleInputChange('sku', e.target.value)}
              required
            />

            <Input
              label="Stok Miktarı *"
              type="number"
              placeholder="50"
              value={formData.stock}
              onChange={(e) => handleInputChange('stock', e.target.value)}
              required
            />

            <Input
              label="Düşük Stok Eşiği"
              type="number"
              placeholder="10"
              value={formData.lowStockThreshold}
              onChange={(e) => handleInputChange('lowStockThreshold', e.target.value)}
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.trackInventory}
                onChange={(e) => handleInputChange('trackInventory', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">Stok takibi yap</span>
            </label>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Ürün Varyantları</h2>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.hasVariants}
                onChange={(e) => handleInputChange('hasVariants', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">Bu ürünün farklı varyantları var (beden, renk)</span>
            </label>

            {formData.hasVariants && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedenler
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button
                        key={size}
                        onClick={() => {
                          const sizes = formData.sizes.includes(size)
                            ? formData.sizes.filter(s => s !== size)
                            : [...formData.sizes, size];
                          handleInputChange('sizes', sizes);
                        }}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                          formData.sizes.includes(size)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Renkler
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Beyaz', color: '#FFFFFF' },
                      { name: 'Siyah', color: '#000000' },
                      { name: 'Kırmızı', color: '#EF4444' },
                      { name: 'Mavi', color: '#3B82F6' },
                      { name: 'Yeşil', color: '#10B981' },
                      { name: 'Sarı', color: '#F59E0B' },
                    ].map(({ name, color }) => (
                      <button
                        key={name}
                        onClick={() => {
                          const colors = formData.colors.includes(name)
                            ? formData.colors.filter(c => c !== name)
                            : [...formData.colors, name];
                          handleInputChange('colors', colors);
                        }}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors flex items-center gap-2 ${
                          formData.colors.includes(name)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Ürün Görselleri</h2>
                <p className="text-sm text-gray-600 mt-1">En az 1, en fazla 8 görsel yükleyebilirsiniz</p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm">
                  <ImageIcon className="w-4 h-4" />
                  <span className="font-medium">Önerilen: 800x800px</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Kare format (1:1)</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-2">
                <div className="text-amber-600">ℹ️</div>
                <div className="text-sm text-amber-900">
                  <p className="font-medium mb-1">Görsel Yükleme İpuçları:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Tüm görseller otomatik olarak 800x800px boyutuna ayarlanacak</li>
                    <li>Küçük görsellerde yanlarda beyaz alan olacak</li>
                    <li>İlk görsel ürünün ana görseli olacak</li>
                    <li>PNG, JPG veya WEBP formatı kullanın (maks. 5MB)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <input
                type="file"
                id="product-images"
                multiple
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="product-images"
                className="block border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  <span className="text-blue-600 font-medium">Dosya seçin</span> veya sürükleyip bırakın
                </p>
                <p className="text-sm text-gray-500">PNG, JPG, WEBP (maks. 5MB - Çoklu seçim yapabilirsiniz)</p>
              </label>
            </div>

            {formData.images.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-700">
                    Yüklenen Görseller ({formData.images.length}/8)
                  </p>
                  <p className="text-xs text-gray-500">Sıralamak için sürükleyin</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                        <img
                          src={image}
                          alt={`Ürün görseli ${index + 1}`}
                          className="w-full h-full object-contain bg-white"
                        />
                      </div>
                      {index === 0 && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                          Ana Görsel
                        </div>
                      )}
                      <button
                        onClick={() => {
                          const newImages = formData.images.filter((_, i) => i !== index);
                          handleInputChange('images', newImages);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        800x800px
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Henüz görsel yüklenmedi</p>
                <p className="text-gray-400 text-xs mt-1">Yukarıdaki alana tıklayarak görsel yükleyin</p>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">SEO Ayarları</h2>
            
            <Input
              label="Sayfa Başlığı"
              placeholder="Beyaz Pamuklu Tişört - Rahat ve Şık"
              value={formData.metaTitle}
              onChange={(e) => handleInputChange('metaTitle', e.target.value)}
              maxLength={60}
            />
            <p className="text-xs text-gray-500 -mt-4">
              {formData.metaTitle.length}/60 karakter
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Açıklama
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                rows={3}
                maxLength={160}
                placeholder="Ürününüzün arama motorlarında görünecek kısa açıklaması"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.metaDescription.length}/160 karakter
              </p>
            </div>

            <Input
              label="URL Slug"
              placeholder="beyaz-pamuklu-tisort"
              value={formData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value)}
            />

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Önizleme:</p>
              <div className="space-y-1">
                <p className="text-blue-600 text-sm">
                  {formData.metaTitle || 'Ürün Başlığı'}
                </p>
                <p className="text-xs text-green-700">
                  butiks.com/product/{formData.slug || 'urun-slug'}
                </p>
                <p className="text-sm text-gray-600">
                  {formData.metaDescription || 'Ürün açıklaması burada görünecek...'}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <VendorBreadcrumb
        items={[
          { label: 'Ürünler', href: '/vendor/products' },
          { label: 'Yeni Ürün' },
        ]}
      />

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
        <p className="text-gray-600 mt-1">
          Ürün bilgilerini adım adım doldurun
        </p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    currentStep > step.id
                      ? 'bg-green-500 border-green-500 text-white'
                      : currentStep === step.id
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                <p
                  className={`text-xs mt-2 font-medium hidden md:block ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Önceki
        </Button>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleSave('draft')}>
            <Save className="w-4 h-4 mr-2" />
            Taslak Olarak Kaydet
          </Button>

          {currentStep === totalSteps ? (
            <Button onClick={() => handleSave('active')}>
              <Check className="w-4 h-4 mr-2" />
              Yayınla
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Sonraki
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProductCreate;

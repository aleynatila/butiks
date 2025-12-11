import {
    Book,
    FileText,
    HelpCircle,
    Mail,
    MessageCircle,
    Phone,
    Search,
    Video
} from 'lucide-react';
import { useState } from 'react';
import VendorBreadcrumb from '../../components/vendor/layout/VendorBreadcrumb';

const VendorHelp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const helpCategories = [
    { id: 'all', label: 'Tümü', icon: HelpCircle },
    { id: 'getting-started', label: 'Başlangıç', icon: Book },
    { id: 'products', label: 'Ürünler', icon: FileText },
    { id: 'orders', label: 'Siparişler', icon: FileText },
    { id: 'finance', label: 'Finans', icon: FileText },
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'Vendor paneline nasıl giriş yaparım?',
      answer: 'Vendor paneline giriş yapmak için ana sayfadaki "Giriş Yap" butonuna tıklayın ve vendor hesap bilgilerinizi girin. Eğer hesabınız yoksa, "Satıcı Ol" bölümünden başvuruda bulunabilirsiniz.',
    },
    {
      id: 2,
      category: 'products',
      question: 'Nasıl yeni ürün eklerim?',
      answer: 'Ürünler menüsünden "Yeni Ürün Ekle" butonuna tıklayın. 6 adımlı form ile ürün bilgilerini, fiyatlandırmayı, stoğu, varyantları, görselleri ve SEO bilgilerini ekleyin.',
    },
    {
      id: 3,
      category: 'products',
      question: 'Toplu ürün düzenleme nasıl yapılır?',
      answer: 'Ürünler sayfasında ürünlerin yanındaki checkbox\'ları işaretleyin ve "Toplu İşlem" butonuna tıklayın. Buradan durum, stok, fiyat ve indirim güncellemeleri yapabilirsiniz.',
    },
    {
      id: 4,
      category: 'orders',
      question: 'Sipariş durumunu nasıl güncellerim?',
      answer: 'Sipariş detay sayfasında "Durum Güncelle" butonuna tıklayın. Siparişi bekliyor, hazırlanıyor, kargoda veya teslim edildi olarak işaretleyebilirsiniz.',
    },
    {
      id: 5,
      category: 'orders',
      question: 'Kargo takip numarası nasıl eklenir?',
      answer: 'Sipariş detay sayfasında "Kargo Takip Numarası" alanına takip numarasını girin ve "Ekle" butonuna tıklayın. Müşteriye otomatik olarak bildirim gönderilir.',
    },
    {
      id: 6,
      category: 'finance',
      question: 'Bakiyemi nasıl çekerim?',
      answer: 'Finans sayfasında "Para Çek" butonuna tıklayın. Minimum 100₺ çekim yapabilirsiniz. Para çekme talepleri 1-3 iş günü içinde işleme alınır.',
    },
    {
      id: 7,
      category: 'finance',
      question: 'Faturalarım nerede?',
      answer: 'Finans menüsünden "Faturalar" sekmesine gidin. Buradan tüm faturalarınızı görüntüleyebilir ve PDF olarak indirebilirsiniz.',
    },
    {
      id: 8,
      category: 'products',
      question: 'Ürün görseli nasıl yüklenir?',
      answer: 'Ürün ekleme formunun 5. adımında "Görseller" bölümünde "Dosya Seç" veya sürükle-bırak ile görselleri yükleyebilirsiniz. Maksimum 10 görsel eklenebilir.',
    },
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Vendor Paneline Giriş',
      duration: '5 dk',
      type: 'video',
      icon: Video,
    },
    {
      id: 2,
      title: 'İlk Ürününüzü Ekleyin',
      duration: '8 dk',
      type: 'video',
      icon: Video,
    },
    {
      id: 3,
      title: 'Sipariş Yönetimi Rehberi',
      duration: '10 dk',
      type: 'document',
      icon: FileText,
    },
    {
      id: 4,
      title: 'Finans ve Ödemeler',
      duration: '6 dk',
      type: 'document',
      icon: FileText,
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Breadcrumb */}
      <VendorBreadcrumb items={[{ label: 'Yardım & Destek' }]} />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Yardım & Destek</h1>
        <p className="text-gray-600 mt-1">Sorularınıza yanıt bulun ve destek alın</p>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Canlı Destek</h3>
          <p className="text-blue-100 text-sm mb-4">
            Hafta içi 09:00 - 18:00 arası anlık destek
          </p>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-lg text-sm font-medium transition-colors">
            Sohbet Başlat
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2">E-posta Desteği</h3>
          <p className="text-gray-600 text-sm mb-4">24 saat içinde yanıt garantisi</p>
          <a
            href="mailto:vendor-support@butiks.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Mail className="w-4 h-4" />
            E-posta Gönder
          </a>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Telefon Desteği</h3>
          <p className="text-gray-600 text-sm mb-4">Acil durumlar için</p>
          <a
            href="tel:+902121234567"
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Ara: +90 212 123 45 67
          </a>
        </div>
      </div>

      {/* Tutorials */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Video ve Rehberler</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tutorials.map((tutorial) => {
            const Icon = tutorial.icon;
            return (
              <div key={tutorial.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                  tutorial.type === 'video' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <Icon className={`w-6 h-6 ${tutorial.type === 'video' ? 'text-red-600' : 'text-blue-600'}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                <p className="text-sm text-gray-500">{tutorial.duration}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sık Sorulan Sorular</h2>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Sorunuzu arayın..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {helpCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <details key={faq.id} className="bg-white rounded-lg border border-gray-200 group">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3 flex-1">
                    <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-gray-600 leading-relaxed pl-8">{faq.answer}</p>
                </div>
              </details>
            ))
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Sonuç Bulunamadı</h3>
              <p className="text-gray-600">
                Aradığınız soruyu bulamadınız mı? Lütfen destek ekibimizle iletişime geçin.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Still Need Help */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Hala Yardıma mı İhtiyacınız Var?</h2>
        <p className="text-blue-100 mb-6">
          Destek ekibimiz size yardımcı olmak için burada!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-lg font-medium transition-colors">
            <MessageCircle className="w-4 h-4" />
            Canlı Destek
          </button>
          <a
            href="mailto:vendor-support@butiks.com"
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors shadow-lg"
          >
            <Mail className="w-4 h-4" />
            E-posta Gönder
          </a>
        </div>
      </div>
    </div>
  );
};

export default VendorHelp;

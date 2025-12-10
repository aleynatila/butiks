import { Check, DollarSign, Mail, MessageSquare, Phone, Store, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const PartnershipPage = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    ownerName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    description: '',
    productsCount: '',
    category: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (would send to backend)
    console.log('Partnership application:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        storeName: '',
        ownerName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        description: '',
        productsCount: '',
        category: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  const benefits = [
    {
      icon: Users,
      title: 'Milyonlara Ulaşın',
      description: 'Benzersiz butik ürünler arayan küresel müşteri tabanımıza erişin.',
    },
    {
      icon: TrendingUp,
      title: 'İşinizi Büyütün',
      description: 'Pazarlama araçlarımız ve analitik panelimizle satışlarınızı artırın.',
    },
    {
      icon: DollarSign,
      title: 'Rekabetçi Ücretler',
      description: 'Gizli ücret ve kurulum maliyeti olmayan sektör lideri komisyon oranları.',
    },
    {
      icon: Store,
      title: 'Kolay Yönetim',
      description: 'Envanter, siparişler ve müşteri iletişimini yönetmek için basit panel.',
    },
  ];

  const features = [
    'Özel hesap yöneticisi',
    'Pazarlama ve tanıtım desteği',
    'Canlı analitik ve raporlama',
    'Güvenli ödeme işleme',
    'Mobil uyumlu mağaza paneli',
    '7/24 müşteri desteği',
    'Ücretsiz fotoğraf kılavuzları',
    'Ürünleriniz için SEO optimizasyonu',
  ];

  const steps = [
    {
      number: '01',
      title: 'Başvurun',
      description: 'Mağaza bilgilerinizle ortaklık başvuru formunu doldurun.',
    },
    {
      number: '02',
      title: 'İnceleme',
      description: 'Ekibimiz başvurunuzu 2-3 iş günü içinde inceler.',
    },
    {
      number: '03',
      title: 'Kurulum',
      description: 'Kullanımı kolay satıcı panelimiz ve araçlarımızla işe başlayın.',
    },
    {
      number: '04',
      title: 'Satın',
      description: 'Ürünlerinizi listelemeye başlayın ve dünya çapında müşterilere ulaşın.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Store className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              BUTIKS ile Ortak Olun
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">
              Özenle seçilmiş pazaryerimize katılın ve butiğinizi dünya çapında moda severlerle buluşturun
            </p>
            <a
              href="#application-form"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Ortak Ol
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden Bizimle Ortak Olmalısınız?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Platformumuzda zaten başarılı olan yüzlerce butiğe katılın
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Neler Sunuyoruz
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Nasıl Çalışır
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="text-6xl font-bold text-indigo-100 mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-1 bg-indigo-100 -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ortaklık Başvurusu
              </h2>
              <p className="text-gray-600">
                Aşağıdaki formu doldurun, ekibimiz 2-3 iş günü içinde size geri dönecektir
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Başvuru Gönderildi!</h3>
                <p className="text-gray-600 mb-4">
                  İlginiz için teşekkür ederiz. Başvurunuzu inceleyip kısa sürede size ulaşacağız.
                </p>
                <p className="text-sm text-gray-500">Yönlendiriliyor...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Mağaza Adı"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="Butikinizin Adı"
                    required
                  />
                  <Input
                    label="Sahip Adı"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Ad Soyad"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="E-posta"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@ornekmail.com"
                    required
                  />
                  <Input
                    label="Telefon"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+90 (555) 123 45 67"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Konum"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Şehir, Ülke"
                    required
                  />
                  <Input
                    label="Website (Opsiyonel)"
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://maganizin.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ürün Kategorisi
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                    >
                      <option value="">Kategori Seçin</option>
                      <option value="women">Kadın Modası</option>
                      <option value="men">Erkek Modası</option>
                      <option value="accessories">Aksesuar</option>
                      <option value="shoes">Ayakkabı</option>
                      <option value="jewelry">Takı</option>
                      <option value="mixed">Karışık/Çoklu</option>
                    </select>
                  </div>
                  <Input
                    label="Tahmini Ürün Sayısı"
                    type="number"
                    name="productsCount"
                    value={formData.productsCount}
                    onChange={handleChange}
                    placeholder="50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mağazanız Hakkında Bilgi Verin
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Butiğinizi, benzersiz özelliklerinizi ve ürünlerinizi özel kılan şeyleri açıklayın..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" size="lg" className="flex-1">
                    Başvuruyu Gönder
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setFormData({
                      storeName: '',
                      ownerName: '',
                      email: '',
                      phone: '',
                      location: '',
                      website: '',
                      description: '',
                      productsCount: '',
                      category: '',
                    })}
                  >
                    Formu Sıfırla
                  </Button>
                </div>

                <p className="text-sm text-gray-500 text-center">
                  Bu formu göndererek{' '}
                  <Link to="/terms" className="text-indigo-600 hover:text-indigo-700">
                    Hizmet Şartlarımızı
                  </Link>{' '}
                  ve{' '}
                  <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700">
                    Gizlilik Politikamızı
                  </Link>{' '}
                  kabul etmiş olursunuz
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sorularınız mı Var?
            </h2>
            <p className="text-gray-400 text-lg">
              Ortaklık ekibimiz size yardımcı olmak için burada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">E-posta Gönderin</h3>
              <a href="mailto:partners@butiks.com" className="text-indigo-400 hover:text-indigo-300">
                partners@butiks.com
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Bizi Arayın</h3>
              <a href="tel:+905551234567" className="text-indigo-400 hover:text-indigo-300">
                +90 (555) 123-4567
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Canlı Sohbet</h3>
              <button className="text-indigo-400 hover:text-indigo-300">
                Sohbet Başlat
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnershipPage;

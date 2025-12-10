import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Siparişler & Kargo',
      questions: [
        {
          q: 'Kargo ne kadar sürer?',
          a: 'Standart kargo genellikle 5-7 iş günü sürer. Hızlı kargo mevcuttur ve 2-3 iş günü sürer. Uluslararası kargo konuma göre değişir.'
        },
        {
          q: 'Ücretsiz kargo sunuyor musunuz?',
          a: 'Evet! 100 TL üzeri tüm siparişlerde ücretsiz standart kargo sunuyoruz. Hızlı kargo 150 TL.'
        },
        {
          q: 'Siparişimi takip edebilir miyim?',
          a: 'Kesinlikle! Siparişiniz kargoya verildikten sonra e-posta ile takip numarası alacaksınız. Ayrıca hesap panelinizden siparişinizi takip edebilirsiniz.'
        },
        {
          q: 'Uluslararası kargo yapıyor musunuz?',
          a: 'Evet, dünya çapında 25\'ten fazla ülkeye kargo yapıyoruz. Uluslararası kargo ücretleri ve teslimat süreleri konuma göre değişir.'
        }
      ]
    },
    {
      category: 'İade & Değişim',
      questions: [
        {
          q: 'İade politikanız nedir?',
          a: '30 günlük iade politikası sunuyoruz. Ürünler giyilmemiş, yıkanmamış ve etiketleri yerinde olacak şekilde orijinal durumda olmalıdır.'
        },
        {
          q: 'Bir ürünü nasıl iade edebilirim?',
          a: 'Hesabınıza giriş yapın, Siparişler bölümüne gidin, iade etmek istediğiniz ürünü seçin ve iade talimatlarını takip edin. Size ödemeli iade etiketi e-posta ile gönderilecektir.'
        },
        {
          q: 'Bir ürünü değiştirebilir miyim?',
          a: 'Evet! Farklı bedenler veya renkler için ücretsiz değişim sunuyoruz. Sadece iade başlatın ve geri ödeme yerine "Değişim" seçeneğini seçin.'
        },
        {
          q: 'Geri ödememi ne zaman alacağım?',
          a: 'Geri ödemeler iadenizi aldıktan sonra 5-7 iş günü içinde işleme alınır. Geri ödeme orijinal ödeme yönteminize yapılacaktır.'
        }
      ]
    },
    {
      category: 'Ödeme & Güvenlik',
      questions: [
        {
          q: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
          a: 'Tüm büyük kredi kartlarını (Visa, Mastercard, American Express), PayPal, Apple Pay ve Google Pay kabul ediyoruz.'
        },
        {
          q: 'Ödeme bilgilerim güvende mi?',
          a: 'Evet! Ödeme bilgilerinizi korumak için endüstri standardı SSL şifrelemesi kullanıyoruz. Kredi kartı bilgilerinizi asla tam olarak saklamayız.'
        },
        {
          q: 'Ödeme bilgilerimi kaydedebilir miyim?',
          a: 'Evet, daha hızlı ödeme için hesabınızda ödeme yöntemlerinizi güvenli bir şekilde kaydedebilirsiniz.'
        }
      ]
    },
    {
      category: 'Hesap & Üyelik',
      questions: [
        {
          q: 'Alışveriş yapmak için hesap gerekli mi?',
          a: 'Hayır, ancak hesap oluşturmak ödemeyi hızlandırır ve siparişleri takip etmenize, favorilerinizi kaydetmenize ve özel teklifler almanıza olanak tanır.'
        },
        {
          q: 'Şifremi nasıl sıfırlarım?',
          a: 'Giriş sayfasında "Şifremi Unuttum" seçeneğine tıklayın ve talimatları izleyin. E-posta ile sıfırlama bağlantısı alacaksınız.'
        },
        {
          q: 'E-posta adresimi değiştirebilir miyim?',
          a: 'Evet! Hesap Ayarlarına gidin ve e-posta adresinizi güncelleyin. Yeni e-postayı doğrulamanız gerekecektir.'
        }
      ]
    },
    {
      category: 'Ürünler & Beden',
      questions: [
        {
          q: 'Bedenimi nasıl bulurum?',
          a: 'Detaylı ölçümler için Beden Kılavuzumuza bakın. Her ürün sayfasında da belirli beden bilgileri yer almaktadır.'
        },
        {
          q: 'Ürünleriniz orijinal mi?',
          a: 'Evet! Doğrudan doğrulanmış butik ve markalarla çalışıyoruz. Her ürün %100 orijinal ve garantilidir.'
        },
        {
          q: 'Ürünleri ne zaman yeniden stoklarsınız?',
          a: 'Yeniden stoklama ürün ve butiğe göre değişir. Uyarılmak için ürün sayfasından yeniden stoklama bildirimlerine kaydolun.'
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <HelpCircle className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-gray-600">
            BUTIKS hakkında sık sorulan sorulara yanıtlar bulun
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SSS'lerde ara..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500">"{searchQuery}" için sonuç bulunamadı</p>
            </div>
          ) : (
            filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {category.category}
                </h2>
                <div className="space-y-2">
                  {category.questions.map((faq, questionIndex) => {
                    const key = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openIndex === key;
                    
                    return (
                      <div
                        key={questionIndex}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{faq.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                              isOpen ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4">
                            <p className="text-gray-600">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Hala sorularınız mı var?
          </h2>
          <p className="text-white/90 mb-6">
            Destek ekibimiz yardımcı olmak için burada!
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Destek ile İletişime Geçin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

import { Award, Globe, Heart, ShoppingBag, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const AboutPage = () => {
  const stats = [
    { label: 'Mutlu Müşteri', value: '50K+', icon: Users },
    { label: 'Ürün', value: '10K+', icon: ShoppingBag },
    { label: 'Ülke', value: '25+', icon: Globe },
    { label: 'Yıllık Deneyim', value: '5+', icon: Award },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Müşteri Öncelikli',
      description: 'Müşterilerimizi yaptığımız her şeyin merkezine koyuyor, olağanüstü hizmet ve kalite sunuyoruz.'
    },
    {
      icon: Award,
      title: 'Kaliteli Ürünler',
      description: 'Her ürün özenle seçilir ve yüksek mükemmellik standartlarımızı karşılamak üzere denetlenir.'
    },
    {
      icon: Globe,
      title: 'Küresel Erişim',
      description: 'Dünya çapında moda severlerı benzersiz stillerle buluyuşturuyoruz.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] lg:h-[500px] overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              BUTIKS Hakkında
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Dünya çapındaki butiklerden özenle seçilmiş modanın adresi
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-3 bg-indigo-100 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Hikayemiz
          </h2>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              2020 yılında kurulan BUTIKS, basit bir fikirden doğdu: Moda tutkunlarını dünya çapındaki bağımsız butiklerden benzersiz, yüksek kaliteli parçalarla buluşturmak.
            </p>
            <p>
              Alışverişin bir deneyim olması gerektiğine inanıyoruz - kişisel, heyecan verici ve ödüllendirici bir deneyim. Bu yüzden stil ve kalite tutkumuzu paylaşan butiklerden özenle seçilmiş koleksiyonları bir araya getiren bir platform yarattık.
            </p>
            <p>
              Bugün, 25 ülkede 50.000'den fazla müşteriye hizmet vermekten gurur duyuyoruz ve onlara başka hiçbir yerde bulamayacakları özel moda ürünlerine erişim sağlıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Değerlerimiz
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-8 text-center">
                  <div className="inline-flex p-4 bg-indigo-100 rounded-full mb-6">
                    <Icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Moda Topluluğumuza Katılın
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Dünya çapındaki butiklerden benzersiz stiller ve özel koleksiyonlar keşfedin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Alışverişe Başla
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-indigo-600">
                İletişime Geçin
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

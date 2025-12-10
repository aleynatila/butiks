import { Ruler } from 'lucide-react';

const SizeGuidePage = () => {
  const sizeCharts = {
    women: {
      tops: [
        { us: 'XS', uk: '6', eu: '34', chest: '31-32', waist: '24-25', hip: '34-35' },
        { us: 'S', uk: '8', eu: '36', chest: '33-34', waist: '26-27', hip: '36-37' },
        { us: 'M', uk: '10', eu: '38', chest: '35-36', waist: '28-29', hip: '38-39' },
        { us: 'L', uk: '12', eu: '40', chest: '37-39', waist: '30-32', hip: '40-42' },
        { us: 'XL', uk: '14', eu: '42', chest: '40-42', waist: '33-35', hip: '43-45' },
      ],
      shoes: [
        { us: '5', uk: '3', eu: '36', cm: '22' },
        { us: '6', uk: '4', eu: '37', cm: '23' },
        { us: '7', uk: '5', eu: '38', cm: '24' },
        { us: '8', uk: '6', eu: '39', cm: '25' },
        { us: '9', uk: '7', eu: '40', cm: '26' },
        { us: '10', uk: '8', eu: '41', cm: '27' },
      ]
    },
    men: {
      tops: [
        { us: 'XS', uk: '34', eu: '44', chest: '34-36', waist: '28-30', hip: '35-37' },
        { us: 'S', uk: '36', eu: '46', chest: '37-39', waist: '31-33', hip: '38-40' },
        { us: 'M', uk: '38', eu: '48', chest: '40-42', waist: '34-36', hip: '41-43' },
        { us: 'L', uk: '40', eu: '50', chest: '43-45', waist: '37-39', hip: '44-46' },
        { us: 'XL', uk: '42', eu: '52', chest: '46-48', waist: '40-42', hip: '47-49' },
      ],
      shoes: [
        { us: '7', uk: '6', eu: '40', cm: '25' },
        { us: '8', uk: '7', eu: '41', cm: '26' },
        { us: '9', uk: '8', eu: '42', cm: '27' },
        { us: '10', uk: '9', eu: '43', cm: '28' },
        { us: '11', uk: '10', eu: '44', cm: '29' },
        { us: '12', uk: '11', eu: '45', cm: '30' },
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <Ruler className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Beden Kılavuzu
          </h1>
          <p className="text-gray-600">
            Kapsamlı beden tablolarımızla mükemmel bedeni bulun
          </p>
        </div>

        {/* How to Measure */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nasıl Ölçülür</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Göğüs</h3>
              <p className="text-sm text-gray-600">Mezurayı yatay tutarak göğsünüzün en geniş kısmından ölçün.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Bel</h3>
              <p className="text-sm text-gray-600">Genellikle göbeğinizin üstünde, belinizin en dar kısmından ölçün.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Kalça</h3>
              <p className="text-sm text-gray-600">Mezurayı yatay tutarak kalçanızın en geniş kısmından ölçün.</p>
            </div>
          </div>
        </section>

        {/* Women's Sizes */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Kadın Bedenleri</h2>
          
          {/* Tops & Dresses */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Üst Giyim & Elbiseler</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">US Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">UK Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">EU Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Chest (in)</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Waist (in)</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Hip (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts.women.tops.map((size, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{size.us}</td>
                      <td className="py-3 px-4">{size.uk}</td>
                      <td className="py-3 px-4">{size.eu}</td>
                      <td className="py-3 px-4">{size.chest}</td>
                      <td className="py-3 px-4">{size.waist}</td>
                      <td className="py-3 px-4">{size.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shoes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shoes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">US Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">UK Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">EU Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts.women.shoes.map((size, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{size.us}</td>
                      <td className="py-3 px-4">{size.uk}</td>
                      <td className="py-3 px-4">{size.eu}</td>
                      <td className="py-3 px-4">{size.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Men's Sizes */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Erkek Bedenleri</h2>
          
          {/* Tops */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Üst Giyim & Gömlekler</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">US Beden</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">UK Beden</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">EU Beden</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Göğüs (in)</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Bel (in)</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Kalça (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts.men.tops.map((size, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{size.us}</td>
                      <td className="py-3 px-4">{size.uk}</td>
                      <td className="py-3 px-4">{size.eu}</td>
                      <td className="py-3 px-4">{size.chest}</td>
                      <td className="py-3 px-4">{size.waist}</td>
                      <td className="py-3 px-4">{size.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shoes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shoes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">US Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">UK Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">EU Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts.men.shoes.map((size, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{size.us}</td>
                      <td className="py-3 px-4">{size.uk}</td>
                      <td className="py-3 px-4">{size.eu}</td>
                      <td className="py-3 px-4">{size.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Fit Tips */}
        <div className="mt-8 bg-indigo-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Uyum İpuçları</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• İki beden arasındaysanız, daha rahat bir uyum için bir üst beden seçmenizi öneririz</li>
            <li>• Belirli uyum notları ve model ölçüleri için ürün sayfalarını kontrol edin</li>
            <li>• Farklı markalar bedenlerde küçük farklılıklar gösterebilir</li>
            <li>• Tereddüt ettiğinizde, diğer müşterilerin görüşleri için ürün yorumlarını kontrol edin</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;

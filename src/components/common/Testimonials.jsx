import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useState } from 'react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Fashion Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
    text: 'Absolutely love the unique pieces I found here! The quality is outstanding and the customer service is top-notch. Will definitely shop here again.',
    date: '2 weeks ago'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
    text: 'The Style Finder feature helped me discover my perfect style! Never thought online shopping could be this personalized and fun.',
    date: '1 month ago'
  },
  {
    id: 3,
    name: 'Emma Davis',
    role: 'Regular Customer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 4,
    text: 'Great selection of products and fast shipping. The website is easy to navigate and I love the modern design. Highly recommended!',
    date: '3 weeks ago'
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Style Lover',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    rating: 5,
    text: 'Finally found a store that understands modern fashion. The curated collections are perfect and the quality exceeds expectations.',
    date: '1 week ago'
  },
  {
    id: 5,
    name: 'Olivia Martinez',
    role: 'First-time Buyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    rating: 5,
    text: 'Impressed with my first order! The packaging was beautiful and the product exceeded my expectations. Will be back for more.',
    date: '4 days ago'
  },
  {
    id: 6,
    name: 'David Brown',
    role: 'Fashion Blogger',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
    rating: 5,
    text: 'As someone who reviews fashion brands, I can confidently say this is one of the best online boutiques. Unique styles and excellent quality.',
    date: '2 months ago'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonials = () => {
    setCurrentIndex((prev) => 
      prev + 3 >= TESTIMONIALS.length ? 0 : prev + 3
    );
  };

  const prevTestimonials = () => {
    setCurrentIndex((prev) => 
      prev - 3 < 0 ? Math.max(0, TESTIMONIALS.length - 3) : prev - 3
    );
  };

  const visibleTestimonials = TESTIMONIALS.slice(currentIndex, currentIndex + 3);
  
  // 3 öğemiz yoksa, baştan döngüye devam et
  if (visibleTestimonials.length < 3) {
    const remaining = 3 - visibleTestimonials.length;
    visibleTestimonials.push(...TESTIMONIALS.slice(0, remaining));
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Müşterilerimiz Ne Diyor
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bizimle alışveriş yapmayı seven binlerce memnun müşterimize katılın
          </p>
        </div>

        {/* Genel Değerlendirme */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">4.9</span>
          </div>
          <p className="text-gray-600">1.234+ değerlendirmeye dayalı</p>
        </div>

        {/* Yorumlar Carousel */}
        <div className="relative">
          {/* Navigasyon Butonları */}
          <button
            onClick={prevTestimonials}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
            aria-label="Önceki yorumlar"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>

          <button
            onClick={nextTestimonials}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
            aria-label="Sonraki yorumlar"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>

          {/* Yorumlar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Alıntı İkonu */}
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Quote className="w-6 h-6 text-gray-600" />
                </div>

                {/* Değerlendirme */}
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${
                        star <= testimonial.rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>

                {/* Yorum Metni */}
                <p className="text-gray-700 mb-4 line-clamp-4">
                  "{testimonial.text}"
                </p>

                {/* Yorumcu Bilgisi */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                  <span className="text-xs text-gray-500">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Nokta Göstergesi */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(TESTIMONIALS.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / 3) === index
                    ? 'bg-gray-900 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`${index + 1}. yorum grubuna git`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Deneyiminizi paylaşmak ister misiniz?</p>
          <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all transform hover:scale-105">
            Yorum Yaz
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

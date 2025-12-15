import { Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ReviewsPage = () => {
  const [reviews] = useState([
    {
      id: 1,
      productId: '1',
      productName: 'Classic White T-Shirt',
      productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      rating: 5,
      comment: 'Harika bir ürün! Kalitesi çok iyi ve tam beden geldi.',
      date: '2024-12-05',
      verified: true
    },
    {
      id: 2,
      productId: '2',
      productName: 'Denim Jacket',
      productImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      rating: 4,
      comment: 'Güzel bir ceket ama biraz büyük geldi. Bir beden küçük almanızı öneririm.',
      date: '2024-12-01',
      verified: true
    }
  ]);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Değerlendirmelerim</h1>
          <p className="text-gray-600 mt-2">Yaptığınız tüm ürün değerlendirmelerini görüntüleyin</p>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex gap-4">
                {/* Product Image */}
                <Link to={`/product/${review.productId}`} className="flex-shrink-0">
                  <img
                    src={review.productImage}
                    alt={review.productName}
                    className="w-24 h-24 object-cover rounded-lg hover:opacity-75 transition-opacity"
                  />
                </Link>

                {/* Review Content */}
                <div className="flex-1">
                  {/* Product Name */}
                  <Link 
                    to={`/product/${review.productId}`}
                    className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors"
                  >
                    {review.productName}
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    {renderStars(review.rating)}
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Onaylanmış Alıcı
                      </span>
                    )}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 mt-3">{review.comment}</p>

                  {/* Date */}
                  <p className="text-sm text-gray-500 mt-3">
                    {new Date(review.date).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {reviews.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz Değerlendirme Yapmadınız</h3>
            <p className="text-gray-600 mb-6">Satın aldığınız ürünler için değerlendirme yapabilirsiniz</p>
            <Link
              to="/account"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Siparişlerime Git
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;

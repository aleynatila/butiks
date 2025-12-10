import { Package, RefreshCw, Truck } from 'lucide-react';

const ShippingPage = () => {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      time: '5-7 business days',
      cost: '500₺ üstü siparişlerde ücretsiz',
      icon: Package
    },
    {
      name: 'Express Shipping',
      time: '2-3 business days',
      cost: '50₺',
      icon: Truck
    },
    {
      name: 'International Shipping',
      time: '10-15 business days',
      cost: 'Varies by location',
      icon: Package
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Kargo ve İadeler
          </h1>
          <p className="text-gray-600">
            Kargo ve iade politikalarımız hakkında bilmeniz gereken her şey
          </p>
        </div>

        {/* Shipping Information */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Kargo Bilgileri
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {shippingOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-6 text-center">
                  <div className="inline-flex p-3 bg-indigo-100 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{option.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{option.time}</p>
                  <p className="text-sm font-medium text-indigo-600">{option.cost}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Processing Time</h3>
              <p>Orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Tracking</h3>
              <p>You'll receive a shipping confirmation email with tracking information once your order has shipped. You can also track your order from your account dashboard.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">International Shipping</h3>
              <p>We ship to over 25 countries worldwide. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Shipping Restrictions</h3>
              <p>We currently do not ship to P.O. boxes or APO/FPO addresses for express shipping. Standard shipping to these addresses is available.</p>
            </div>
          </div>
        </section>

        {/* Returns Policy */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <RefreshCw className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              30 Günlük İade Politikası
            </h2>
          </div>

          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Return Eligibility</h3>
              <p className="mb-2">Items are eligible for return if they meet the following conditions:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Returned within 30 days of delivery</li>
                <li>Unworn, unwashed, and in original condition</li>
                <li>Original tags and packaging intact</li>
                <li>Not on the final sale or clearance items list</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How to Return</h3>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Log into your account and go to Orders</li>
                <li>Select the item(s) you wish to return</li>
                <li>Choose your reason for return</li>
                <li>Print your prepaid return label</li>
                <li>Pack your items securely with the original packaging</li>
                <li>Drop off at any authorized shipping location</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Refunds</h3>
              <p>Refunds are processed within 5-7 business days of receiving your return. The refund will be credited to your original payment method. Shipping costs are non-refundable unless the return is due to our error.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Exchanges</h3>
              <p>We offer free exchanges for different sizes or colors. Simply select "Exchange" instead of "Refund" when initiating your return. We'll ship your exchange item as soon as we receive your return.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Final Sale Items</h3>
              <p>Items marked as "Final Sale" or purchased at a discount of 50% or more cannot be returned or exchanged. All sale items are final.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Damaged or Defective Items</h3>
              <p>If you receive a damaged or defective item, please contact us immediately at support@butiks.com with photos. We'll arrange for a replacement or full refund, including return shipping costs.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Questions about your order?</h3>
          <p className="text-gray-600 mb-4">Our customer service team is here to help!</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
            <span className="text-gray-700">Email: support@butiks.com</span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span className="text-gray-700">Phone: +1 (555) 123-4567</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;

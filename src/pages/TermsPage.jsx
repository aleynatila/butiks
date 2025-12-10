import { FileText } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <FileText className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Kullanım Koşulları
          </h1>
          <p className="text-gray-600">
            Son güncelleme: 9 Aralık 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Koşulları Kabul</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using BUTIKS ("the Website"), you accept and agree to be bound by these 
              Terms and Conditions. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Web Sitesi Kullanımı</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Eligibility</h3>
                <p className="leading-relaxed">
                  You must be at least 13 years old to use our website. By using our website, you represent 
                  and warrant that you meet this age requirement. If you are under 18, you may only use our 
                  website with the involvement of a parent or guardian.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Account Registration</h3>
                <p className="leading-relaxed mb-2">
                  To make purchases, you must create an account. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Keep your account information up to date</li>
                  <li>Maintain the security of your password</li>
                  <li>Be responsible for all activities under your account</li>
                  <li>Notify us immediately of unauthorized access</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Prohibited Activities</h3>
                <p className="leading-relaxed mb-2">You may not:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Use the website for any illegal purpose</li>
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful code or viruses</li>
                  <li>Interfere with the website's operation</li>
                  <li>Attempt to gain unauthorized access</li>
                  <li>Use automated systems to access the website</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Products and Pricing</h2>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                We strive to display accurate product information, including descriptions, images, and prices. 
                However, we do not warrant that product descriptions, images, or other content is accurate, 
                complete, or error-free.
              </p>
              <p className="leading-relaxed">
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Limit quantities of products available for purchase</li>
                <li>Discontinue any product at any time</li>
                <li>Refuse or cancel any order</li>
                <li>Correct pricing errors</li>
              </ul>
              <p className="leading-relaxed">
                Tüm fiyatlar TL (Türk Lirası) cinsindendir ve önceden haber verilmeksizin değiştirilebilir. Fiyatlara 
                applicable taxes or shipping costs, which will be added at checkout.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Orders and Payment</h2>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                When you place an order, you are making an offer to purchase the products. We reserve the 
                right to accept or decline your order for any reason. Order confirmation does not constitute 
                acceptance; acceptance occurs when we ship the products.
              </p>
              <p className="leading-relaxed">
                Payment must be received before we process your order. We accept major credit cards, PayPal, 
                and other payment methods as displayed. By providing payment information, you represent that 
                you are authorized to use the payment method.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping and Delivery</h2>
            <p className="text-gray-700 leading-relaxed">
              Shipping times are estimates and not guaranteed. We are not responsible for delays caused by 
              shipping carriers or circumstances beyond our control. Risk of loss and title pass to you upon 
              delivery to the carrier. See our Shipping & Returns page for detailed information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns and Refunds</h2>
            <p className="text-gray-700 leading-relaxed">
              Our return policy is detailed on our Shipping & Returns page. Returns must be initiated within 
              30 days of delivery. We reserve the right to refuse returns that do not meet our policy 
              requirements. Refunds will be issued to the original payment method within 5-7 business days 
              of receiving the return.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on this website, including text, images, logos, graphics, and software, is the 
              property of BUTIKS or its licensors and is protected by copyright, trademark, and other 
              intellectual property laws. You may not reproduce, distribute, or create derivative works 
              without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer of Warranties</h2>
            <p className="text-gray-700 leading-relaxed">
              THE WEBSITE AND ALL PRODUCTS ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER 
              EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, ERROR-FREE, 
              OR SECURE. WE DISCLAIM ALL WARRANTIES, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR 
              PURPOSE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              TO THE FULLEST EXTENT PERMITTED BY LAW, BUTIKS SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE 
              WEBSITE OR PRODUCTS. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE 
              PRODUCT(S) IN QUESTION.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of 
              New York, United States, without regard to its conflict of law provisions. Any disputes shall 
              be resolved exclusively in the courts of New York.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately 
              upon posting. Your continued use of the website after changes constitutes acceptance of the 
              revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              For questions about these Terms, please contact us:
            </p>
            <div className="text-gray-700 space-y-1">
              <p>Email: legal@butiks.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Fashion Street, New York, NY 10001</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

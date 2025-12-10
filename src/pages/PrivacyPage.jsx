import { Shield } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <Shield className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Gizlilik Politikası
          </h1>
          <p className="text-gray-600">
            Son güncelleme: 9 Aralık 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş</h2>
            <p className="text-gray-700 leading-relaxed">
              At BUTIKS, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website and use our services. 
              Please read this privacy policy carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Topladığımız Bilgiler</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <p className="leading-relaxed mb-2">
                  We collect information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Register for an account</li>
                  <li>Make a purchase</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact customer support</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p className="leading-relaxed mt-2">
                  This may include: name, email address, phone number, shipping address, billing information, 
                  and payment details.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                <p className="leading-relaxed">
                  When you visit our website, we automatically collect certain information about your device, 
                  including IP address, browser type, operating system, referring URLs, and browsing behavior. 
                  We use cookies and similar tracking technologies to collect this information.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-2">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Send promotional emails and newsletters (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
              <li>Personalize your shopping experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell your personal information to third parties. We may share your information with:
            </p>
            <div className="space-y-3 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900">Service Providers</h3>
                <p className="text-sm">
                  We share information with trusted third-party service providers who help us operate our 
                  business (e.g., payment processors, shipping companies, email service providers).
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Legal Requirements</h3>
                <p className="text-sm">
                  We may disclose your information when required by law or to protect our rights, property, 
                  or safety, or that of others.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Business Transfers</h3>
                <p className="text-sm">
                  In the event of a merger, acquisition, or sale of assets, your information may be 
                  transferred to the acquiring entity.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to enhance your browsing experience, analyze website 
              traffic, and personalize content. You can control cookies through your browser settings, but 
              please note that disabling cookies may affect your ability to use certain features of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>Access and review your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              To exercise these rights, please contact us at privacy@butiks.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not intended for individuals under the age of 13. We do not knowingly collect 
              personal information from children. If you are a parent or guardian and believe your child has 
              provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new policy on this page and updating the "Last updated" date. We encourage you 
              to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="text-gray-700 space-y-1">
              <p>Email: privacy@butiks.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Fashion Street, New York, NY 10001</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;

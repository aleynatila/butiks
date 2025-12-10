import {
    ArrowUp,
    CreditCard,
    Facebook,
    Instagram,
    Mail,
    Phone,
    Store,
    Twitter
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Store className="w-8 h-8" />
              <span className="text-2xl font-bold">BUTIKS</span>
            </Link>
            <p className="text-sm text-gray-400">
              Dünya çapındaki bağımsız butiklerden özenle seçilmiş moda ürünlerinin adresi. 
              Benzersiz stilleri keşfet ve güvenle alışveriş yap.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-white transition-colors">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm hover:text-white transition-colors">
                  Kargo & İade
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-sm hover:text-white transition-colors">
                  Beden Rehberi
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm hover:text-white transition-colors">
                  Kariyer
                </Link>
              </li>
              <li>
                <Link to="/partnership" className="text-sm hover:text-white transition-colors font-medium text-indigo-400">
                  Ortak Ol
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-sm hover:text-white transition-colors">
                  Hesabım
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-sm hover:text-white transition-colors">
                  Sipariş Takip
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-sm hover:text-white transition-colors">
                  Favorilerim
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-white transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-white transition-colors">
                  Kullanım Koşulları
                </Link>
              </li>
            </ul>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>support@butiks.com</span>
              </div>
            </div>
          </div>

          {/* Column 4: About Store */}
          <div>
            <h3 className="text-white font-semibold mb-4">BUTIKS Hakkında</h3>
            <p className="text-sm text-gray-400 mb-4">
              Dünya çapındaki en iyi butiklerden özel koleksiyonlar. Kalite, özgünlük ve stil bir arada.
            </p>
            <Link
              to="/about"
              className="inline-block text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              Daha Fazla Bilgi →
            </Link>
          </div>
        </div>

        {/* Partner CTA Banner */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 md:p-8 text-center">
            <h3 className="text-xl md:text-3xl font-bold text-white mb-2">
              Bir Butiğiniz mi Var?
            </h3>
            <p className="text-sm md:text-base text-indigo-100 mb-4 md:mb-6">
              Platformumuza katılın ve dünya çapındaki milyonlarca moda meraklısına ulaşın
            </p>
            <Link
              to="/partnership"
              className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
            >
              <Store className="w-5 h-5" />
              <span>Ortak Ol</span>
            </Link>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-sm text-gray-400">
              Güvenli Ödeme Yöntemleri
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded">
                <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs">Visa</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded">
                <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs">Mastercard</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded">
                <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs">PayPal</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded">
                <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs">Apple Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} BUTIKS. All rights reserved.
            </p>
            
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

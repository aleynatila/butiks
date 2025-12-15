import { Check, ChevronLeft, CreditCard, Package, Truck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useShop } from '../context/ShopContextNew';

const CheckoutPage = () => {
  const { cart, getCartCount, getCartTotal, clearCart, showToast } = useShop();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form data
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const shippingOptions = [
    { id: 'standard', name: 'Standart Kargo', time: '5-7 iş günü', price: 0 },
    { id: 'express', name: 'Hızlı Kargo', time: '2-3 iş günü', price: 50 },
    { id: 'overnight', name: 'Ertesi Gün Kargo', time: '1 iş günü', price: 100 },
  ];

  const steps = [
    { id: 1, name: 'Gönderim', icon: Truck },
    { id: 2, name: 'Teslimat', icon: Package },
    { id: 3, name: 'Ödeme', icon: CreditCard },
    { id: 4, name: 'İnceleme', icon: Check },
  ];

  const subtotal = getCartTotal();
  const tax = subtotal * 0.20;
  const selectedShipping = shippingOptions.find(opt => opt.id === shippingMethod);
  const shippingCost = selectedShipping?.price || 0;
  const total = subtotal + tax + shippingCost;

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!shippingInfo.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) newErrors.email = 'Email is invalid';
    
    if (!shippingInfo.firstName) newErrors.firstName = 'First name is required';
    if (!shippingInfo.lastName) newErrors.lastName = 'Last name is required';
    if (!shippingInfo.phone) newErrors.phone = 'Phone is required';
    if (!shippingInfo.address) newErrors.address = 'Address is required';
    if (!shippingInfo.city) newErrors.city = 'City is required';
    if (!shippingInfo.state) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!paymentInfo.cardNumber) newErrors.cardNumber = 'Card number is required';
    else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!paymentInfo.cardName) newErrors.cardName = 'Cardholder name is required';
    if (!paymentInfo.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Format: MM/YY';
    }
    
    if (!paymentInfo.cvv) newErrors.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 3 && !validateStep3()) return;
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      clearCart();
      setIsProcessing(false);
      showToast({
        message: `Order placed successfully! Order #${orderNumber}`,
        type: 'success'
      });
      navigate('/');
    }, 2000);
  };

  if (getCartCount() === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Package className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sepetiniz boş</h1>
          <p className="text-gray-600 mb-6">Ödeme yapmak için sepetinize ürün ekleyin</p>
          <Button onClick={() => navigate('/shop')}>Alışverişe Devam Et</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Sepete Dön</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Ödeme</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                      currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : currentStep === step.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs sm:text-sm font-medium text-center ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 sm:mx-4 transition-all ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Gönderim Bilgileri</h2>
                  
                  <div className="space-y-4">
                    <Input
                      label="E-posta"
                      type="email"
                      placeholder="eposta@ornekmail.com"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      error={errors.email}
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Ad"
                        placeholder="Ali"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        error={errors.firstName}
                        required
                      />
                      <Input
                        label="Soyad"
                        placeholder="Yılmaz"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        error={errors.lastName}
                        required
                      />
                    </div>

                    <Input
                      label="Telefon"
                      type="tel"
                      placeholder="+90 (555) 123-4567"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      error={errors.phone}
                      required
                    />

                    <Input
                      label="Adres"
                      placeholder="Ataşehir Mahallesi, Ataşehir Caddesi No:123"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      error={errors.address}
                      required
                    />

                    <Input
                      label="Daire, bina vb. (opsiyonel)"
                      placeholder="Daire 4B"
                      value={shippingInfo.apartment}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, apartment: e.target.value })}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        label="Şehir"
                        placeholder="İstanbul"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        error={errors.city}
                        required
                      />
                      <Input
                        label="İlçe"
                        placeholder="Kadıköy"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        error={errors.state}
                        required
                      />
                      <Input
                        label="Posta Kodu"
                        placeholder="34000"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        error={errors.zipCode}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Method */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Kargo Yöntemi</h2>
                  
                  <div className="space-y-3">
                    {shippingOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          shippingMethod === option.id
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={shippingMethod === option.id}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="w-4 h-4"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{option.name}</p>
                            <p className="text-sm text-gray-600">{option.time}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {option.price === 0 ? 'ÜCRETSİZ' : `${option.price}₺`}
                        </p>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Ödeme Bilgileri</h2>
                  
                  <div className="space-y-4">
                    <Input
                      label="Kart Numarası"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                        setPaymentInfo({ ...paymentInfo, cardNumber: value });
                      }}
                      error={errors.cardNumber}
                      maxLength={19}
                      required
                    />

                    <Input
                      label="Kart Üzerindeki Ad Soyad"
                      placeholder="Ali Yılmaz"
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                      error={errors.cardName}
                      required
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Son Kullanma Tarihi"
                        placeholder="AA/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          setPaymentInfo({ ...paymentInfo, expiryDate: value });
                        }}
                        error={errors.expiryDate}
                        maxLength={5}
                        required
                      />
                      <Input
                        label="CVV"
                        placeholder="123"
                        type="password"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value.replace(/\D/g, '') })}
                        error={errors.cvv}
                        maxLength={4}
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <input
                        type="checkbox"
                        id="sameAsBilling"
                        checked={sameAsBilling}
                        onChange={(e) => setSameAsBilling(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="sameAsBilling" className="text-sm text-gray-700">
                        Fatura adresi gönderim adresiyle aynı
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Siparişi İncele</h2>
                  
                  <div className="space-y-6">
                    {/* Shipping Info */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Teslimat Adresi</h3>
                      <p className="text-gray-700">
                        {shippingInfo.firstName} {shippingInfo.lastName}<br />
                        {shippingInfo.address} {shippingInfo.apartment}<br />
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                        {shippingInfo.phone}
                      </p>
                      <button onClick={() => setCurrentStep(1)} className="text-sm text-gray-600 hover:text-gray-900 underline mt-1">
                        Düzenle
                      </button>
                    </div>

                    {/* Shipping Method */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Kargo Yöntemi</h3>
                      <p className="text-gray-700">{selectedShipping?.name} - {selectedShipping?.time}</p>
                      <button onClick={() => setCurrentStep(2)} className="text-sm text-gray-600 hover:text-gray-900 underline mt-1">
                        Düzenle
                      </button>
                    </div>

                    {/* Payment */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Ödeme Yöntemi</h3>
                      <p className="text-gray-700">
                        Kart sonu {paymentInfo.cardNumber.slice(-4)}
                      </p>
                      <button onClick={() => setCurrentStep(3)} className="text-sm text-gray-600 hover:text-gray-900 underline mt-1">
                        Düzenle
                      </button>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Sipariş Ürünleri</h3>
                      <div className="space-y-3">
                        {cart.map((item, index) => (
                          <div key={`checkout-${item.id}-${item.selectedSize || 'nosize'}-${item.selectedColor || 'nocolor'}-${index}`} className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">Adet: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-gray-900">
                              {(item.price * item.quantity).toFixed(2)}₺
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack}>
                    Geri
                  </Button>
                )}
                {currentStep < 4 ? (
                  <Button onClick={handleNext} fullWidth={currentStep === 1}>
                    Devam Et
                  </Button>
                ) : (
                  <Button onClick={handlePlaceOrder} loading={isProcessing} fullWidth>
                    Siparişi Tamamla
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sipariş Özeti</h3>
              
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Ara Toplam</span>
                  <span>{subtotal.toFixed(2)}₺</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Kargo</span>
                  <span>{shippingCost === 0 ? 'ÜCRETSİZ' : `${shippingCost.toFixed(2)}₺`}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>KDV (%20)</span>
                  <span>{tax.toFixed(2)}₺</span>
                </div>
              </div>
              
              <div className="flex justify-between text-xl font-bold text-gray-900 mb-4">
                <span>Toplam</span>
                <span>{total.toFixed(2)}₺</span>
              </div>

              <div className="text-sm text-gray-600">
                <p>Sepetinizde {getCartCount()} {getCartCount() === 1 ? 'ürün' : 'ürün'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

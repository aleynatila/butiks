# 🔐 Demo Kullanıcı Bilgileri

## Test Hesapları

### 👑 Super Admin (Platform Yöneticisi)
```
Email: admin@butiks.com
Şifre: Admin123!
```
**Yetkiler:**
- Tüm butikleri yönetme
- Butik başvurularını onaylama/reddetme
- Komisyon oranlarını belirleme
- Platform ayarları
- Tüm siparişleri görüntüleme
- Ödeme dağıtımları

---

### 🏪 Vendor (Butik Sahibi)
```
Butik Adı: Demo Satıcı
Email: vendor@butiks.com
Şifre: 123456
```
**Butik Bilgileri:**
- Kategori: Kadın Giyim
- Ürün Sayısı: ~25
- Durum: Aktif

---

### 🏪 Vendor 2 (Butik Sahibi)
```
Butik Adı: Classic Style
Email: vendor2@butiks.com
Şifre: Vendor123!
```
**Butik Bilgileri:**
- Kategori: Erkek Giyim
- Ürün Sayısı: ~20
- Durum: Aktif

---

### 🏪 Vendor 3 (Butik Sahibi)
```
Butik Adı: Urban Shoes
Email: vendor3@butiks.com
Şifre: Vendor123!
```
**Butik Bilgileri:**
- Kategori: Ayakkabı
- Ürün Sayısı: ~15
- Durum: Aktif

---

### 🏪 Vendor 4 (Bekleyen Başvuru)
```
Butik Adı: New Boutique
Email: vendor4@butiks.com
Şifre: Vendor123!
```
**Butik Bilgileri:**
- Durum: Beklemede (Admin onayı bekleniyor)

---

### 👤 Müşteri 1 (Normal Kullanıcı)
```
Email: customer1@butiks.com
Şifre: Customer123!
```
**Profil Bilgileri:**
- Ad: Ayşe Yılmaz
- Telefon: +90 555 111 2233
- Geçmiş Sipariş: 5 adet
- Favori Ürün: 12 adet

---

### 👤 Müşteri 2 (Normal Kullanıcı)
```
Email: customer2@butiks.com
Şifre: Customer123!
```
**Profil Bilgileri:**
- Ad: Mehmet Demir
- Telefon: +90 555 444 5566
- Geçmiş Sipariş: 3 adet
- Favori Ürün: 8 adet

---

### 👤 Müşteri 3 (Yeni Kullanıcı)
```
Email: customer3@butiks.com
Şifre: Customer123!
```
**Profil Bilgileri:**
- Ad: Zeynep Kaya
- Telefon: +90 555 777 8899
- Geçmiş Sipariş: 0 adet
- Favori Ürün: 2 adet

---

## 🧪 Test Senaryoları

### Admin Olarak Test
1. Admin hesabıyla giriş yap
2. Bekleyen butik başvurularını görüntüle (vendor4)
3. Başvuruyu onayla/reddet
4. Platform istatistiklerini kontrol et
5. Vendor ödemelerini yönet

### Vendor Olarak Test
1. Vendor1 hesabıyla giriş yap
2. Yeni ürün ekle
3. Stok güncelle
4. Siparişleri görüntüle
5. Sipariş durumunu güncelle
6. Satış raporlarını incele

### Müşteri Olarak Test
1. Customer1 hesabıyla giriş yap
2. Ürünleri filtrele (fiyat, beden, renk)
3. Farklı butiklerden ürün sepete ekle
4. Sepeti kontrol et (vendor bazlı gruplama)
5. Checkout yap
6. Sipariş takibi yap
7. Ürün yorumu yap

---

## 💳 Test Ödeme Bilgileri (Stripe Test Mode)

### Başarılı Ödeme
```
Kart Numarası: 4242 4242 4242 4242
Son Kullanma: 12/25
CVC: 123
```

### Başarısız Ödeme (Yetersiz Bakiye)
```
Kart Numarası: 4000 0000 0000 9995
Son Kullanma: 12/25
CVC: 123
```

### 3D Secure Gerekli
```
Kart Numarası: 4000 0027 6000 3184
Son Kullanma: 12/25
CVC: 123
```

---

## 📦 Test Siparişleri

### Sipariş #BT-20250001
- Müşteri: customer1@butiks.com
- Butik: Trendy Fashion + Classic Style
- Toplam: 1,450 TL
- Durum: Kargoda

### Sipariş #BT-20250002
- Müşteri: customer2@butiks.com
- Butik: Urban Shoes
- Toplam: 850 TL
- Durum: Teslim Edildi

---

## 🔒 Güvenlik Notları

⚠️ **UYARI:** Bu bilgiler sadece **DEMO/TEST** ortamı içindir!

- ✅ Tüm şifreler test amaçlıdır
- ✅ Production ortamında asla bu bilgileri kullanmayın
- ✅ Production'da güçlü ve benzersiz şifreler kullanın
- ✅ Bu dosyayı `.gitignore`'a ekleyin
- ✅ Production ortamında environment variables kullanın

---

## 🚀 Hızlı Başlangıç

### Backend Seed Data
```bash
cd backend
npm run seed
# Yukarıdaki demo kullanıcılar ve örnek ürünler oluşturulur
```

### Database Sıfırlama
```bash
npm run seed:reset
# Tüm verileri siler ve yeniden seed eder
```

---

## 📞 İletişim

Test sırasında sorun yaşarsanız:
- Backend logs: `backend/logs/`
- Frontend console: Browser DevTools
- API Test: Postman collection (`backend/postman/`)

---

**Not:** Bu bilgiler sadece geliştirme ortamı içindir. Production ortamında mutlaka gerçek ve güvenli kimlik bilgileri kullanın! 🔐

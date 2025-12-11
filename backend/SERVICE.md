# 🚀 Butiks API Systemd Service

Ubuntu 22.04 için systemd servis kurulumu ve yönetimi.

## 📦 Kurulum

Servis dosyası `/etc/systemd/system/butiks-api.service` konumuna otomatik olarak kurulmuştur.

## 🔧 Servis Yönetimi

### Servisi Başlat
```bash
sudo systemctl start butiks-api.service
```

### Servisi Durdur
```bash
sudo systemctl stop butiks-api.service
```

### Servisi Yeniden Başlat
```bash
sudo systemctl restart butiks-api.service
```

### Servis Durumunu Kontrol Et
```bash
sudo systemctl status butiks-api.service
```

### Sistem Açılışında Otomatik Başlat (Etkin)
```bash
sudo systemctl enable butiks-api.service
```

### Otomatik Başlatmayı Devre Dışı Bırak
```bash
sudo systemctl disable butiks-api.service
```

### Servis Loglarını Görüntüle
```bash
# Son 50 satır
sudo journalctl -u butiks-api.service -n 50

# Canlı log takibi
sudo journalctl -u butiks-api.service -f

# Bugünün logları
sudo journalctl -u butiks-api.service --since today
```

## 🔍 Servis Detayları

- **Çalışma Dizini**: `/butiks/backend`
- **Node.js Sürümü**: v20.19.6 (NVM)
- **Port**: 5000
- **Ortam**: Production
- **Otomatik Yeniden Başlatma**: Etkin (10 saniye bekleme)
- **MongoDB Bağımlılığı**: mongodb.service

## ✅ Servis Testi

### Health Check
```bash
curl http://localhost:5000/health
```

Beklenen yanıt:
```json
{
  "status": "success",
  "message": "Server is running",
  "timestamp": "2025-12-10T..."
}
```

### API Root
```bash
curl http://localhost:5000/api/v1
```

### Kullanıcı Kaydı
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+905551234567"
  }'
```

### Giriş Yap
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Profil Bilgisi (JWT Token ile)
```bash
curl -X GET http://localhost:5000/api/v1/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 🔄 Servis Dosyası Güncelleme

Servis dosyasını değiştirdikten sonra:

```bash
# Servis dosyasını kopyala
sudo cp /butiks/backend/butiks-api.service /etc/systemd/system/

# Systemd'yi yeniden yükle
sudo systemctl daemon-reload

# Servisi yeniden başlat
sudo systemctl restart butiks-api.service

# Durumu kontrol et
sudo systemctl status butiks-api.service
```

## 🐛 Sorun Giderme

### Servis Başlamıyorsa

1. **Logları kontrol edin:**
   ```bash
   sudo journalctl -u butiks-api.service -n 100 --no-pager
   ```

2. **MongoDB çalışıyor mu?**
   ```bash
   sudo systemctl status mongod
   ```

3. **Node.js yolu doğru mu?**
   ```bash
   which node
   # /root/.nvm/versions/node/v20.19.6/bin/node
   ```

4. **Port kullanımda mı?**
   ```bash
   sudo lsof -i :5000
   ```

5. **Environment variables doğru mu?**
   ```bash
   cat /butiks/backend/.env
   ```

### Yaygın Hatalar

**Error: listen EADDRINUSE**
- Port zaten kullanımda. `.env` dosyasında PORT değerini değiştirin.

**MongoDB connection error**
- MongoDB servisinin çalıştığından emin olun: `sudo systemctl start mongod`

**SyntaxError: Unexpected token**
- Node.js versiyonu eski. Servis dosyasında doğru Node.js yolunu kullanın.

## 📊 Performans İzleme

### CPU ve Memory Kullanımı
```bash
sudo systemctl status butiks-api.service
```

### Detaylı İstatistikler
```bash
# Gerçek zamanlı kaynak kullanımı
top -p $(pgrep -f "node src/server.js")

# veya
htop -p $(pgrep -f "node src/server.js")
```

## 🔐 Güvenlik Notları

1. **Production'da JWT_SECRET değiştirin:**
   ```bash
   nano /butiks/backend/.env
   # JWT_SECRET=güçlü-rastgele-string-buraya
   ```

2. **MongoDB kimlik doğrulama:**
   ```bash
   # MongoDB'ye admin kullanıcısı ekleyin
   mongosh
   use admin
   db.createUser({
     user: "butiks_admin",
     pwd: "güçlü_şifre",
     roles: ["readWrite", "dbAdmin"]
   })
   ```

3. **Firewall kuralları:**
   ```bash
   # Port 5000'i sadece localhost'a aç (internal API)
   sudo ufw allow from 127.0.0.1 to any port 5000
   
   # veya reverse proxy (nginx) kullanıyorsanız
   sudo ufw allow 'Nginx Full'
   ```

## 🌐 Production Deployment

### Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/butiks-api
server {
    listen 80;
    server_name api.butiks.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Nginx config'i etkinleştir
sudo ln -s /etc/nginx/sites-available/butiks-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.butiks.com
```

## 📝 Notlar

- Servis sistem açılışında otomatik olarak başlar
- Hata durumunda 10 saniye bekleyip otomatik yeniden başlatır
- Tüm loglar systemd journal'a yazılır
- Production modunda çalışır (NODE_ENV=production)

---

**Backend API başarıyla systemd servisi olarak çalışıyor! 🚀**

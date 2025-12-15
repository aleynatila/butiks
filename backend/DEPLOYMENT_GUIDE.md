# Butiks Backend Deployment Guide

Bu dokümanda Butiks API backend'ini production ortamına nasıl deploy edeceğinizi bulabilirsiniz.

## İçindekiler

1. [Sistem Gereksinimleri](#sistem-gereksinimleri)
2. [Sunucu Hazırlığı](#sunucu-hazırlığı)
3. [Deployment Yöntemleri](#deployment-yöntemleri)
4. [Konfigürasyon](#konfigürasyon)
5. [Monitoring & Logging](#monitoring--logging)
6. [Bakım ve Güncelleme](#bakım-ve-güncelleme)

## Sistem Gereksinimleri

### Minimum Gereksinimler
- **CPU**: 2 vCPU
- **RAM**: 2 GB
- **Disk**: 20 GB SSD
- **OS**: Ubuntu 20.04+ / Debian 11+
- **Node.js**: v20.x LTS
- **MongoDB**: 6.0+ (MongoDB Atlas önerilir)

### Önerilen Gereksinimler (Production)
- **CPU**: 4 vCPU
- **RAM**: 4 GB
- **Disk**: 40 GB SSD
- **Bandwidth**: 1 TB/ay

## Sunucu Hazırlığı

### 1. Sunucuya Bağlanma

```bash
ssh root@your-server-ip
```

### 2. Sistem Güncellemesi

```bash
sudo apt update && sudo apt upgrade -y
```

### 3. Node.js Kurulumu

```bash
# NodeSource repository ekle
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Node.js kur
sudo apt install -y nodejs

# Versiyonu kontrol et
node --version  # v20.x.x olmalı
npm --version
```

### 4. MongoDB Kurulumu (Opsiyonel - Atlas kullanılabilir)

MongoDB Atlas kullanmanızı öneriyoruz. Yerel kurulum için:

```bash
# MongoDB GPG key
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/mongodb-6.gpg

# MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Kurulum
sudo apt update
sudo apt install -y mongodb-org

# Başlat ve enable et
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 5. Nginx Kurulumu

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
```

### 6. SSL Sertifikası (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.butiks.com
```

## Deployment Yöntemleri

### Yöntem 1: Systemd Service (Önerilen)

#### Adım 1: Kodu Deploy Et

```bash
# Application dizini oluştur
sudo mkdir -p /var/www/butiks-api
cd /var/www/butiks-api

# Repository'yi clone et
git clone https://github.com/your-repo/butiks-backend.git .

# Dependencies kur
npm install --production

# Environment variables kopyala ve düzenle
cp .env.example .env
nano .env
```

#### Adım 2: Service Dosyasını Yapılandır

```bash
# Service dosyasını kopyala
sudo cp butiks-api.service /etc/systemd/system/

# Service dosyasını düzenle (path'leri güncelle)
sudo nano /etc/systemd/system/butiks-api.service

# Systemd'yi reload et
sudo systemctl daemon-reload

# Service'i enable ve start et
sudo systemctl enable butiks-api
sudo systemctl start butiks-api

# Status kontrolü
sudo systemctl status butiks-api
```

#### Adım 3: Nginx Konfigürasyonu

```bash
# Nginx config'i kopyala
sudo cp nginx.conf /etc/nginx/sites-available/butiks-api

# Domain adını güncelle
sudo nano /etc/nginx/sites-available/butiks-api

# Symlink oluştur
sudo ln -s /etc/nginx/sites-available/butiks-api /etc/nginx/sites-enabled/

# Nginx test
sudo nginx -t

# Nginx reload
sudo systemctl reload nginx
```

#### Yönetim Komutları

```bash
# Service'i başlat
sudo systemctl start butiks-api

# Service'i durdur
sudo systemctl stop butiks-api

# Service'i restart et
sudo systemctl restart butiks-api

# Status kontrol
sudo systemctl status butiks-api

# Log'ları izle
sudo journalctl -u butiks-api -f

# Veya manage.sh script'ini kullan
./manage.sh start
./manage.sh stop
./manage.sh restart
./manage.sh logs
```

### Yöntem 2: PM2 Process Manager

#### Kurulum

```bash
# PM2'yi global kur
sudo npm install -g pm2

# Application'ı başlat
pm2 start ecosystem.config.js --env production

# PM2'yi kaydet
pm2 save

# Startup script oluştur
pm2 startup
# Çıkan komutu çalıştır

# Process'leri listele
pm2 list

# Log'ları izle
pm2 logs butiks-api

# Restart
pm2 restart butiks-api

# Stop
pm2 stop butiks-api

# Delete
pm2 delete butiks-api
```

## Konfigürasyon

### Environment Variables (.env)

```bash
# Server
NODE_ENV=production
PORT=5000
API_VERSION=v1

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/butiks?retryWrites=true&w=majority

# JWT (Güçlü bir secret oluştur)
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# CORS
CORS_ORIGIN=https://butiks.com
FRONTEND_URL=https://butiks.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@butiks.com

# Stripe
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Platform
PLATFORM_COMMISSION_RATE=15

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Database Indexes Oluşturma

Production'da performans için gerekli indexler:

```javascript
// MongoDB shell'de çalıştır
use butiks

// Products indexes
db.products.createIndex({ vendorId: 1 })
db.products.createIndex({ categoryId: 1 })
db.products.createIndex({ status: 1, isPublished: 1 })
db.products.createIndex({ slug: 1 }, { unique: true })
db.products.createIndex({ name: "text", description: "text" })
db.products.createIndex({ price: 1 })
db.products.createIndex({ createdAt: -1 })

// Orders indexes
db.orders.createIndex({ orderNumber: 1 }, { unique: true })
db.orders.createIndex({ customerId: 1 })
db.orders.createIndex({ "vendorOrders.vendorId": 1 })
db.orders.createIndex({ "payment.status": 1 })
db.orders.createIndex({ createdAt: -1 })

// Users indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })

// Vendors indexes
db.vendors.createIndex({ userId: 1 }, { unique: true })
db.vendors.createIndex({ slug: 1 }, { unique: true })
db.vendors.createIndex({ status: 1 })

// Reviews indexes
db.reviews.createIndex({ productId: 1 })
db.reviews.createIndex({ userId: 1 })
db.reviews.createIndex({ status: 1 })

// Wishlists indexes
db.wishlists.createIndex({ userId: 1 }, { unique: true })
```

### Firewall Konfigürasyonu

```bash
# UFW'yi etkinleştir
sudo ufw enable

# SSH izin ver
sudo ufw allow ssh

# HTTP/HTTPS izin ver
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# MongoDB (sadece local erişim)
sudo ufw allow from 127.0.0.1 to any port 27017

# Status kontrolü
sudo ufw status
```

## Monitoring & Logging

### Log Dosyaları

```bash
# Systemd logs
sudo journalctl -u butiks-api -f

# Nginx logs
sudo tail -f /var/log/nginx/butiks-api-access.log
sudo tail -f /var/log/nginx/butiks-api-error.log

# Application logs
tail -f /butiks/backend/logs/*.log

# PM2 logs (PM2 kullanıyorsanız)
pm2 logs butiks-api
```

### Log Rotation

```bash
# Logrotate konfigürasyonu oluştur
sudo nano /etc/logrotate.d/butiks-api
```

İçerik:
```
/var/www/butiks-api/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
}
```

### Uptime Monitoring

Önerilen servisler:
- [UptimeRobot](https://uptimerobot.com) (Ücretsiz)
- [Pingdom](https://www.pingdom.com)
- [StatusCake](https://www.statuscake.com)

Health check endpoint: `https://api.butiks.com/health`

### Error Tracking

[Sentry](https://sentry.io) entegrasyonu için:

```bash
npm install @sentry/node
```

## Bakım ve Güncelleme

### Güncelleme Prosedürü

```bash
# 1. Sunucuya bağlan
ssh root@your-server-ip

# 2. Application dizinine git
cd /var/www/butiks-api

# 3. Son değişiklikleri çek
git pull origin main

# 4. Dependencies güncelle
npm install --production

# 5. Service'i restart et
sudo systemctl restart butiks-api

# Veya PM2 kullanıyorsanız
pm2 reload ecosystem.config.js --env production
```

### Backup Prosedürü

#### MongoDB Backup

```bash
# Backup scripti oluştur
nano /usr/local/bin/backup-mongodb.sh
```

Script içeriği:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/mongodb"
DB_NAME="butiks"

mkdir -p $BACKUP_DIR

mongodump --db $DB_NAME --out $BACKUP_DIR/$DATE

# Eski backupları temizle (30 günden eski)
find $BACKUP_DIR -type d -mtime +30 -exec rm -rf {} +

echo "Backup completed: $BACKUP_DIR/$DATE"
```

```bash
# Script'i executable yap
chmod +x /usr/local/bin/backup-mongodb.sh

# Cron job ekle (Her gün gece 2'de)
crontab -e
# Ekle: 0 2 * * * /usr/local/bin/backup-mongodb.sh
```

### Rollback Prosedürü

```bash
# 1. Önceki versiyona git
git log --oneline  # Commit hash'i bul
git checkout <commit-hash>

# 2. Dependencies güncelle
npm install --production

# 3. Service'i restart et
sudo systemctl restart butiks-api

# 4. Doğrula
curl https://api.butiks.com/health
```

## Sorun Giderme

### Service Başlamıyor

```bash
# Log'ları kontrol et
sudo journalctl -u butiks-api -n 50

# Port kullanımda mı kontrol et
sudo lsof -i :5000

# Konfigürasyonu test et
node src/server.js
```

### MongoDB Bağlantı Sorunu

```bash
# MongoDB çalışıyor mu?
sudo systemctl status mongod

# Connection string doğru mu?
cat .env | grep MONGODB_URI

# Network erişimi var mı? (Atlas için)
ping cluster.mongodb.net
```

### Nginx 502 Bad Gateway

```bash
# Backend çalışıyor mu?
sudo systemctl status butiks-api
curl http://localhost:5000/health

# Nginx error log
sudo tail -f /var/log/nginx/butiks-api-error.log
```

### Yüksek Memory Kullanımı

```bash
# Memory kullanımını kontrol et
free -h
pm2 monit  # PM2 kullanıyorsanız

# Service'i restart et
sudo systemctl restart butiks-api
```

## Güvenlik Notları

1. **Asla** `.env` dosyasını commit etmeyin
2. Güçlü JWT secret kullanın (min 32 karakter)
3. Firewall'u düzgün yapılandırın
4. SSL sertifikasını güncel tutun
5. Düzenli güvenlik güncellemeleri yapın
6. Database backuplarını farklı lokasyonda saklayın
7. Rate limiting değerlerini ayarlayın
8. Log dosyalarını düzenli kontrol edin

## Destek

Sorun yaşarsanız:
1. Log dosyalarını kontrol edin
2. GitHub Issues'da arayın
3. Yeni issue açın (log'ları ekleyin)
4. Dokümantasyonu gözden geçirin

## Kaynaklar

- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [MongoDB Production Notes](https://docs.mongodb.com/manual/administration/production-notes/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Let's Encrypt](https://letsencrypt.org/getting-started/)

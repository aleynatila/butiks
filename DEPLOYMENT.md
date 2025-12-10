# 🚀 Deployment Guide

Complete guide for deploying the Butiks e-commerce application to production.

---

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All ESLint errors fixed (`npm run lint`)
- [ ] Remove all `console.log()` statements
- [ ] Remove debug code and comments
- [ ] Test all features in development
- [ ] Check responsive design on multiple devices

### Configuration
- [ ] Update API URL in `.env.production`
- [ ] Configure CORS on backend for production domain
- [ ] Set up SSL certificate
- [ ] Update meta tags (title, description, OG tags)
- [ ] Add favicon and app icons
- [ ] Configure analytics (Google Analytics, etc.)

### Performance
- [ ] Optimize images (compress, WebP format)
- [ ] Enable code splitting
- [ ] Test build size (`npm run build`)
- [ ] Check Lighthouse scores
- [ ] Enable gzip/brotli compression

---

## 🌐 Frontend Deployment Options

### Option 1: Vercel (Recommended for React)

#### Why Vercel?
- ✅ Automatic deployments from Git
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Zero configuration
- ✅ Great DX with instant rollbacks

#### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Or use Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel auto-detects Vite
   - Add environment variables:
     ```
     VITE_API_URL=https://api.yourdomain.com/v1
     ```
   - Click "Deploy"

5. **Custom Domain**
   - Settings → Domains
   - Add your custom domain
   - Configure DNS (A record or CNAME)

---

### Option 2: Netlify

#### Deploy to Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build Project**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod --dir=dist
```

4. **Or use Netlify Dashboard**
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop `dist` folder
   - Or connect Git repository

5. **Configuration** (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "https://api.yourdomain.com/v1"
```

---

### Option 3: AWS S3 + CloudFront

#### For Large-Scale Applications

1. **Build Project**
```bash
npm run build
```

2. **Create S3 Bucket**
```bash
aws s3 mb s3://your-app-name
```

3. **Configure S3 for Static Hosting**
```bash
aws s3 website s3://your-app-name --index-document index.html
```

4. **Upload Build**
```bash
aws s3 sync dist/ s3://your-app-name --delete
```

5. **Create CloudFront Distribution**
   - Origin: Your S3 bucket
   - Enable HTTPS
   - Configure caching
   - Custom error pages (404 → /index.html)

6. **Update DNS**
   - Point domain to CloudFront distribution

---

### Option 4: Traditional Hosting (cPanel, FTP)

1. **Build Project**
```bash
npm run build
```

2. **Upload `dist` folder contents to server**
   - Use FTP client (FileZilla)
   - Upload to `public_html` or `www`

3. **Configure `.htaccess` (Apache)**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🔧 Backend Deployment Options

### Option 1: Railway (Easiest)

#### Deploy Node.js Backend

1. **Connect GitHub repo**
2. **Auto-detected settings**
3. **Add environment variables**
4. **Deploy with one click**

---

### Option 2: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login**
```bash
heroku login
```

3. **Create App**
```bash
heroku create your-api-name
```

4. **Add Buildpack**
```bash
heroku buildpacks:set heroku/nodejs
```

5. **Set Environment Variables**
```bash
heroku config:set DATABASE_URL=postgresql://...
heroku config:set JWT_SECRET=your-secret
heroku config:set NODE_ENV=production
```

6. **Deploy**
```bash
git push heroku main
```

7. **Open App**
```bash
heroku open
```

---

### Option 3: DigitalOcean Droplet

#### For Full Control

1. **Create Droplet** (Ubuntu 22.04 LTS)

2. **SSH into Server**
```bash
ssh root@your-server-ip
```

3. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Install PM2** (Process Manager)
```bash
npm install -g pm2
```

5. **Clone Repository**
```bash
git clone https://github.com/yourusername/your-backend.git
cd your-backend
npm install
```

6. **Configure Environment**
```bash
nano .env
# Add your environment variables
```

7. **Start with PM2**
```bash
pm2 start npm --name "api" -- start
pm2 save
pm2 startup
```

8. **Configure Nginx**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/api
```

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

10. **SSL Certificate** (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

---

### Option 4: Docker Deployment

#### Dockerfile for Backend

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    restart: always
  
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=butiks
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

volumes:
  postgres_data:
```

#### Deploy

```bash
docker-compose up -d
```

---

## 🗄️ Database Deployment

### PostgreSQL Options

#### Option 1: Supabase (Free Tier)
- Free PostgreSQL database
- 500MB storage
- Real-time subscriptions
- Auto-generated REST API

#### Option 2: Railway
- PostgreSQL with automatic backups
- Easy scaling
- $5/month after free tier

#### Option 3: AWS RDS
- Managed PostgreSQL
- Automatic backups
- Highly scalable
- From $15/month

#### Option 4: DigitalOcean Managed Database
- PostgreSQL 15
- Automatic backups
- High availability
- From $15/month

---

## 🔐 Environment Variables

### Frontend (.env.production)
```env
VITE_API_URL=https://api.yourdomain.com/v1
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Backend (.env)
```env
# Server
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/butiks

# Authentication
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRATION=7d

# Email (for password reset, order confirmations)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment (Optional)
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Storage (Optional)
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_S3_BUCKET=your-bucket-name
```

---

## 📊 Monitoring & Analytics

### Frontend Monitoring

#### Google Analytics
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Sentry (Error Tracking)
```bash
npm install @sentry/react
```

```javascript
// src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

### Backend Monitoring

#### PM2 Monitoring
```bash
pm2 monit
pm2 logs
pm2 status
```

#### Application Logs
```javascript
// Use winston or pino for logging
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

---

## 🚨 Security Checklist

### Frontend
- [x] All sensitive data in environment variables
- [x] HTTPS enforced
- [x] Content Security Policy headers
- [x] XSS protection
- [x] Input sanitization

### Backend
- [x] HTTPS/SSL enabled
- [x] CORS configured correctly
- [x] Rate limiting implemented
- [x] SQL injection protection (parameterized queries)
- [x] Password hashing (bcrypt, min 10 rounds)
- [x] JWT with expiration
- [x] Helmet.js for security headers
- [x] Input validation (joi, express-validator)
- [x] Environment variables secured

---

## 🧪 Testing in Production

### Smoke Tests
1. **Homepage loads**
2. **Products display correctly**
3. **Add to cart works**
4. **Checkout process completes**
5. **User can register/login**
6. **Style Finder works**
7. **All images load**
8. **Mobile responsive**

### Performance Tests
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage
```

---

## 📈 Post-Deployment

### Domain Configuration
1. **Buy domain** (Namecheap, GoDaddy, Google Domains)
2. **Configure DNS**:
   - A record: `@` → Server IP
   - CNAME: `www` → `@`
   - CNAME: `api` → API server
3. **Wait for DNS propagation** (up to 48 hours)

### SSL Certificate
- Automatically provided by Vercel/Netlify
- For custom servers: Use Let's Encrypt (free)

### Email Setup
- **Transactional emails**: SendGrid, Mailgun, AWS SES
- **Marketing emails**: Mailchimp, ConvertKit

### Backups
- **Database**: Daily automated backups
- **Files**: S3 or server backups
- **Code**: Git repository

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.API_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📞 Support & Maintenance

### Regular Tasks
- [ ] Monitor error logs daily
- [ ] Check performance metrics weekly
- [ ] Update dependencies monthly
- [ ] Review security advisories
- [ ] Backup verification weekly
- [ ] SSL certificate renewal (auto with Let's Encrypt)

### Scaling Considerations
- **CDN**: CloudFlare for global distribution
- **Load Balancer**: For multiple backend servers
- **Database**: Read replicas for scaling reads
- **Caching**: Redis for session/cart data
- **Queue**: Bull/RabbitMQ for async tasks

---

## 🎉 You're Live!

Congratulations! Your e-commerce app is now in production.

**Next Steps:**
1. Share with users
2. Gather feedback
3. Monitor analytics
4. Iterate and improve

**Resources:**
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Digital Ocean Tutorials](https://www.digitalocean.com/community/tutorials)

---

**Happy Deploying! 🚀**

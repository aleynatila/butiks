# Production Deployment Checklist

## Pre-Deployment

### Environment Configuration
- [ ] Set `NODE_ENV=production`
- [ ] Generate strong `JWT_SECRET` (min 32 characters)
- [ ] Configure production MongoDB connection string
- [ ] Set up Cloudinary account and add credentials
- [ ] Configure Stripe production keys
- [ ] Set up production email service (Gmail/SendGrid/etc)
- [ ] Update `CORS_ORIGIN` and `FRONTEND_URL` with production URLs
- [ ] Configure rate limiting values appropriately
- [ ] Set platform commission rate

### Database
- [ ] Create production MongoDB database (MongoDB Atlas recommended)
- [ ] Add database indexes for optimal performance
- [ ] Run database migrations if any
- [ ] Set up database backups
- [ ] Configure database connection pooling
- [ ] Test database connection

### Security
- [ ] Review and update all environment variables
- [ ] Ensure no sensitive data in code
- [ ] Enable helmet security headers
- [ ] Configure CORS properly (whitelist specific origins)
- [ ] Set up rate limiting
- [ ] Enable SSL/TLS certificates (Let's Encrypt)
- [ ] Review authentication and authorization logic
- [ ] Implement API key authentication if needed
- [ ] Set up firewall rules

### Dependencies
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Update dependencies to latest stable versions
- [ ] Remove development dependencies from production
- [ ] Install only production dependencies: `npm install --production`

### Code Quality
- [ ] Run linter: `npm run lint`
- [ ] Run tests if available
- [ ] Review error handling in all routes
- [ ] Check for console.log statements (use logger instead)
- [ ] Verify all async operations have error handling

## Server Setup

### System Configuration
- [ ] Set up Ubuntu/Debian server (recommended)
- [ ] Install Node.js (v20.x LTS)
- [ ] Install MongoDB or configure MongoDB Atlas
- [ ] Install Nginx
- [ ] Install PM2 or configure systemd service
- [ ] Configure firewall (UFW)
- [ ] Set up SSH keys (disable password authentication)
- [ ] Create non-root user for running the application

### Application Deployment
- [ ] Clone repository to server
- [ ] Copy `.env.example` to `.env` and configure
- [ ] Install dependencies: `npm install --production`
- [ ] Build application if needed
- [ ] Test application locally: `npm start`

### Process Management
- [ ] Choose process manager (systemd or PM2)
- [ ] If using systemd:
  - [ ] Copy service file: `sudo cp butiks-api.service /etc/systemd/system/`
  - [ ] Update service file with correct paths
  - [ ] Reload systemd: `sudo systemctl daemon-reload`
  - [ ] Enable service: `sudo systemctl enable butiks-api`
  - [ ] Start service: `sudo systemctl start butiks-api`
- [ ] If using PM2:
  - [ ] Install PM2: `npm install -g pm2`
  - [ ] Start application: `pm2 start ecosystem.config.js --env production`
  - [ ] Save PM2 config: `pm2 save`
  - [ ] Setup PM2 startup: `pm2 startup`

### Nginx Configuration
- [ ] Install Nginx: `sudo apt install nginx`
- [ ] Copy nginx config: `sudo cp nginx.conf /etc/nginx/sites-available/butiks-api`
- [ ] Update domain name in config
- [ ] Create symlink: `sudo ln -s /etc/nginx/sites-available/butiks-api /etc/nginx/sites-enabled/`
- [ ] Test config: `sudo nginx -t`
- [ ] Reload Nginx: `sudo systemctl reload nginx`

### SSL/TLS Certificate
- [ ] Install Certbot: `sudo apt install certbot python3-certbot-nginx`
- [ ] Obtain certificate: `sudo certbot --nginx -d api.butiks.com`
- [ ] Test auto-renewal: `sudo certbot renew --dry-run`

### Monitoring & Logging
- [ ] Set up log rotation
- [ ] Configure log aggregation (optional: ELK stack, Datadog, etc)
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom, etc)
- [ ] Configure error tracking (Sentry, Rollbar, etc)
- [ ] Set up performance monitoring (New Relic, AppDynamics, etc)
- [ ] Create health check endpoint monitoring

## Post-Deployment

### Testing
- [ ] Test health check endpoint: `curl https://api.butiks.com/health`
- [ ] Test API endpoints with production data
- [ ] Verify CORS configuration
- [ ] Test authentication flow
- [ ] Test file uploads
- [ ] Test payment integration
- [ ] Test email notifications
- [ ] Perform load testing

### Database
- [ ] Seed initial data (categories, etc)
- [ ] Create admin user account
- [ ] Verify database indexes
- [ ] Set up automated backups
- [ ] Test database restore procedure

### Monitoring
- [ ] Verify logs are being written
- [ ] Check server resources (CPU, RAM, Disk)
- [ ] Monitor API response times
- [ ] Set up alerts for errors
- [ ] Configure uptime monitoring

### Documentation
- [ ] Document deployment process
- [ ] Document server credentials (securely)
- [ ] Document backup procedures
- [ ] Document rollback procedures
- [ ] Create runbook for common issues

### Backup & Recovery
- [ ] Test database backup
- [ ] Test database restore
- [ ] Document recovery procedures
- [ ] Set up automated backups (daily recommended)
- [ ] Store backups in separate location

## Maintenance

### Regular Tasks
- [ ] Monitor server resources
- [ ] Review logs regularly
- [ ] Update dependencies monthly
- [ ] Run security audits
- [ ] Review and optimize database queries
- [ ] Clean up old logs
- [ ] Review and update rate limits
- [ ] Check SSL certificate expiry

### Performance Optimization
- [ ] Enable caching where appropriate
- [ ] Optimize database queries
- [ ] Add database indexes for frequently queried fields
- [ ] Monitor and optimize slow endpoints
- [ ] Consider CDN for static assets
- [ ] Implement response compression

## Rollback Plan

### If Deployment Fails
1. Stop the new version: `sudo systemctl stop butiks-api` or `pm2 stop butiks-api`
2. Restore previous version from backup
3. Restart with previous version
4. Verify services are running
5. Investigate and fix issues
6. Test thoroughly before redeploying

### Database Rollback
1. Stop application
2. Restore database from backup
3. Verify data integrity
4. Restart application
5. Test functionality

## Support Contacts

- **Server Provider**: [Add contact info]
- **Database Provider**: [Add contact info]
- **Domain Registrar**: [Add contact info]
- **SSL Provider**: [Add contact info]
- **Payment Gateway**: [Add contact info]

## Notes

- Always test changes in staging environment first
- Keep backups of configuration files
- Document all changes made to production
- Never commit sensitive data to version control
- Use environment variables for all configuration
- Monitor error rates after deployment
- Have rollback plan ready before deployment

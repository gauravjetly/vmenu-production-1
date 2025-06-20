# TV Menu Designer - Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- Domain name with DNS configured
- SSL certificate (or use Let's Encrypt)
- Minimum 2GB RAM, 2 CPU cores
- 20GB storage space

## Quick Deployment

### 1. Clone and Configure

```bash
# Clone the repository
git clone https://github.com/your-org/tv-menu-designer.git
cd tv-menu-designer

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 2. Run Deployment Script

```bash
# Make script executable
chmod +x scripts/deploy.sh

# Run deployment
./scripts/deploy.sh
```

## Manual Deployment

### 1. Build Application

```bash
# Install dependencies
npm install
npm run bootstrap

# Build all packages
npm run build
```

### 2. Configure Environment

Create `.env` file with production values:

```env
# Database
DB_NAME=tv_menu_designer
DB_USER=postgres
DB_PASSWORD=your-secure-password

# Redis
REDIS_PASSWORD=your-redis-password

# JWT Secrets (generate with: openssl rand -base64 32)
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret

# Domain
CORS_ORIGINS=https://yourdomain.com
API_URL=https://api.yourdomain.com
WS_URL=wss://api.yourdomain.com

# Optional: AWS S3
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket
```

### 3. Deploy with Docker Compose

```bash
cd infrastructure/docker

# Deploy production stack
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f

# Run database migrations
docker-compose -f docker-compose.prod.yml exec backend sh -c "cd packages/backend && npm run migrate"
```

## SSL Configuration

### Using Let's Encrypt

1. Initialize Certbot:
```bash
# Replace with your domain and email
docker-compose -f docker-compose.prod.yml run --rm certbot certonly \
  --webroot --webroot-path /var/www/certbot \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email \
  -d yourdomain.com \
  -d www.yourdomain.com
```

2. Update nginx configuration to use SSL certificates

### Using Custom SSL Certificate

1. Place your certificates in `infrastructure/docker/ssl/`:
   - `cert.pem` - SSL certificate
   - `key.pem` - Private key
   - `chain.pem` - Certificate chain (optional)

## Database Backup

### Manual Backup

```bash
# Create backup
docker-compose -f docker-compose.prod.yml exec postgres pg_dump -U postgres tv_menu_designer | gzip > backup_$(date +%Y%m%d_%H%M%S).sql.gz

# Restore backup
gunzip < backup_file.sql.gz | docker-compose -f docker-compose.prod.yml exec -T postgres psql -U postgres tv_menu_designer
```

### Automated Backups

The production stack includes an automated backup service that runs daily. Backups are stored in `infrastructure/docker/backups/`.

## Monitoring

### Health Checks

- Main App: `https://yourdomain.com/health`
- API: `https://api.yourdomain.com/health`
- Designer: `https://yourdomain.com/health`

### Logs

```bash
# View all logs
docker-compose -f docker-compose.prod.yml logs -f

# View specific service logs
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f nginx
```

### Metrics

Application logs are stored in the `logs` volume and can be integrated with monitoring tools like:
- Prometheus + Grafana
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Datadog
- New Relic

## Scaling

### Horizontal Scaling

1. **Backend API**: Add more instances
```yaml
backend:
  deploy:
    replicas: 3
```

2. **Load Balancing**: Use nginx upstream configuration

3. **Database**: Set up PostgreSQL replication

4. **Redis**: Use Redis Cluster for high availability

### Vertical Scaling

Update container resource limits:

```yaml
backend:
  deploy:
    resources:
      limits:
        cpus: '2'
        memory: 2G
      reservations:
        cpus: '1'
        memory: 1G
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check database credentials in .env
   - Ensure postgres container is healthy
   - Check firewall rules

2. **WebSocket Connection Failed**
   - Verify nginx WebSocket proxy configuration
   - Check CORS settings
   - Ensure correct WS_URL in frontend

3. **Upload Issues**
   - Check file size limits in nginx
   - Verify upload directory permissions
   - Check available disk space

### Debug Mode

```bash
# Enable debug logging
export LOG_LEVEL=debug
docker-compose -f docker-compose.prod.yml up
```

## Security Checklist

- [ ] Change all default passwords
- [ ] Generate secure JWT secrets
- [ ] Enable SSL/TLS
- [ ] Configure firewall rules
- [ ] Set up regular backups
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Disable debug mode in production
- [ ] Set up monitoring and alerts
- [ ] Regular security updates

## Support

For deployment assistance:
- Documentation: https://docs.tvmenudesigner.com
- Email: support@tvmenudesigner.com
- Issues: https://github.com/your-org/tv-menu-designer/issues
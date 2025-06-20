# VMenu Development Setup

## Current Status

### Production Environment ✅
- **URL**: https://vintiqmenus.com
- **Branch**: `main`
- **Status**: Fully deployed and operational
- **Features**: 
  - Complete menu management system
  - User authentication
  - Real-time updates via WebSocket
  - Professional UI

### Development Environment 🚧
- **URL**: https://dev.vintiqmenus.com (to be configured)
- **Branch**: `development`
- **Status**: Ready for development work

## Git Workflow

### Branches
1. **main** - Production branch (protected)
2. **development** - Development integration branch
3. **feature/*** - Feature branches
4. **hotfix/*** - Emergency fix branches

### Making Changes
```bash
# 1. Start from development branch
git checkout development
git pull origin development

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and commit
git add .
git commit -m "feat: describe your feature"

# 4. Push and create PR
git push origin feature/your-feature-name
# Create PR to development on GitHub
```

## Local Development

### Prerequisites
- Node.js 20+
- Docker and Docker Compose
- PostgreSQL (via Docker)
- Redis (via Docker)

### Setup
```bash
# 1. Clone repository
git clone https://github.com/gauravjetly/vmenu-production-1.git
cd vmenu-production-1

# 2. Switch to development branch
git checkout development

# 3. Install dependencies
cd vmenu-production
npm install

# 4. Start services
docker-compose up -d

# 5. Run migrations
cd backend
npm run migrate

# 6. Start development servers
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Environment Variables
Create `.env` files in both backend and frontend directories:

**backend/.env**
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://vmenu:vmenu123@localhost:5432/vmenu_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-dev-secret
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=vmenu-uploads-dev
```

**frontend/.env**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WS_URL=ws://localhost:5000
```

## Deployment

### To Development (Automatic)
- Push to `development` branch triggers deployment
- GitHub Actions builds and deploys to dev environment

### To Production (Protected)
1. Create PR from `development` to `main`
2. Get code review approval
3. Merge PR
4. Automatic deployment to production

## Next Steps for Development Environment

To set up a complete development environment on AWS:

1. **Create Development Infrastructure**
   - Duplicate Terraform configuration with `-dev` suffix
   - Create separate RDS instance for dev
   - Create separate Redis instance for dev
   - Use subdomain: dev.vintiqmenus.com

2. **Update GitHub Secrets**
   - Add development-specific AWS credentials
   - Add development database URLs
   - Configure separate SSM parameters

3. **Configure Development Subdomain**
   - Add CNAME record for dev.vintiqmenus.com
   - Point to development ALB
   - Configure SSL certificate

4. **Enable GitHub Actions for Dev**
   - The workflow is already created
   - Just needs AWS infrastructure to deploy to

## Useful Commands

```bash
# Check branch status
git branch -a

# Switch branches
git checkout main
git checkout development

# Update branches
git pull origin main
git pull origin development

# View logs
git log --oneline -10

# Run tests
npm test

# Build check
npm run build

# Lint code
npm run lint
```

## Support

- Check `BRANCHING_STRATEGY.md` for detailed Git workflow
- Review `SECURE_DEPLOYMENT_GUIDE.md` for security best practices
- See `QUICK_REFERENCE.md` for API endpoints and services
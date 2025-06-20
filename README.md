# Vintiq Menus - Digital Menu Display System

A production-ready digital menu management system for restaurants, cafes, and food establishments.

## 🚀 Deployed to AWS
- **Production URL**: https://vintiqmenus.com
- **Status**: ✅ Live and Running

## 📁 Project Structure
```
VMenu/
├── vmenu-production/          # Main application (deployed)
│   ├── backend/              # Node.js Express API
│   ├── frontend/             # Next.js React app
│   └── docker-compose.yml    # Local development setup
├── tv-menu-designer/         # Alternative menu designer (not deployed)
├── infrastructure/           # Terraform AWS infrastructure
│   └── terraform/           # IaC configuration files
└── .github/                 # GitHub Actions CI/CD
    └── workflows/          # Automated deployment pipeline
```

## 🛠️ Technology Stack
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Cache**: Redis
- **Real-time**: Socket.io
- **Cloud**: AWS (ECS, RDS, ElastiCache, S3, CloudFront)
- **CI/CD**: GitHub Actions
- **IaC**: Terraform

## 🏃‍♂️ Local Development

### Prerequisites
- Docker and Docker Compose
- Node.js 20+
- AWS CLI (for deployment)

### Quick Start
```bash
cd vmenu-production
docker-compose up -d
```

Access locally:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- WebSocket: http://localhost:3001

## 🚢 Deployment
Deployment is automated via GitHub Actions. Push to `main` branch to deploy.

### Manual Deployment
```bash
cd infrastructure/terraform
terraform apply
```

## 📚 Documentation
- [Deployment Guide](DEPLOYMENT_COMPLETE.md)
- [Security Guide](SECURE_DEPLOYMENT_GUIDE.md)
- [Local Development](vmenu-production/README.md)

## 🔐 Security
- All credentials stored in AWS Systems Manager Parameter Store
- GitHub Secrets for CI/CD
- Private VPC for internal communication
- HTTPS enforced in production

## 📧 Support
For issues or questions, check CloudWatch logs or ECS console.

---
Built with ❤️ for the restaurant industry
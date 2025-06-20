# Secure Deployment Guide - Vintiq Menus

## IMPORTANT: Security First! 🔒
- NEVER commit credentials to Git
- NEVER share AWS keys in files
- ALWAYS use GitHub Secrets for sensitive data

## Current Status
- ✅ Infrastructure deployed to AWS
- ✅ Domain active: vintiqmenus.com
- ⚠️ Need to fix AWS credentials

## Next Steps

### 1. Fix AWS Credentials
1. Go to AWS IAM Console
2. Deactivate old access keys
3. Create new access keys
4. Remove the quarantine policy

### 2. Update GitHub Secrets
Go to: Repository Settings → Secrets → Actions

Update these secrets with your NEW values:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

Keep these existing secrets:
- JWT_SECRET
- JWT_REFRESH_SECRET
- DATABASE_URL
- REDIS_URL
- AWS_S3_BUCKET
- VITE_API_URL
- VITE_WS_URL

### 3. Re-run Deployment
1. Go to Actions tab
2. Click on failed workflow
3. Click "Re-run all jobs"

## Infrastructure Details
Your infrastructure is deployed and includes:
- Load Balancer
- ECS Cluster  
- RDS PostgreSQL
- ElastiCache Redis
- S3 Bucket

## Monitoring
- Check deployment: GitHub Actions tab
- View logs: AWS CloudWatch
- Application URL: https://vintiqmenus.com

## Security Reminders
- Store credentials in password manager
- Use GitHub Secrets for CI/CD
- Never expose AWS keys
- Rotate credentials regularly
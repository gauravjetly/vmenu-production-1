# Deploying Vintiq Menus Infrastructure

## Current Status:
✅ Domain registered: vintiqmenus.com
✅ SSL Certificate created
✅ Terraform initialized
✅ Infrastructure planned

## Deploy Infrastructure

This will take about 15-20 minutes. Run:

```bash
cd /Users/gauravjetly/VMenu/infrastructure/terraform
terraform apply tfplan
```

## What's Being Created:

1. **Networking**
   - VPC with public/private subnets
   - Internet Gateway and NAT Gateways
   - Security Groups

2. **Database & Cache**
   - RDS PostgreSQL (db.t3.micro)
   - ElastiCache Redis (cache.t3.micro)

3. **Container Infrastructure**
   - ECS Cluster (Fargate)
   - ECR Repositories for Docker images
   - Task Definitions for services

4. **Load Balancing**
   - Application Load Balancer
   - Target Groups for each service
   - HTTPS listener with SSL certificate

5. **Storage**
   - S3 bucket for uploads

## After Deployment Completes:

1. **Save Outputs**
   ```bash
   terraform output > terraform-outputs.txt
   ```

2. **Update GitHub Secrets**
   - DATABASE_URL from RDS endpoint
   - REDIS_URL from ElastiCache endpoint

3. **Configure DNS**
   - Point vintiqmenus.com to ALB
   - Create api.vintiqmenus.com subdomain

4. **Push Code to GitHub**
   - Create repository
   - Push code
   - CI/CD will deploy automatically

## Domain Configuration:

After infrastructure is created, we'll set up:
- `vintiqmenus.com` → Frontend
- `api.vintiqmenus.com` → Backend API
- `ws.vintiqmenus.com` → WebSocket server

Ready to deploy?
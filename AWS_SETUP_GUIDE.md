# Complete AWS Setup Guide for VMenu

This guide will walk you through every step needed to deploy VMenu to AWS, starting from creating an AWS account.

## Step 1: Create AWS Account

### 1.1 Sign up for AWS
1. Go to https://aws.amazon.com
2. Click "Create an AWS Account"
3. Enter your email and choose a password
4. Select "Personal" account type
5. Fill in your contact information
6. Add a credit card (required for verification)
7. Verify your phone number
8. Select "Basic Plan" (free tier)

### 1.2 Secure Your Root Account
1. Once logged in, go to IAM Dashboard
2. Enable MFA (Multi-Factor Authentication):
   - Click your account name (top right) → Security credentials
   - In MFA section, click "Activate MFA"
   - Use an app like Google Authenticator

## Step 2: Create IAM User for Deployment

### 2.1 Create IAM User
1. Go to IAM Console: https://console.aws.amazon.com/iam/
2. Click "Users" → "Add users"
3. User name: `vmenu-deployer`
4. Select "Access key - Programmatic access"
5. Click "Next: Permissions"

### 2.2 Set Permissions
1. Click "Attach policies directly"
2. Search and select these policies:
   - `AmazonEC2ContainerRegistryFullAccess`
   - `AmazonECS_FullAccess`
   - `AmazonS3FullAccess`
   - `AmazonRDSFullAccess`
   - `ElastiCacheFullAccess`
   - `IAMFullAccess`
   - `AmazonVPCFullAccess`
   - `CloudWatchLogsFullAccess`
   - `AmazonSSMFullAccess`
3. Click "Next: Tags" → "Next: Review" → "Create user"

### 2.3 Save Credentials
⚠️ **IMPORTANT**: Save these credentials immediately!
- Access Key ID: `AKIA...`
- Secret Access Key: `wJalrX...`

You won't be able to see the secret key again!

## Step 3: Install Required Tools

### 3.1 Install AWS CLI
```bash
# On macOS
brew install awscli

# Or download from
# https://aws.amazon.com/cli/
```

### 3.2 Configure AWS CLI
```bash
aws configure
```
Enter:
- AWS Access Key ID: (from step 2.3)
- AWS Secret Access Key: (from step 2.3)
- Default region name: us-east-1
- Default output format: json

### 3.3 Install Terraform
```bash
# On macOS
brew install terraform

# Or download from
# https://www.terraform.io/downloads
```

## Step 4: Prepare Your Domain

### 4.1 Register a Domain (if needed)
1. Use Route 53 or any domain registrar
2. If using external registrar, you'll need to point nameservers to Route 53

### 4.2 Request SSL Certificate
1. Go to AWS Certificate Manager: https://console.aws.amazon.com/acm/
2. Click "Request a certificate"
3. Choose "Request a public certificate"
4. Add domain names:
   - `yourdomain.com`
   - `*.yourdomain.com`
5. Choose DNS validation
6. Review and request
7. **Save the Certificate ARN**: `arn:aws:acm:us-east-1:123456789:certificate/xxx`

## Step 5: Create GitHub Repository

### 5.1 Create Repository
1. Go to https://github.com/new
2. Repository name: `vmenu-production`
3. Make it private
4. Don't initialize with README

### 5.2 Push Your Code
```bash
cd /Users/gauravjetly/VMenu
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/vmenu-production.git
git push -u origin main
```

### 5.3 Add GitHub Secrets
1. Go to your repository on GitHub
2. Click Settings → Secrets and variables → Actions
3. Add these secrets:

| Secret Name | Value |
|------------|-------|
| AWS_ACCESS_KEY_ID | Your AWS Access Key from step 2.3 |
| AWS_SECRET_ACCESS_KEY | Your AWS Secret Key from step 2.3 |
| JWT_SECRET | Generate with: `openssl rand -base64 32` |
| JWT_REFRESH_SECRET | Generate with: `openssl rand -base64 32` |
| VITE_API_URL | `https://api.yourdomain.com` |
| VITE_WS_URL | `wss://api.yourdomain.com/ws` |
| DATABASE_URL | Leave empty for now (Terraform will create) |
| REDIS_URL | Leave empty for now (Terraform will create) |
| AWS_S3_BUCKET | `vmenu-uploads-production` |
| SLACK_WEBHOOK | Optional - for notifications |

## Step 6: Prepare Terraform Configuration

### 6.1 Create Terraform Variables File
```bash
cd /Users/gauravjetly/VMenu/infrastructure/terraform
```

Create `terraform.tfvars`:
```hcl
# Generate secure passwords
db_password = "GENERATE_SECURE_PASSWORD_HERE"
certificate_arn = "YOUR_CERTIFICATE_ARN_FROM_STEP_4"
jwt_secret = "SAME_AS_GITHUB_SECRET"
jwt_refresh_secret = "SAME_AS_GITHUB_SECRET"
```

To generate secure passwords:
```bash
# Generate database password
openssl rand -base64 24

# Use the same JWT secrets as in GitHub
```

### 6.2 Initialize Terraform Backend
```bash
# Create S3 bucket for Terraform state
aws s3 mb s3://vmenu-terraform-state-$(aws sts get-caller-identity --query Account --output text)

# Create DynamoDB table for state locking
aws dynamodb create-table \
    --table-name vmenu-terraform-locks \
    --attribute-definitions AttributeName=LockID,AttributeType=S \
    --key-schema AttributeName=LockID,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1
```

## Step 7: Deploy Infrastructure

### 7.1 Update Terraform Backend Configuration
Edit `infrastructure/terraform/main.tf` and update the backend bucket name:
```hcl
backend "s3" {
  bucket = "vmenu-terraform-state-YOUR_ACCOUNT_ID"
  key    = "prod/terraform.tfstate"
  region = "us-east-1"
  encrypt = true
  dynamodb_table = "vmenu-terraform-locks"
}
```

### 7.2 Run Terraform
```bash
cd /Users/gauravjetly/VMenu/infrastructure/terraform

# Initialize Terraform
terraform init

# Review what will be created
terraform plan

# Create infrastructure (this will take 15-20 minutes)
terraform apply
```

Type `yes` when prompted.

### 7.3 Save Terraform Outputs
After successful deployment, save these values:
```bash
terraform output

# You'll see:
# alb_dns_name = "vmenu-alb-123456.us-east-1.elb.amazonaws.com"
# rds_endpoint = "vmenu-postgres.abc123.us-east-1.rds.amazonaws.com:5432"
# redis_endpoint = "vmenu-redis.abc123.cache.amazonaws.com"
# s3_bucket_name = "vmenu-uploads-production"
```

## Step 8: Update GitHub Secrets

Now update these GitHub secrets with actual values:
1. Go back to GitHub Settings → Secrets
2. Update:
   - `DATABASE_URL`: `postgresql://vmenu_user:YOUR_DB_PASSWORD@RDS_ENDPOINT/vmenu_db`
   - `REDIS_URL`: `redis://REDIS_ENDPOINT:6379`
   - `AWS_S3_BUCKET`: Use the S3 bucket name from Terraform output

## Step 9: Configure Domain

### 9.1 Point Domain to Load Balancer
1. Go to Route 53: https://console.aws.amazon.com/route53/
2. Create Hosted Zone for your domain
3. Create A record:
   - Name: `api`
   - Type: A
   - Alias: Yes
   - Route traffic to: Application Load Balancer
   - Choose your region and load balancer

### 9.2 Update Frontend URL
Update GitHub secret:
- `VITE_API_URL`: `https://api.yourdomain.com`
- `VITE_WS_URL`: `wss://api.yourdomain.com/ws`

## Step 10: Deploy Application

### 10.1 Trigger Deployment
```bash
# Make a small change
echo "# VMenu Production" >> README.md
git add .
git commit -m "Trigger deployment"
git push origin main
```

### 10.2 Monitor Deployment
1. Go to GitHub Actions tab in your repository
2. Watch the deployment progress
3. It should take about 10-15 minutes

### 10.3 Verify Services
Check ECS services:
```bash
# List running services
aws ecs list-services --cluster vmenu-cluster

# Check service status
aws ecs describe-services \
    --cluster vmenu-cluster \
    --services vmenu-backend-service vmenu-frontend-service
```

## Step 11: Access Your Application

1. Frontend: `https://yourdomain.com`
2. API: `https://api.yourdomain.com/health`
3. WebSocket: `wss://api.yourdomain.com/ws`

## Troubleshooting Checklist

If something doesn't work:

1. **Check CloudWatch Logs**
   ```bash
   aws logs tail /ecs/vmenu/backend --follow
   ```

2. **Verify Security Groups**
   - ALB security group allows 80/443 from anywhere
   - ECS security group allows traffic from ALB
   - RDS security group allows traffic from ECS

3. **Check ECS Task Status**
   ```bash
   aws ecs list-tasks --cluster vmenu-cluster
   ```

4. **Verify Environment Variables**
   - Check ECS task definitions in AWS Console
   - Ensure all secrets are properly set

## What You Need to Provide Me:

1. **Your AWS Account ID** (12-digit number)
2. **Your chosen domain name**
3. **Certificate ARN** after requesting it
4. **GitHub repository URL** after creating it

Once you provide these, I can help you with specific configuration updates!
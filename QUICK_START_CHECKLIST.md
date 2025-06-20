# VMenu AWS Deployment - Quick Start Checklist

## What I Need From You:

### 1. AWS Account Setup ✓
- [ ] Create AWS account at https://aws.amazon.com
- [ ] Enable MFA on root account
- [ ] Create IAM user "vmenu-deployer" with required permissions
- [ ] Save Access Key ID: ________________
- [ ] Save Secret Access Key: ________________

### 2. Domain & SSL ✓
- [ ] Your domain name: ________________
- [ ] Request SSL certificate in AWS Certificate Manager
- [ ] Certificate ARN: ________________

### 3. GitHub Setup ✓
- [ ] Create GitHub repository
- [ ] Repository URL: ________________
- [ ] Add all required secrets to GitHub

### 4. Generate Secrets ✓
Run these commands and save the outputs:
```bash
# Database Password
openssl rand -base64 24
# Output: ________________

# JWT Secret
openssl rand -base64 32
# Output: ________________

# JWT Refresh Secret
openssl rand -base64 32
# Output: ________________
```

## Quick Commands to Run:

### 1. Install Tools
```bash
# Install AWS CLI
brew install awscli

# Install Terraform
brew install terraform

# Configure AWS
aws configure
```

### 2. Prepare Infrastructure
```bash
# Go to terraform directory
cd /Users/gauravjetly/VMenu/infrastructure/terraform

# Create terraform.tfvars file with your values
cat > terraform.tfvars <<EOF
db_password = "YOUR_GENERATED_DB_PASSWORD"
certificate_arn = "YOUR_CERTIFICATE_ARN"
jwt_secret = "YOUR_JWT_SECRET"
jwt_refresh_secret = "YOUR_JWT_REFRESH_SECRET"
EOF
```

### 3. Deploy
```bash
# Initialize and deploy
terraform init
terraform apply
```

## Information to Provide Me:

Please provide these values once you have them:

1. **AWS Account ID**: ________________ (12 digits)
2. **Domain Name**: ________________
3. **Certificate ARN**: arn:aws:acm:us-east-1:________________
4. **GitHub Repository**: https://github.com/________________
5. **Any errors or questions** you encounter

I'll help you update configurations and troubleshoot any issues!
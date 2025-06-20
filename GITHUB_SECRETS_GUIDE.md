# GitHub Secrets Configuration Guide

## Your Generated Secrets

Based on the secrets we just generated, here's exactly what to add to GitHub:

### Step 1: Go to GitHub Secrets Page
1. Go to your GitHub repository
2. Click **Settings** (in the repository, not your profile)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** for each secret below

### Step 2: Add Each Secret

Copy and paste these exactly:

| Secret Name | Value |
|-------------|-------|
| **AWS_ACCESS_KEY_ID** | *(You'll get this after creating AWS IAM user)* |
| **AWS_SECRET_ACCESS_KEY** | *(You'll get this after creating AWS IAM user)* |
| **JWT_SECRET** | `aHOYnRgFTy3e5EBrdhbbLx4T4J9FbQXiOteM+QV0zFU=` |
| **JWT_REFRESH_SECRET** | `hrIh4nxj9XVsCvoAHOQh8tG3Kgu6yztnmJ10EzP64m4=` |
| **DATABASE_URL** | *(Leave empty for now - will be updated after Terraform)* |
| **REDIS_URL** | *(Leave empty for now - will be updated after Terraform)* |
| **AWS_S3_BUCKET** | `vmenu-uploads-production` |
| **VITE_API_URL** | `https://api.yourdomain.com` *(replace with your domain)* |
| **VITE_WS_URL** | `wss://api.yourdomain.com/ws` *(replace with your domain)* |

### Step 3: For Terraform Variables

Create `/Users/gauravjetly/VMenu/infrastructure/terraform/terraform.tfvars`:

```hcl
db_password = "i877xygvLLjOKNdje3durWJX"
certificate_arn = "YOUR_CERTIFICATE_ARN_HERE"
jwt_secret = "aHOYnRgFTy3e5EBrdhbbLx4T4J9FbQXiOteM+QV0zFU="
jwt_refresh_secret = "hrIh4nxj9XVsCvoAHOQh8tG3Kgu6yztnmJ10EzP64m4="
```

### Step 4: For Local Development

Update your `.env` file:

```bash
# Database
DATABASE_URL=postgresql://vmenu_user:i877xygvLLjOKNdje3durWJX@localhost:5432/vmenu_db
DB_PASSWORD=i877xygvLLjOKNdje3durWJX

# Redis
REDIS_URL=redis://:PZAfAT7JuagXxsfo@localhost:6379
REDIS_PASSWORD=PZAfAT7JuagXxsfo

# JWT
JWT_SECRET=aHOYnRgFTy3e5EBrdhbbLx4T4J9FbQXiOteM+QV0zFU=
JWT_REFRESH_SECRET=hrIh4nxj9XVsCvoAHOQh8tG3Kgu6yztnmJ10EzP64m4=

# MinIO
MINIO_ROOT_PASSWORD=jOZMtsNz9KOcMj6m
```

## Important Notes:

1. **Save the `generated-secrets.txt` file** somewhere secure (like a password manager)
2. **Delete `generated-secrets.txt`** after saving the secrets elsewhere
3. **Never commit secrets** to your git repository
4. **Use different secrets** for production vs development if needed

## After AWS Setup:

You'll need to update these GitHub secrets with actual values:
- **DATABASE_URL**: Will be in format `postgresql://vmenu_user:i877xygvLLjOKNdje3durWJX@your-rds-endpoint:5432/vmenu_db`
- **REDIS_URL**: Will be in format `redis://:PZAfAT7JuagXxsfo@your-redis-endpoint:6379`
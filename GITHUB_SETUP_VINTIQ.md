# GitHub Repository Setup for Vintiq Menus

## Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `vintiq-menus`
3. Description: "Digital Menu Display System for Restaurants"
4. Make it **Private**
5. Do NOT initialize with README
6. Click **Create repository**

## Push Your Code

```bash
cd /Users/gauravjetly/VMenu
git init
git add .
git commit -m "Initial commit - Vintiq Menus Digital Display System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vintiq-menus.git
git push -u origin main
```

## Add GitHub Secrets

Go to: Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Value |
|-------------|-------|
| AWS_ACCESS_KEY_ID | `AKIA356SKB7ETO7JGYVJ` |
| AWS_SECRET_ACCESS_KEY | `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` |
| JWT_SECRET | `aHOYnRgFTy3e5EBrdhbbLx4T4J9FbQXiOteM+QV0zFU=` |
| JWT_REFRESH_SECRET | `hrIh4nxj9XVsCvoAHOQh8tG3Kgu6yztnmJ10EzP64m4=` |
| DATABASE_URL | (Leave empty - will update after Terraform) |
| REDIS_URL | (Leave empty - will update after Terraform) |
| AWS_S3_BUCKET | `vintiq-uploads-production` |
| VITE_API_URL | `https://api.vintiqmenus.com` |
| VITE_WS_URL | `wss://api.vintiqmenus.com/ws` |

## Update Your Local Git Config

```bash
git config user.name "Your Name"
git config user.email "your-email@example.com"
```
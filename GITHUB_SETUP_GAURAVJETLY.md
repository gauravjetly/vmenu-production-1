# GitHub Setup for gauravjetly

## Step 1: Create Repository on GitHub

1. Go to: https://github.com/new
2. Repository name: `vintiq-menus`
3. Description: "Digital Menu Display System for Restaurants"
4. Select **Private** (you can make it public later)
5. **DO NOT** check any initialization options:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. Click **Create repository**

## Step 2: Run These Commands Locally

```bash
cd /Users/gauravjetly/VMenu

# Configure git with your information
git config user.name "Gaurav Jetly"
git config user.email "gaurav.jetly@gmail.com"

# Initialize and commit
git init
git add .
git commit -m "Initial commit - Vintiq Menus Digital Display System"

# Add GitHub remote and push
git remote add origin https://github.com/gauravjetly/vintiq-menus.git
git branch -M main
git push -u origin main
```

## Step 3: Add GitHub Secrets

After pushing the code, go to:
https://github.com/gauravjetly/vintiq-menus/settings/secrets/actions

Click **New repository secret** for each:

| Name | Value |
|------|-------|
| AWS_ACCESS_KEY_ID | `AKIA356SKB7ETO7JGYVJ` |
| AWS_SECRET_ACCESS_KEY | `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` |
| JWT_SECRET | `aHOYnRgFTy3e5EBrdhbbLx4T4J9FbQXiOteM+QV0zFU=` |
| JWT_REFRESH_SECRET | `hrIh4nxj9XVsCvoAHOQh8tG3Kgu6yztnmJ10EzP64m4=` |
| DATABASE_URL | `postgresql://vmenu_user:i877xygvLLjOKNdje3durWJX@vintiq-postgres.cibyaqe4u9si.us-east-1.rds.amazonaws.com:5432/vmenu_db` |
| REDIS_URL | `redis://vintiq-redis.rndov6.0001.use1.cache.amazonaws.com:6379` |
| AWS_S3_BUCKET | `vintiq-uploads-production` |
| VITE_API_URL | `https://api.vintiqmenus.com` |
| VITE_WS_URL | `wss://api.vintiqmenus.com/ws` |

## Step 4: Trigger Deployment

After adding all secrets, the deployment will trigger automatically when you push. You can also:

1. Go to **Actions** tab
2. Click on the workflow run
3. Watch the deployment progress

## Step 5: Verify Deployment

Once complete (about 10-15 minutes), check:

1. **Frontend**: https://vintiqmenus.com
2. **API Health**: https://api.vintiqmenus.com/health
3. **Logs**: 
   ```bash
   aws logs tail /ecs/vintiq/backend --follow
   ```

## Troubleshooting

If you get authentication errors when pushing:
```bash
# Use personal access token instead of password
# Go to: https://github.com/settings/tokens
# Generate new token with 'repo' scope
# Use token as password when prompted
```

Ready? Start with creating the repository on GitHub!
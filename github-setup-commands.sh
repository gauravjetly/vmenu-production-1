#!/bin/bash

# GitHub Repository Setup for Vintiq Menus
echo "🚀 Setting up GitHub repository for Vintiq Menus"
echo "=============================================="

# Initialize git if not already done
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
fi

# Configure git user (update with your info)
echo "Configuring git user..."
git config user.name "Your Name"
git config user.email "your-email@example.com"

# Add all files
echo "Adding files to git..."
git add .

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo "Creating .gitignore..."
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
**/node_modules/

# Environment files
.env
.env.local
.env.production
**/.env

# Build outputs
dist/
build/
**/dist/
**/build/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
logs/

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Terraform
*.tfstate
*.tfstate.*
.terraform/
.terraform.lock.hcl
terraform.tfvars
tfplan*

# Docker
docker-compose.override.yml

# Temporary files
*.tmp
*.temp
generated-secrets.txt
create-cert-validation.json
configure-dns-vintiq.json

# Uploads
uploads/
**/uploads/
EOF
fi

# Initial commit
echo "Creating initial commit..."
git add .
git commit -m "Initial commit - Vintiq Menus Digital Display System

- Full-stack restaurant menu display system
- React frontend with digital menu designer
- Node.js backend with PostgreSQL and Redis
- WebSocket support for real-time updates
- Docker containerization
- AWS infrastructure with Terraform
- CI/CD pipeline with GitHub Actions"

echo ""
echo "✅ Git repository initialized!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://github.com/new"
echo "2. Create a new repository named: vintiq-menus"
echo "3. Make it PRIVATE"
echo "4. Do NOT initialize with README, .gitignore, or license"
echo "5. After creating, run these commands:"
echo ""
echo "# Replace YOUR_USERNAME with your GitHub username"
echo "git remote add origin https://github.com/YOUR_USERNAME/vintiq-menus.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""
echo "What's your GitHub username? I'll generate the exact commands for you."
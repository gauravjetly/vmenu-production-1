#!/bin/bash

# VMenu Deployment Setup Script
set -e

echo "🚀 VMenu Deployment Setup"
echo "========================="

# Check prerequisites
command -v aws >/dev/null 2>&1 || { echo "❌ AWS CLI is required but not installed. Aborting." >&2; exit 1; }
command -v terraform >/dev/null 2>&1 || { echo "❌ Terraform is required but not installed. Aborting." >&2; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "❌ Docker is required but not installed. Aborting." >&2; exit 1; }

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual values"
fi

# Create required directories
echo "📁 Creating required directories..."
mkdir -p .github/workflows
mkdir -p infrastructure/terraform

# Initialize git repository if needed
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Setup AWS infrastructure
read -p "Do you want to setup AWS infrastructure now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd infrastructure/terraform
    
    # Create state bucket
    echo "🪣 Creating Terraform state bucket..."
    aws s3 mb s3://vmenu-terraform-state --region us-east-1 || true
    
    # Create DynamoDB table for state locking
    echo "🔒 Creating Terraform state lock table..."
    aws dynamodb create-table \
        --table-name vmenu-terraform-locks \
        --attribute-definitions AttributeName=LockID,AttributeType=S \
        --key-schema AttributeName=LockID,KeyType=HASH \
        --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
        --region us-east-1 || true
    
    # Initialize Terraform
    echo "🏗️  Initializing Terraform..."
    terraform init
    
    echo "✅ Infrastructure setup complete!"
    echo "📋 Next steps:"
    echo "   1. Create terraform.tfvars with your values"
    echo "   2. Run 'terraform plan' to review changes"
    echo "   3. Run 'terraform apply' to create infrastructure"
    
    cd ../..
fi

# Setup GitHub secrets reminder
echo ""
echo "📌 GitHub Secrets Required:"
echo "   - AWS_ACCESS_KEY_ID"
echo "   - AWS_SECRET_ACCESS_KEY"
echo "   - DATABASE_URL"
echo "   - REDIS_URL"
echo "   - JWT_SECRET"
echo "   - JWT_REFRESH_SECRET"
echo "   - AWS_S3_BUCKET"
echo "   - VITE_API_URL"
echo "   - VITE_WS_URL"
echo "   - SLACK_WEBHOOK (optional)"
echo ""
echo "Add these in: Settings → Secrets and variables → Actions"

# Local development
read -p "Do you want to start services locally? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🐳 Starting Docker services..."
    cd vmenu-production
    docker-compose up -d
    
    echo "✅ Services started!"
    echo "🌐 Access the application at: http://localhost"
    echo "📊 MinIO console at: http://localhost:9001"
    
    cd ..
fi

echo ""
echo "🎉 Setup complete!"
echo "📚 See DEPLOYMENT_GUIDE.md for detailed instructions"
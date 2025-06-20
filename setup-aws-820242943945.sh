#!/bin/bash

# AWS Setup Script for Account 820242943945
set -e

echo "🚀 Setting up AWS infrastructure for VMenu"
echo "AWS Account ID: 820242943945"
echo "==========================================="

# Check if AWS CLI is configured
echo "Checking AWS CLI configuration..."
AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text 2>/dev/null || echo "not-configured")

if [ "$AWS_ACCOUNT" != "820242943945" ]; then
    echo "❌ AWS CLI is not configured for account 820242943945"
    echo "Please run: aws configure"
    echo "And enter your AWS Access Key ID and Secret Access Key"
    exit 1
fi

echo "✅ AWS CLI configured for account 820242943945"

# Create S3 bucket for Terraform state
echo ""
echo "Creating S3 bucket for Terraform state..."
if aws s3 ls s3://vmenu-terraform-state-820242943945 2>/dev/null; then
    echo "✅ S3 bucket already exists"
else
    aws s3 mb s3://vmenu-terraform-state-820242943945 --region us-east-1
    echo "✅ S3 bucket created"
fi

# Enable versioning on the bucket
echo "Enabling versioning on S3 bucket..."
aws s3api put-bucket-versioning \
    --bucket vmenu-terraform-state-820242943945 \
    --versioning-configuration Status=Enabled \
    --region us-east-1

# Create DynamoDB table for state locking
echo ""
echo "Creating DynamoDB table for state locking..."
if aws dynamodb describe-table --table-name vmenu-terraform-locks --region us-east-1 2>/dev/null; then
    echo "✅ DynamoDB table already exists"
else
    aws dynamodb create-table \
        --table-name vmenu-terraform-locks \
        --attribute-definitions AttributeName=LockID,AttributeType=S \
        --key-schema AttributeName=LockID,KeyType=HASH \
        --billing-mode PAY_PER_REQUEST \
        --region us-east-1
    echo "✅ DynamoDB table created"
fi

echo ""
echo "✅ AWS infrastructure setup complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Create SSL certificate in AWS Certificate Manager"
echo "2. Choose your domain name"
echo "3. Run Terraform to deploy the infrastructure"
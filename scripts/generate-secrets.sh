#!/bin/bash

# Generate Secrets Script for VMenu
echo "🔐 Generating Secrets for VMenu Deployment"
echo "=========================================="
echo ""

# Create a secrets file
SECRETS_FILE="generated-secrets.txt"
echo "# VMenu Generated Secrets - $(date)" > $SECRETS_FILE
echo "# ⚠️  SAVE THIS FILE IN A SECURE LOCATION!" >> $SECRETS_FILE
echo "# ⚠️  DO NOT COMMIT THIS TO GIT!" >> $SECRETS_FILE
echo "" >> $SECRETS_FILE

# Generate Database Password
echo "Generating database password..."
DB_PASSWORD=$(openssl rand -base64 24 | tr -d "=+/" | cut -c1-24)
echo "✅ Database Password Generated"
echo "DATABASE_PASSWORD=$DB_PASSWORD" >> $SECRETS_FILE

# Generate JWT Secret
echo "Generating JWT secret..."
JWT_SECRET=$(openssl rand -base64 32)
echo "✅ JWT Secret Generated"
echo "JWT_SECRET=$JWT_SECRET" >> $SECRETS_FILE

# Generate JWT Refresh Secret
echo "Generating JWT refresh secret..."
JWT_REFRESH_SECRET=$(openssl rand -base64 32)
echo "✅ JWT Refresh Secret Generated"
echo "JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET" >> $SECRETS_FILE

# Generate MinIO Password
echo "Generating MinIO admin password..."
MINIO_PASSWORD=$(openssl rand -base64 16 | tr -d "=+/" | cut -c1-16)
echo "✅ MinIO Password Generated"
echo "MINIO_ROOT_PASSWORD=$MINIO_PASSWORD" >> $SECRETS_FILE

# Generate Redis Password
echo "Generating Redis password..."
REDIS_PASSWORD=$(openssl rand -base64 16 | tr -d "=+/" | cut -c1-16)
echo "✅ Redis Password Generated"
echo "REDIS_PASSWORD=$REDIS_PASSWORD" >> $SECRETS_FILE

echo "" >> $SECRETS_FILE
echo "# GitHub Secrets (copy these to GitHub Settings > Secrets)" >> $SECRETS_FILE
echo "# ========================================================" >> $SECRETS_FILE

# Display results
echo ""
echo "📄 Secrets have been saved to: $SECRETS_FILE"
echo ""
echo "🔐 YOUR GENERATED SECRETS:"
echo "========================="
cat $SECRETS_FILE
echo ""
echo "📋 NEXT STEPS:"
echo "============="
echo "1. Copy these secrets to a password manager"
echo "2. Use them when setting up:"
echo "   - GitHub Secrets (Settings → Secrets → Actions)"
echo "   - Terraform variables (terraform.tfvars)"
echo "   - Local .env file"
echo ""
echo "⚠️  SECURITY REMINDERS:"
echo "   - Never commit $SECRETS_FILE to git"
echo "   - Delete $SECRETS_FILE after copying secrets"
echo "   - Use different secrets for production vs development"

# Add to .gitignore
if ! grep -q "generated-secrets.txt" .gitignore 2>/dev/null; then
    echo "generated-secrets.txt" >> .gitignore
    echo "✅ Added generated-secrets.txt to .gitignore"
fi
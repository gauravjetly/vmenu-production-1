# How to Find Your AWS Account ID

Your AWS Account ID is a 12-digit number (example: 123456789012)

## Method 1: From AWS Console (Easiest)
1. Log in to AWS Console: https://console.aws.amazon.com
2. Look at the **top right corner** of the page
3. Click on your account name/email
4. You'll see your Account ID in the dropdown
   - It will show as: "Account ID: 123456789012"

## Method 2: From Account Settings
1. Click your account name (top right)
2. Select "Account"
3. Your Account ID is displayed at the top

## Method 3: Using AWS CLI (if configured)
```bash
aws sts get-caller-identity --query Account --output text
```

## What It Looks Like
- ✅ Correct format: `123456789012` (12 digits, no hyphens)
- ❌ Incorrect: `8202-4294-3945` (has hyphens)
- ❌ Incorrect: `1234-5678-9012` (has hyphens)

## Visual Guide:
```
┌─────────────────────────────────────────┐
│ AWS Management Console                   │
│                                         │
│                    Hello, your@email.com ▼│
│                    ┌────────────────────┐│
│                    │ Account ID: 123456789012││
│                    │ Sign Out          ││
│                    └────────────────────┘│
└─────────────────────────────────────────┘
```

Please check again and provide the 12-digit number!
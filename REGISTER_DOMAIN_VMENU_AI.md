# Registering vmenu.ai Domain

## Step 1: Check Domain Availability & Register

1. Go to Route 53: https://console.aws.amazon.com/route53/
2. Click **Register domains** in the left sidebar
3. In the search box, type: `vmenu.ai`
4. Click **Search**
5. If available, you'll see the price (`.ai` domains are typically $75-100/year)
6. Click **Select** next to vmenu.ai
7. Click **Proceed to checkout**

## Step 2: Contact Information

1. Choose contact type: **Person**
2. Fill in your contact details:
   - First and Last Name
   - Email (use a reliable email)
   - Phone number
   - Address
3. For **Privacy Protection**: Enable it (hides your personal info from WHOIS)
4. Click **Continue**

## Step 3: Verify & Purchase

1. Review the order:
   - Domain: vmenu.ai
   - Period: 1 year (can auto-renew)
   - Price: ~$75-100
2. Check **Terms and Conditions**
3. Click **Complete purchase**

## Step 4: Email Verification

⚠️ **IMPORTANT**: 
- Check your email immediately
- You'll get a verification email
- Click the verification link within 15 days or domain will be suspended

## Step 5: Wait for Registration

- Domain registration can take 5-30 minutes
- You'll receive confirmation email when complete
- The domain will appear in Route 53 console

## After Registration - Create SSL Certificate

Once domain is registered:

1. Go to AWS Certificate Manager: https://console.aws.amazon.com/acm/
2. **IMPORTANT**: Make sure you're in **US East (N. Virginia) us-east-1** region
3. Click **Request a certificate**
4. Choose **Request a public certificate**
5. Click **Next**
6. Add domain names:
   - `vmenu.ai`
   - `*.vmenu.ai` (for subdomains like api.vmenu.ai)
7. Select **DNS validation**
8. Click **Request**

## DNS Validation (Automatic with Route 53)

Since you're using Route 53, validation is easy:
1. In the certificate details, click **Create records in Route 53**
2. Click **Create records**
3. Wait 5-10 minutes for validation
4. Certificate status will change to **Issued**

## Certificate ARN

Once issued, copy the Certificate ARN. It looks like:
```
arn:aws:acm:us-east-1:820242943945:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv
```

## Alternative Domains (if vmenu.ai is taken)

- vmenu.app
- vmenu.io
- vmenu.cloud
- vmenus.ai
- vmenu-app.com
- digital-vmenu.ai

Let me know:
1. If vmenu.ai is available and you want to proceed
2. If it's taken, which alternative you prefer
3. If the price is okay (`.ai` domains are premium)
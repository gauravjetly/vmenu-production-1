# Registering vintiqmenus.com

## Step 1: Register Domain via AWS CLI

We'll register the domain using the AWS CLI. First, let's get the registration price:

```bash
aws route53domains get-domain-prices --tld com --region us-east-1
```

## Step 2: Register the Domain

Run this command to register vintiqmenus.com:

```bash
aws route53domains register-domain \
    --domain-name vintiqmenus.com \
    --duration-in-years 1 \
    --auto-renew \
    --admin-contact FirstName=FIRST,LastName=LAST,ContactType=PERSON,AddressLine1="ADDRESS",City=CITY,State=STATE,CountryCode=US,ZipCode=ZIP,PhoneNumber=+1.PHONE,Email=EMAIL \
    --registrant-contact FirstName=FIRST,LastName=LAST,ContactType=PERSON,AddressLine1="ADDRESS",City=CITY,State=STATE,CountryCode=US,ZipCode=ZIP,PhoneNumber=+1.PHONE,Email=EMAIL \
    --tech-contact FirstName=FIRST,LastName=LAST,ContactType=PERSON,AddressLine1="ADDRESS",City=CITY,State=STATE,CountryCode=US,ZipCode=ZIP,PhoneNumber=+1.PHONE,Email=EMAIL \
    --privacy-protect-admin-contact \
    --privacy-protect-registrant-contact \
    --privacy-protect-tech-contact \
    --region us-east-1
```

## Step 3: Or Register via Console (Easier)

1. Go to: https://console.aws.amazon.com/route53/
2. Click **Register domains**
3. Search for: `vintiqmenus.com`
4. Click **Add to cart**
5. Click **Continue**
6. Fill in your contact information:
   - First Name
   - Last Name
   - Email (important - you'll get verification email)
   - Phone
   - Address
7. Enable **Privacy Protection** (recommended)
8. Review and complete purchase (~$12)

## Step 4: Email Verification

⚠️ **CRITICAL**: 
- Check your email immediately after registration
- Click the verification link
- You have 15 days to verify or domain will be suspended

## Step 5: Create SSL Certificate

After domain is registered (5-30 minutes):

1. Go to: https://console.aws.amazon.com/acm/
2. **ENSURE** you're in **US East (N. Virginia) us-east-1** region
3. Click **Request a certificate**
4. Select **Request a public certificate**
5. Add domain names:
   - `vintiqmenus.com`
   - `*.vintiqmenus.com`
6. Choose **DNS validation**
7. Click **Request**

## Step 6: Validate Certificate

Since you own the domain in Route 53:
1. In certificate details, click **Create records in Route 53**
2. Select both domains
3. Click **Create records**
4. Wait 5-10 minutes
5. Certificate status will change to **Issued**

## Step 7: Copy Certificate ARN

Once issued, your certificate ARN will be:
```
arn:aws:acm:us-east-1:820242943945:certificate/[certificate-id]
```

Save this for Terraform configuration!
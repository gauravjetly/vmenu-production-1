# Simple AWS Admin User Setup (ONE Policy Only)

## Step 1: Create New User
1. Go to https://console.aws.amazon.com/iam/
2. Click **Users** → **Create user**
3. User name: `vmenu-admin`
4. Click **Next**

## Step 2: Add ONLY ONE Policy
1. Select **Attach policies directly**
2. In the search box, type: `AdministratorAccess`
3. Check ONLY the box next to **AdministratorAccess**
4. Click **Next**
5. Click **Create user**

## Step 3: Create Access Keys
1. Click on `vmenu-admin` (the user you just created)
2. Go to **Security credentials** tab
3. Scroll down to **Access keys**
4. Click **Create access key**
5. Select **Command Line Interface (CLI)**
6. Check the confirmation box
7. Click **Next**
8. Click **Create access key**

## Step 4: SAVE YOUR KEYS! ⚠️
**COPY THESE NOW:**
- Access key ID: `AKIA...` (20 characters)
- Secret access key: `...` (40 characters)

Save them in a text file temporarily!

## Step 5: Configure AWS CLI
Run this command:
```bash
aws configure
```

When prompted, enter:
```
AWS Access Key ID [None]: (paste your Access key ID)
AWS Secret Access Key [None]: (paste your Secret access key)
Default region name [None]: us-east-1
Default output format [None]: json
```

## Step 6: Verify It Works
```bash
aws sts get-caller-identity
```

You should see:
```json
{
    "UserId": "AIDA...",
    "Account": "820242943945",
    "Arn": "arn:aws:iam::820242943945:user/vmenu-admin"
}
```

## That's it! 
You now have an admin user with full permissions using just ONE policy.
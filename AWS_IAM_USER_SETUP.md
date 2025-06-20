# Creating IAM User for VMenu Deployment

## Step 1: Log into AWS Console
1. Go to https://console.aws.amazon.com
2. Sign in with your root account

## Step 2: Create IAM User
1. Go to IAM Console: https://console.aws.amazon.com/iam/
2. Click **Users** in the left sidebar
3. Click **Create user** button
4. Enter user name: `vmenu-deployer`
5. Click **Next**

## Step 3: Set Permissions
1. Select **Attach policies directly**
2. Search and check these policies:
   - ✅ `AmazonEC2ContainerRegistryFullAccess`
   - ✅ `AmazonECS_FullAccess`
   - ✅ `AmazonS3FullAccess`
   - ✅ `AmazonRDSFullAccess`
   - ✅ `ElastiCacheFullAccess`
   - ✅ `IAMFullAccess`
   - ✅ `AmazonVPCFullAccess`
   - ✅ `CloudWatchLogsFullAccess`
   - ✅ `AmazonSSMFullAccess`
   - ✅ `AmazonRoute53FullAccess`
   - ✅ `AWSCertificateManagerFullAccess`
3. Click **Next**
4. Click **Create user**

## Step 4: Create Access Keys
1. Click on the user `vmenu-deployer` you just created
2. Go to **Security credentials** tab
3. Under **Access keys**, click **Create access key**
4. Select **Command Line Interface (CLI)**
5. Check the confirmation box
6. Click **Next**
7. (Optional) Add a description like "VMenu deployment"
8. Click **Create access key**

## Step 5: SAVE YOUR CREDENTIALS! ⚠️

You'll see:
- **Access Key ID**: Something like `AKIAIOSFODNN7EXAMPLE`
- **Secret Access Key**: Something like `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

**IMPORTANT**: 
- Copy these immediately!
- You won't be able to see the Secret Access Key again
- Save them in a password manager

## Step 6: Configure AWS CLI

Now run:
```bash
aws configure
```

Enter:
- **AWS Access Key ID**: (paste from Step 5)
- **AWS Secret Access Key**: (paste from Step 5)
- **Default region name**: us-east-1
- **Default output format**: json

## Verify Configuration

Test that it works:
```bash
aws sts get-caller-identity
```

You should see:
```json
{
    "UserId": "AIDACKCEVSQ6C2EXAMPLE",
    "Account": "820242943945",
    "Arn": "arn:aws:iam::820242943945:user/vmenu-deployer"
}
```
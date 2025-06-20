# Creating Custom IAM Policy for VMenu Deployment

Since you're hitting policy limits, we'll create ONE custom policy with all required permissions.

## Step 1: Go to IAM Policies
1. Go to https://console.aws.amazon.com/iam/
2. Click **Policies** in the left sidebar
3. Click **Create policy**

## Step 2: Use JSON Editor
1. Click the **JSON** tab
2. Delete the default content
3. Copy and paste this entire policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecr:*",
                "ecs:*",
                "ec2:*",
                "elasticloadbalancing:*",
                "logs:*",
                "s3:*",
                "rds:*",
                "elasticache:*",
                "iam:*",
                "ssm:*",
                "cloudwatch:*",
                "route53:*",
                "acm:*",
                "dynamodb:CreateTable",
                "dynamodb:DescribeTable",
                "dynamodb:PutItem",
                "dynamodb:GetItem",
                "dynamodb:DeleteItem",
                "dynamodb:UpdateItem",
                "application-autoscaling:*",
                "cloudformation:*"
            ],
            "Resource": "*"
        }
    ]
}
```

## Step 3: Create the Policy
1. Click **Next: Tags**
2. Click **Next: Review**
3. Policy name: `VMenuDeploymentPolicy`
4. Description: `Full permissions for VMenu deployment and Terraform`
5. Click **Create policy**

## Step 4: Attach to User
1. Go back to **Users** → `vmenu-deployer`
2. Click **Add permissions** → **Attach policies directly**
3. Search for `VMenuDeploymentPolicy`
4. Check the box next to it
5. Click **Next** → **Add permissions**

## Alternative: Create Admin User (Simpler)

If the above still has issues, create an admin user:

1. Go to **Users** → **Create user**
2. User name: `vmenu-admin`
3. Click **Next**
4. Select **Attach policies directly**
5. Search and select ONLY: `AdministratorAccess`
6. Click **Next** → **Create user**
7. Create access keys for this user

⚠️ **Note**: Admin access gives full permissions. Use carefully and consider removing after deployment.

## Which Option to Choose?

- **Option 1 (Custom Policy)**: More secure, limited to what's needed
- **Option 2 (Admin Access)**: Simpler, but gives full AWS access

Let me know which option you prefer!
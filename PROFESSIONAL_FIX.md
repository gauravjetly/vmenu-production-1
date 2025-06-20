# Professional Frontend Fix - Complete Solution

## Root Cause Analysis
The frontend is serving only the landing page because:
1. Next.js standalone mode is not including all dynamic routes
2. The app directory structure needs proper configuration
3. Environment variables are set but pages aren't being generated correctly

## Professional Fix

### Step 1: Update Next.js Configuration
```javascript
// frontend/next.config.js
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api',
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost/ws'
  },
  // Force dynamic pages to be included
  experimental: {
    outputFileTracingIncludes: {
      '/login': ['./app/login/**/*'],
      '/register': ['./app/register/**/*'],
      '/dashboard': ['./app/dashboard/**/*'],
      '/menu-builder': ['./app/menu-builder/**/*'],
      '/menus': ['./app/menus/**/*'],
    }
  }
}
```

### Step 2: Create Production-Ready Dockerfile
```dockerfile
# frontend/Dockerfile.production
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WS_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy all necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy app directory for dynamic routes
COPY --from=builder --chown=nextjs:nodejs /app/app ./app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### Step 3: Rebuild and Deploy
```bash
cd /Users/gauravjetly/VMenu/vmenu-production/frontend

# Build with production Dockerfile
docker build -f Dockerfile.production -t vintiq-frontend-professional \
  --build-arg NEXT_PUBLIC_API_URL=https://vintiqmenus.com/api \
  --build-arg NEXT_PUBLIC_WS_URL=wss://vintiqmenus.com/ws .

# Push to ECR
docker tag vintiq-frontend-professional:latest \
  820242943945.dkr.ecr.us-east-1.amazonaws.com/vintiq-frontend:professional

docker push 820242943945.dkr.ecr.us-east-1.amazonaws.com/vintiq-frontend:professional

# Update service
aws ecs update-service \
  --cluster vintiq-cluster \
  --service vintiq-frontend-service \
  --task-definition $(aws ecs register-task-definition \
    --family vintiq-frontend-task \
    --execution-role-arn arn:aws:iam::820242943945:role/vintiq-ecs-task-execution \
    --task-role-arn arn:aws:iam::820242943945:role/vintiq-ecs-task \
    --network-mode awsvpc \
    --requires-compatibilities FARGATE \
    --cpu 512 \
    --memory 1024 \
    --container-definitions '[{
      "name": "frontend",
      "image": "820242943945.dkr.ecr.us-east-1.amazonaws.com/vintiq-frontend:professional",
      "essential": true,
      "portMappings": [{"containerPort": 3000, "protocol": "tcp"}],
      "environment": [
        {"name": "NODE_ENV", "value": "production"},
        {"name": "PORT", "value": "3000"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/vintiq-frontend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "frontend"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }]' \
    --query 'taskDefinition.taskDefinitionArn' \
    --output text --region us-east-1) \
  --force-new-deployment \
  --region us-east-1
```

## Expected Results
- Full application with all routes accessible
- Professional UI with proper styling
- Login/Register pages working
- Dashboard and menu builder functional
- API connections established
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY lerna.json ./
COPY tsconfig.json ./

# Copy package directories
COPY packages/shared/package*.json ./packages/shared/
COPY packages/backend/package*.json ./packages/backend/

# Install dependencies
RUN npm ci
RUN npm run bootstrap

# Copy source code
COPY packages/shared ./packages/shared
COPY packages/backend ./packages/backend

# Build shared package first, then backend
RUN npm run build --workspace=@tv-menu-designer/shared
RUN npm run build --workspace=@tv-menu-designer/backend

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
COPY lerna.json ./

# Copy package.json files
COPY packages/shared/package*.json ./packages/shared/
COPY packages/backend/package*.json ./packages/backend/

# Install production dependencies
RUN npm ci --production
RUN npm run bootstrap -- --production

# Copy built files from builder
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/backend/dist ./packages/backend/dist
COPY --from=builder /app/packages/backend/migrations ./packages/backend/migrations
COPY --from=builder /app/packages/backend/knexfile.js ./packages/backend/knexfile.js

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Create directories for uploads and logs
RUN mkdir -p uploads logs
RUN chown -R nodejs:nodejs uploads logs

# Switch to non-root user
USER nodejs

EXPOSE 3000

# Start the backend
CMD ["node", "packages/backend/dist/index.js"]
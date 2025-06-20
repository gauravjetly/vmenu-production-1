# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Build arguments
ARG VITE_API_URL
ARG VITE_WS_URL

# Copy package files
COPY package*.json ./
COPY lerna.json ./
COPY tsconfig.json ./

# Copy package directories
COPY packages/shared/package*.json ./packages/shared/
COPY packages/designer/package*.json ./packages/designer/

# Install dependencies
RUN npm ci
RUN npm run bootstrap

# Copy source code
COPY packages/shared ./packages/shared
COPY packages/designer ./packages/designer

# Build shared package first, then designer
RUN npm run build --workspace=@tv-menu-designer/shared
RUN cd packages/designer && npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/packages/designer/dist /usr/share/nginx/html

# Copy nginx configuration
COPY infrastructure/nginx/designer.conf /etc/nginx/conf.d/default.conf

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
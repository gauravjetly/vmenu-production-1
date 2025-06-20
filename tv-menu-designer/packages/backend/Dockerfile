FROM node:20-alpine

# Install dependencies for sharp
RUN apk add --no-cache python3 make g++ cairo-dev jpeg-dev pango-dev giflib-dev

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY lerna.json ./
COPY tsconfig.json ./

# Copy shared package files
COPY packages/shared/package*.json ./packages/shared/

# Copy backend package files
COPY packages/backend/package*.json ./packages/backend/

# Install all dependencies
RUN npm ci

# Copy shared source files
COPY packages/shared ./packages/shared

# Copy backend source files
COPY packages/backend ./packages/backend

# Build shared package
WORKDIR /app/packages/shared
RUN npm run build

# Build backend
WORKDIR /app/packages/backend
RUN npm run build

WORKDIR /app

EXPOSE 3003

CMD ["npm", "run", "dev", "-w", "@tv-menu-designer/backend"]
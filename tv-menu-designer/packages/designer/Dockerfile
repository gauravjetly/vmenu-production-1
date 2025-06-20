FROM node:20-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY lerna.json ./
COPY tsconfig.json ./

# Copy shared package files
COPY packages/shared/package*.json ./packages/shared/

# Copy designer package files
COPY packages/designer/package*.json ./packages/designer/

# Install all dependencies
RUN npm ci

# Copy shared source files
COPY packages/shared ./packages/shared

# Copy designer source files
COPY packages/designer ./packages/designer

# Build shared package
WORKDIR /app/packages/shared
RUN npm run build

WORKDIR /app

EXPOSE 3002

CMD ["npm", "run", "dev", "-w", "@tv-menu-designer/designer"]
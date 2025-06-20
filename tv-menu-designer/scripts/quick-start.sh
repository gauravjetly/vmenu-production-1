#!/bin/bash

# Quick Start Script for Development

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}TV Menu Designer - Quick Start${NC}"
echo "================================"

# Check if .env exists
if [ ! -f "packages/backend/.env" ]; then
    echo -e "${YELLOW}Creating .env file from example...${NC}"
    cp packages/backend/.env.example packages/backend/.env
    echo "Please edit packages/backend/.env with your configuration"
fi

# Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
npm install
npm run bootstrap

# Start Docker services
echo -e "${GREEN}Starting Docker services...${NC}"
cd infrastructure/docker
docker-compose up -d postgres redis

# Wait for services
echo -e "${YELLOW}Waiting for services to start...${NC}"
sleep 5

# Run migrations
echo -e "${GREEN}Running database migrations...${NC}"
cd ../../packages/backend
npm run migrate

# Start development servers
echo -e "${GREEN}Starting development servers...${NC}"
cd ../..
npm run dev

echo -e "${GREEN}Quick start completed!${NC}"
echo "Services available at:"
echo "  - Designer: http://localhost:3001"
echo "  - API: http://localhost:3000"
echo ""
echo "Default login: demo@tvmenudesigner.com / demo123456"
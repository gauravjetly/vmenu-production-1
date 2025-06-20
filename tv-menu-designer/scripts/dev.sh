#!/bin/bash

# Development script to run all services

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Starting TV Menu Designer Development Environment${NC}"
echo "================================================="

# Check if Docker services are running
echo -e "${YELLOW}Checking Docker services...${NC}"
if ! docker ps | grep -q tv-menu-postgres; then
    echo "Starting PostgreSQL..."
    cd infrastructure/docker
    docker-compose up -d postgres redis
    cd ../..
    sleep 5
fi

# Run migrations
echo -e "${YELLOW}Running database migrations...${NC}"
cd packages/backend
npm run migrate
cd ../..

# Start all services
echo -e "${GREEN}Starting all services...${NC}"
echo "Backend: http://localhost:3000"
echo "Designer: http://localhost:3001"
echo "API Docs: http://localhost:3000/api-docs"
echo ""
echo "Default login: demo@tvmenudesigner.com / demo123456"
echo ""

# Run all services
npm run dev
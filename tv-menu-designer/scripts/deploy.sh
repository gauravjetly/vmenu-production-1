#!/bin/bash

# TV Menu Designer Deployment Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js >= 20.0.0"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install npm >= 10.0.0"
        exit 1
    fi
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker"
        exit 1
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose"
        exit 1
    fi
    
    log_info "All prerequisites are met!"
}

# Build application
build_application() {
    log_info "Building application..."
    
    # Install dependencies
    log_info "Installing dependencies..."
    npm install
    npm run bootstrap
    
    # Build packages
    log_info "Building packages..."
    npm run build
    
    log_info "Application built successfully!"
}

# Deploy with Docker
deploy_docker() {
    log_info "Deploying with Docker..."
    
    # Stop existing containers
    log_info "Stopping existing containers..."
    cd infrastructure/docker
    docker-compose down
    
    # Build and start containers
    log_info "Building and starting containers..."
    docker-compose up -d --build
    
    # Wait for services to be healthy
    log_info "Waiting for services to be healthy..."
    sleep 10
    
    # Run database migrations
    log_info "Running database migrations..."
    docker-compose exec backend sh -c "cd packages/backend && npm run migrate"
    
    log_info "Deployment completed successfully!"
    log_info "Services are running at:"
    log_info "  - Designer: http://localhost:3001"
    log_info "  - API: http://localhost:3000"
    log_info "  - Main App: http://localhost"
}

# Main execution
main() {
    log_info "Starting TV Menu Designer deployment..."
    
    # Check prerequisites
    check_prerequisites
    
    # Build application
    build_application
    
    # Deploy with Docker
    deploy_docker
    
    log_info "Deployment completed! 🚀"
}

# Run main function
main
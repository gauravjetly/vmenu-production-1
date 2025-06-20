#!/bin/bash

# TV Menu Designer Development Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[STATUS]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to check if a service is running
check_service() {
    local service=$1
    local port=$2
    
    if nc -z localhost $port 2>/dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to wait for a service
wait_for_service() {
    local service=$1
    local port=$2
    local max_attempts=30
    local attempt=1
    
    print_status "Waiting for $service to be ready..."
    
    while ! check_service $service $port; do
        if [ $attempt -eq $max_attempts ]; then
            print_error "$service failed to start"
            return 1
        fi
        
        echo -n "."
        sleep 1
        attempt=$((attempt + 1))
    done
    
    echo ""
    print_success "$service is ready"
    return 0
}

# Parse command line arguments
COMMAND=${1:-help}

case $COMMAND in
    start)
        print_status "Starting TV Menu Designer development environment..."
        
        # Start Docker services
        print_status "Starting PostgreSQL and Redis..."
        docker-compose up -d postgres redis
        
        # Wait for services
        wait_for_service "PostgreSQL" 5432
        wait_for_service "Redis" 6379
        
        # Run database migrations
        print_status "Running database migrations..."
        cd packages/backend && npm run migrate && cd ../..
        
        # Start backend
        print_status "Starting backend service..."
        cd packages/backend && npm run dev > ../../logs/backend.log 2>&1 &
        BACKEND_PID=$!
        cd ../..
        
        # Wait for backend
        sleep 3
        wait_for_service "Backend API" 3003
        
        # Start frontend
        print_status "Starting frontend service..."
        cd packages/designer && npm run dev > ../../logs/designer.log 2>&1 &
        FRONTEND_PID=$!
        cd ../..
        
        # Wait for frontend
        sleep 3
        wait_for_service "Frontend" 5173
        
        # Save PIDs
        echo $BACKEND_PID > .backend.pid
        echo $FRONTEND_PID > .frontend.pid
        
        print_success "All services started successfully!"
        echo ""
        echo "Services running at:"
        echo "  - Frontend: http://localhost:5173"
        echo "  - Backend API: http://localhost:3003"
        echo "  - PostgreSQL: localhost:5432"
        echo "  - Redis: localhost:6379"
        echo ""
        echo "Logs available at:"
        echo "  - Backend: logs/backend.log"
        echo "  - Frontend: logs/designer.log"
        echo ""
        echo "Use './dev.sh stop' to stop all services"
        ;;
        
    stop)
        print_status "Stopping TV Menu Designer development environment..."
        
        # Stop Node.js services
        if [ -f .backend.pid ]; then
            kill $(cat .backend.pid) 2>/dev/null || true
            rm .backend.pid
        fi
        
        if [ -f .frontend.pid ]; then
            kill $(cat .frontend.pid) 2>/dev/null || true
            rm .frontend.pid
        fi
        
        # Stop Docker services
        docker-compose down
        
        print_success "All services stopped"
        ;;
        
    restart)
        $0 stop
        sleep 2
        $0 start
        ;;
        
    status)
        echo "Service Status:"
        echo ""
        
        if check_service "Frontend" 5173; then
            echo -e "Frontend: ${GREEN}Running${NC} (http://localhost:5173)"
        else
            echo -e "Frontend: ${RED}Not running${NC}"
        fi
        
        if check_service "Backend API" 3003; then
            echo -e "Backend API: ${GREEN}Running${NC} (http://localhost:3003)"
        else
            echo -e "Backend API: ${RED}Not running${NC}"
        fi
        
        if check_service "PostgreSQL" 5432; then
            echo -e "PostgreSQL: ${GREEN}Running${NC} (localhost:5432)"
        else
            echo -e "PostgreSQL: ${RED}Not running${NC}"
        fi
        
        if check_service "Redis" 6379; then
            echo -e "Redis: ${GREEN}Running${NC} (localhost:6379)"
        else
            echo -e "Redis: ${RED}Not running${NC}"
        fi
        
        echo ""
        docker ps --filter "name=tv_menu"
        ;;
        
    logs)
        SERVICE=${2:-all}
        
        case $SERVICE in
            backend)
                tail -f logs/backend.log
                ;;
            frontend|designer)
                tail -f logs/designer.log
                ;;
            postgres)
                docker logs -f tv_menu_postgres
                ;;
            redis)
                docker logs -f tv_menu_redis
                ;;
            all)
                # Use multitail if available, otherwise show instructions
                if command -v multitail &> /dev/null; then
                    multitail logs/backend.log logs/designer.log
                else
                    echo "Install multitail to view all logs simultaneously:"
                    echo "  brew install multitail"
                    echo ""
                    echo "Or view individual logs:"
                    echo "  ./dev.sh logs backend"
                    echo "  ./dev.sh logs frontend"
                    echo "  ./dev.sh logs postgres"
                    echo "  ./dev.sh logs redis"
                fi
                ;;
            *)
                print_error "Unknown service: $SERVICE"
                echo "Available services: backend, frontend, postgres, redis, all"
                ;;
        esac
        ;;
        
    docker)
        print_status "Starting all services with Docker Compose..."
        docker-compose -f docker-compose.dev.yml up
        ;;
        
    help|*)
        echo "TV Menu Designer Development Script"
        echo ""
        echo "Usage: ./dev.sh [command] [options]"
        echo ""
        echo "Commands:"
        echo "  start     - Start all services (Docker for DB/Redis, local for apps)"
        echo "  stop      - Stop all services"
        echo "  restart   - Restart all services"
        echo "  status    - Show status of all services"
        echo "  logs      - View logs (backend|frontend|postgres|redis|all)"
        echo "  docker    - Start all services with Docker Compose"
        echo "  help      - Show this help message"
        echo ""
        echo "Examples:"
        echo "  ./dev.sh start           # Start development environment"
        echo "  ./dev.sh logs backend    # View backend logs"
        echo "  ./dev.sh status          # Check service status"
        ;;
esac
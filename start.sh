#!/bin/bash
set -e

echo "=========================================="
echo "Wanderlust Travel - Setup Script"
echo "=========================================="

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check Docker
if ! command -v docker &> /dev/null; then
    error "Docker is not installed."
    exit 1
fi

# Copy .env if not exists
if [ ! -f .env ]; then
    warn ".env not found. Creating from .env.example..."
    cp .env.example .env
fi

# Create storage directories
info "Creating storage directories..."
mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views
mkdir -p storage/app/public storage/app/private
mkdir -p bootstrap/cache

# Build and start containers
info "Building Docker containers..."
docker compose build --no-cache

info "Starting services..."
docker compose up -d

# Wait for database
info "Waiting for PostgreSQL..."
for i in {1..30}; do
    docker compose exec -T postgres pg_isready -U travel_user -d travel_booking &> /dev/null && break
    echo -n "."
    sleep 2
done

# Run migrations
info "Running migrations..."
docker compose exec -T app php artisan migrate --force --seed || true

# Create storage link
docker compose exec -T app php artisan storage:link || true

echo ""
echo "=========================================="
echo -e "${GREEN}Setup complete!${NC}"
echo "=========================================="
echo ""
echo "Services:"
echo "  App:      http://localhost:8080"
echo "  Mailpit:  http://localhost:8025"
echo "  Postgres: localhost:5432"
echo "  Redis:    localhost:6379"
echo ""
echo "Default credentials:"
echo "  Admin:    admin@travel.com / password"
echo ""
echo "To start:  docker compose up -d"
echo "To stop:   docker compose down"
echo "To logs:   docker compose logs -f"

#!/bin/bash

set -e

echo "=== Travel Booking Deployment Script ==="
echo "Starting deployment at $(date)"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Navigate to project directory
cd "$(dirname "$0")"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
    else
        echo "Warning: .env.example not found. Please create .env manually."
    fi
fi

# Build and start containers
echo "Building Docker containers..."
docker-compose build --no-cache app

echo "Starting services..."
docker-compose up -d

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
for i in {1..30}; do
    if docker-compose exec -T mysql mysqladmin ping -h localhost -u root -proot_password &> /dev/null; then
        echo "MySQL is ready!"
        break
    fi
    echo "Waiting for MySQL... ($i/30)"
    sleep 2
done

# Run migrations
echo "Running database migrations..."
docker-compose exec -T app php artisan migrate --force

# Clear and rebuild caches
echo "Optimizing application..."
docker-compose exec -T app php artisan config:cache
docker-compose exec -T app php artisan route:cache
docker-compose exec -T app php artisan view:cache

# Restart queue workers
echo "Restarting queue workers..."
docker-compose exec -T app php artisan queue:restart

echo ""
echo "=== Deployment Complete! ==="
echo "Application should be running at http://localhost:8080"
echo ""
echo "Useful commands:"
echo "  docker-compose logs -f        # View logs"
echo "  docker-compose exec app bash   # Shell into app container"
echo "  docker-compose down            # Stop services"
echo "  docker-compose up -d           # Start services"

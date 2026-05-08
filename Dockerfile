# ===========================================
# Travel Booking - Laravel 12 Production
# PHP 8.4-FPM + Laravel Octane + Swoole
# ===========================================

FROM debian:bookworm-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    apt-transport-https \
    lsb-release \
    wget \
    gnupg2

# Add Sury PHP repository for PHP 8.4
RUN wget -qO /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg \
    && echo "deb https://packages.sury.org/php/ bookworm main" > /etc/apt/sources.list.d/php.list \
    && apt-get update

# Install system dependencies
RUN apt-get update && apt-get install -y \
    # Core PHP + Extensions
    php8.4-cli \
    php8.4-fpm \
    php8.4-bcmath \
    php8.4-curl \
    php8.4-dom \
    php8.4-fileinfo \
    php8.4-gd \
    php8.4-intl \
    php8.4-mbstring \
    php8.4-opcache \
    php8.4-pgsql \
    php8.4-redis \
    php8.4-sqlite3 \
    php8.4-xml \
    php8.4-zip \
    php8.4-exif \
    php8.4-ftp \
    php8.4-iconv \
    php8.4-imagick \
    php8.4-swoole \
    # Extra tools
    git \
    curl \
    wget \
    zip \
    unzip \
    postgresql-client \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    supervisor \
    nginx \
    cron \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set PHP configurations
RUN mv /etc/php/8.4/fpm/php.ini /etc/php/8.4/fpm/php.ini.bak \
    && mv /etc/php/8.4/cli/php.ini /etc/php/8.4/cli/php.ini.bak

# PHP-FPM configuration optimized for Laravel
RUN echo "[PHP]" > /etc/php/8.4/fpm/php.ini \
    && echo "memory_limit = 256M" >> /etc/php/8.4/fpm/php.ini \
    && echo "upload_max_filesize = 20M" >> /etc/php/8.4/fpm/php.ini \
    && echo "post_max_size = 20M" >> /etc/php/8.4/fpm/php.ini \
    && echo "max_execution_time = 60" >> /etc/php/8.4/fpm/php.ini \
    && echo "opcache.enable = 1" >> /etc/php/8.4/fpm/php.ini \
    && echo "opcache.memory_consumption = 128" >> /etc/php/8.4/fpm/php.ini \
    && echo "opcache.interned_strings_buffer = 64" >> /etc/php/8.4/fpm/php.ini \
    && echo "opcache.max_accelerated_files = 10000" >> /etc/php/8.4/fpm/php.ini \
    && echo "opcache.validate_timestamps = 0" >> /etc/php/8.4/fpm/php.ini \
    && echo "realpath_cache_size = 4096K" >> /etc/php/8.4/fpm/php.ini \
    && echo "realpath_cache_ttl = 600" >> /etc/php/8.4/fpm/php.ini \
    && cat /etc/php/8.4/fpm/php.ini.bak >> /etc/php/8.4/fpm/php.ini \
    && cp /etc/php/8.4/fpm/php.ini /etc/php/8.4/cli/php.ini

# PHP-FPM pool configuration
RUN echo "[www]" > /etc/php/8.4/fpm/pool.d/www.conf \
    && echo "user = www-data" >> /etc/php/8.4/fpm/pool.d/www.conf \
    && echo "group = www-data" >> /etc/php/8.4/fpm/pool.d/www.conf \
    && echo "listen = 127.0.0.1:9000" >> /etc/php/8.4/fpm/pool.d/www.conf \
    && echo "pm = dynamic" >> /etc/php/8.4/fpm/pool.d/www.conf \
    && echo "pm.max_children = 50" >> /etc/php/8.4/fpm/pool.d/www.conf \
    && echo "pm.start_servers = 10" >> /etc/php/8.4/fpm/pool.d/www.conf \
    && echo "pm.min_spare_servers = 5" >> /etc/php/8.4/fpm/pool.d/www.conf \
    && echo "pm.max_spare_servers = 20" >> /etc/php/8.4/fpm/pool.d/www.conf \
    && echo "pm.max_requests = 500" >> /etc/php/8.4/fpm/pool.d/www.conf \
    && echo "catch_workers_output = yes" >> /etc/php/8.4/fpm/pool.d/www.conf \
    && echo "php_admin_value[error_log] = /var/log/php8.4-fpm.log" >> /etc/php/8.4/fpm/pool.d/www.conf

# Nginx configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Working directory
WORKDIR /var/www/html

# Copy application files (these will be mounted from host)
COPY . .

# Create required directories
RUN mkdir -p storage/logs storage/framework/{cache,sessions,views} storage/app/public \
    bootstrap/cache public \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Health check
RUN echo "<?php http_response_code(200); echo 'ok';" > /var/www/html/health.php

# Expose port
EXPOSE 80

# Start supervisor (manages php-fpm, nginx, cron)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]

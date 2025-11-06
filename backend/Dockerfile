FROM php:8.2-fpm

# Arguments defined in docker-compose.yml
ARG user=www-data
ARG uid=1000

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip xml

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure existing www-data user
RUN usermod -u $uid www-data && \
    groupmod -g $uid www-data && \
    mkdir -p /home/$user/.composer && \
    chown -R www-data:www-data /home/$user

# Set working directory
WORKDIR /var/www/laravel

# Copy existing application directory contents
COPY ./laravel /var/www/laravel

# Copy existing application directory permissions
COPY --chown=www-data:www-data ./laravel /var/www/laravel

# Change current user to www-data
USER www-data

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]


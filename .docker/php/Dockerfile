FROM php:7.4-fpm

RUN apt-get update && apt-get install -y \
    git zip unzip pkg-config libpq-dev libxml2-dev libxslt1-dev libzip-dev libpng-dev libonig-dev libfreetype6-dev libjpeg62-turbo-dev libxml2-dev \
    && docker-php-ext-install -j$(nproc) bcmath pdo_mysql mysqli gd zip exif mbstring pcntl sockets xsl \
    && apt-get clean && apt-get autoclean

# configuration
ADD ./php.ini /usr/local/etc/php/conf.d/php.ini
ADD ./fpm.conf /usr/local/etc/pool.d/fpm.conf

RUN usermod -u 1000 www-data

WORKDIR /var/www/project

EXPOSE 9000

FROM nginx:1.18

ADD nginx.conf /etc/nginx/
ADD upstream.conf /etc/nginx/conf.d/

ADD default.conf /etc/nginx/conf.d/

RUN usermod -u 1000 www-data

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80

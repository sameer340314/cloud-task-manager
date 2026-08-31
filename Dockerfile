FROM nginx:alpine

COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx /tmp

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

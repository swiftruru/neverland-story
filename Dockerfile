# syntax=docker/dockerfile:1

## Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build static export
COPY . .
RUN npm run build

## Serve stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy exported site
COPY --from=builder /app/out ./

# Basic config: serve pre-rendered files with gzip if available
RUN printf 'server {\\n  listen 80;\\n  server_name _;\\n  root /usr/share/nginx/html;\\n  include /etc/nginx/mime.types;\\n  gzip on;\\n  gzip_types text/plain text/css application/javascript application/json image/svg+xml;\\n  location / {\\n    try_files $uri $uri/ =404;\\n  }\\n}\\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

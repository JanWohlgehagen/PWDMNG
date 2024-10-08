# Stage 1: Build Angular app
FROM node:20-alpine as angular
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve Angular app with Caddy
FROM caddy:alpine

# Copy Caddyfile (configuration for SPA routing)
COPY Caddyfile /etc/caddy/Caddyfile

# Copy Angular build from previous stage
COPY --from=angular /app/dist/frontend/browser /usr/share/caddy

EXPOSE 80

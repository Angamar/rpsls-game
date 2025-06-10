# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.1.1 --activate

COPY . .

WORKDIR /app/packages/ui

RUN yarn install --immutable
RUN yarn build

# Nginx stage
FROM nginx:alpine

# Copy Nginx config
COPY packages/ui/nginx.conf /etc/nginx/nginx.conf

# Copy built app
COPY --from=builder /app/packages/ui/dist /usr/share/nginx/html

EXPOSE 80

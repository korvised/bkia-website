# -----------------------------
# Stage 1: Build with pnpm
# -----------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of your project
COPY . .

# Copy the .env file created by GitHub Actions (if exists)
# It will be available only in CI, and safely ignored locally
COPY .env.prod.local .env

# Build Vite app
RUN pnpm run build

# -----------------------------
# Stage 2: Nginx production server
# -----------------------------
FROM nginx:alpine AS production

# Set timezone
ENV TZ=Asia/Vientiane

# Nginx working directory
WORKDIR /usr/share/nginx/html

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Nginx port
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]

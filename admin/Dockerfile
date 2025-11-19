# -----------------------------
# Stage 1: Build with pnpm
# -----------------------------
FROM node:22-alpine AS builder

# Enable pnpm via corepack (Node 22+)
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependency files first (for cache)
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including devDeps)
RUN pnpm install --frozen-lockfile

# Copy the rest of the project
COPY . .

# Optionally copy CI-generated env file into .env (if present)
# Assumes CI creates .env.production.local BEFORE docker build
RUN if [ -f .env.production.local ]; then cp .env.production.local .env; fi

# Build Vite app (make sure Vite is configured with base: '/admin/')
RUN pnpm run build

# -----------------------------
# Stage 2: Nginx production server
# -----------------------------
FROM nginx:1.24-alpine AS production

ENV TZ=Asia/Vientiane

WORKDIR /usr/share/nginx/html

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html/admin

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx listens on port 80 inside the container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

#
# 🧑‍💻 Development
#
FROM node:22-alpine AS dev

# Enable pnpm via corepack (recommended for Node 22)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Create app folder
WORKDIR /app

# Copy only dependency files first (better cache)
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including devDeps)
RUN pnpm install

# Copy the rest of the source code
COPY --chown=node:node . .

# Use non-root user that already exists in the image
USER node


#
# 🏡 Production Build
#
FROM node:22-alpine AS build

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Reuse node_modules from dev stage
COPY --from=dev /app/node_modules ./node_modules

# Copy source code
COPY --chown=node:node . .

# Build NestJS app
RUN pnpm build

# Install only production dependencies & clean up
RUN pnpm install --prod --frozen-lockfile && \
    pnpm store prune && \
    rm -rf /app/src /app/test /app/node_modules/.cache

# Use non-root user
USER node


#
# 🚀 Production Server
#
FROM node:22-alpine AS prod

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# - tzdata        → correct timezone
# - postgresql-client → pg_dump / psql for backup & restore (connects to the
#                       postgres container over the Docker network)
# - su-exec       → lightweight privilege-drop used in entrypoint.sh
RUN apk add --no-cache tzdata postgresql-client su-exec
ENV TZ=Asia/Vientiane

# Copy built app and production deps only
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules

# Entrypoint: runs as root to fix bind-mount directory ownership,
# then drops to the node user via su-exec before starting the app.
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# NOTE: intentionally no USER node here — entrypoint.sh handles the privilege drop.
EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "dist/main.js"]

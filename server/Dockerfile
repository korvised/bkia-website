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

# Timezone setup
RUN apk add --no-cache tzdata
ENV TZ=Asia/Vientiane

# Copy built app and production deps only
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules

# Run as non-root
USER node

# Expose NestJS port
EXPOSE 8080

# Start the app
CMD ["node", "dist/main.js"]

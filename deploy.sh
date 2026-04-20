#!/bin/bash
set -e

echo "🚀 Pulling latest images..."
docker compose pull server admin web

echo "🔄 Restarting services..."
docker compose up -d --remove-orphans

echo "🧹 Cleaning up old images..."
docker image prune -f

echo "✅ Deploy complete!"
docker compose ps

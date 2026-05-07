#!/bin/bash
set -e

echo "🚀 Pulling latest UAT images..."
docker compose -f docker-compose-uat.yml pull

echo "🔄 Restarting UAT services..."
docker compose -f docker-compose-uat.yml up -d --remove-orphans

echo "🧹 Cleaning up old images..."
docker image prune -f

echo "✅ UAT deploy complete!"
docker compose -f docker-compose-uat.yml ps

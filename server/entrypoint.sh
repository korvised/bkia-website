#!/bin/sh
set -e

# Ensure volume-mounted directories are writable by the node user.
# Docker creates bind-mount directories on the host as root; this step
# takes ownership before dropping privileges.
mkdir -p /app/uploads /app/backups
chown -R node:node /app/uploads /app/backups

# Drop to the node user and exec the application.
exec su-exec node "$@"

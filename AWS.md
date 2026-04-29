```shell
# Remote to EC2 ubuntu server
ssh -i bkia-website.pem ubuntu@43.208.237.238

# HTTPS with Credential Caching (Not recommended for EC2)
git config --global credential.helper store

# Check disk space usage
df -h

# 1. Pull the new image from the registry
docker compose pull web

# 2. Update ONLY the web service (background mode)
docker compose up -d --no-deps web
```

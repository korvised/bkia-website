```shell
# Remote to EC2 ubuntu server
ssh -i bkia-website.pem ubuntu@43.209.1.124

# HTTPS with Credential Caching (Not recommended for EC2)
git config --global credential.helper store

# Check disk space usage
df -h
```

# Install SSL
```shell
# Issue the certificate (no custom entrypoint needed)
docker compose run --rm --entrypoint "" certbot certbot certonly \
  --webroot -w /var/www/certbot \
  -d 43-209-1-124.sslip.io \
  --email itbkia@gmail.com --agree-tos --no-eff-email
```

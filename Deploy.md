# Install SSL
```shell
# Issue the certificate (no custom entrypoint needed)
docker compose run --rm --entrypoint "" certbot certbot certonly \
  --webroot -w /var/www/certbot \
  -d 43-209-1-124.sslip.io \
  --email itbkia@gmail.com --agree-tos --no-eff-email
```

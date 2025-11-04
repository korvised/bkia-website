```shell
# Create migration for generate table ( migration ) in database
pnpm run migration:create db/migrations/initial
# Generate migration
pnpm run migration:generate db/migrations/training_v1
# Run migration
pnpm run migration:run
# Revert migration
pnpm run migration:revert

```

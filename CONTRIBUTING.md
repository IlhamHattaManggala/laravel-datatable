# Contributing to Laravel Data Table

Thank you for considering contributing to **Laravel Data Table**!

## Development Workflow

1. Fork and clone the repository.
2. Install PHP and Node dependencies:
   ```bash
   composer install
   npm install
   ```
3. Run the test suite before submitting pull requests:
   ```bash
   vendor/bin/pest
   vendor/bin/phpstan analyse src --memory-limit=512M
   npx tsc --noEmit
   npm run build
   ```

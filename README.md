# Development

## Frontend 
For frontend development using Vue, you need to navigate to app/frontend and run `npm run serve` to start the vue compiler.
# After Deployment

## Configure your instance

You should configure your instance to be able to load models and reference assets properly.
1) Change your site's public url in the admin: Admin -> Sites -> Default entry (You should use the root URL of your installation without a finishing '/')



## Environment Variables
These should be defined inside a .env-prod file, in the same folder as the Dockerfile.

Needed variables:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_STORAGE_BUCKET_NAME

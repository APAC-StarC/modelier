<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.

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

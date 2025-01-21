# TekBetter - A better intranet for Epitech

## Description

TekBetter is a project that aims to create a better interface who rassemble all the tools that Epitech students use in
their daily life.

## Environment variables

| Variable             | Description                                                                | Default value |
|----------------------|----------------------------------------------------------------------------|---------------|
| PORT                 | Port where the server will listen                                          | 3000          |
| MONGO_HOST           | The mongodb database hostname.                                             | mongo         |
| MONGO_PORT           | The mongodb database port.                                                 | 27017         |
| MONGO_DB             | The mongodb database name.                                                 | tekbetter     |
| REDIS_HOST           | The redis database hostname.                                               | redis         |
| REDIS_PORT           | The redis database port.                                                   | 6379          |
| REDIS_PASSWORD       | The redis database password.                                               |               |
| REDIS_DB             | The redis database number.                                                 | 0             |
| JWT_SECRET           | The secret key used to sign the JWT token.                                 |               |
| AES_KEY              | The key used to encrypt sensible data in database. 64 bytes long required. |               |
| SCRAPERS_CONFIG_FILE | The path to the scrapers configuration file. Optional                      | scrapers.json |
| APP_URL              | The app url used to send register links by email.                          |               |

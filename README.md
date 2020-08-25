# movie-watchlist

## How to run project
**Environment variables**
- For Api
  - DB_PORT: 5432
  - DB_USERNAME: postgres
  - DB_PASSWORD: postgres
  - DB_NAME: movie-watchlist
  - SYNC: "true"
  - JWT_SECRET: movie-watchlist
  - JWT_EXPIRE_TIME: 3600
  - MOVIEDB_TOKEN:
For MOVIEDB_TOKEN please create an account at https://www.themoviedb.org/?language=en-US and get a private API Token

Edit the docker-compose file and add the MOVIEDB_TOKEN variable

Run docker-compose up with docker installed


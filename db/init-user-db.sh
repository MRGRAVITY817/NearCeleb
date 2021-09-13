#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USERNAME" --dbname "$POSTGRES_DATABASE" <<-EOSQL
    CREATE USER tripboi;
    CREATE DATABASE near-celeb;
    GRANT ALL PRIVILEGES ON DATABASE near-celeb TO tripboi;
EOSQL

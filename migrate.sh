#!/bin/bash
FILE="alembic.ini"
if [[ ! -f "$FILE" ]]; then
    echo "Error: unknown file $FILE."
    exit 1
fi

# Remove every row that begins with "sqlalchemy.url"
sed -i '/^sqlalchemy\.url/d' "$FILE"

# Load PostgreSQL credentials from environment variables or .env file
if [[ -f .env ]]; then
    source .env
fi

if [[ -z "$POSTGRES_USER" ]]; then
    echo "Error: POSTGRES_USER is not set."
    exit 1
fi

if [[ -z "$POSTGRES_PASSWORD" ]]; then
    echo "Error: POSTGRES_PASSWORD is not set."
    exit 1
fi

if [[ -z "$POSTGRES_DB" ]]; then
    echo "Error: POSTGRES_DB is not set."
    exit 1
fi

if [[ -z "$POSTGRES_HOST" ]]; then
    echo "Error: POSTGRES_HOST is not set."
    exit 1
fi

if [[ -z "$POSTGRES_PORT" ]]; then
    echo "Error: POSTGRES_PORT is not set."
    exit 1
fi

# Add the new configuration value under the [alembic] section
sed -i '/^\[alembic\]/a sqlalchemy.url = postgresql://'"$POSTGRES_USER"':'"$POSTGRES_PASSWORD"'@'"$POSTGRES_HOST"':'"$POSTGRES_PORT"'/'"$POSTGRES_DB" "$FILE"

alembic upgrade head
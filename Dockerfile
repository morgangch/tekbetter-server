FROM nikolaik/python-nodejs:python3.13-nodejs23

# Open Container Initiative (OCI) labels
LABEL org.opencontainers.image.title="TekBetter Server"
LABEL org.opencontainers.image.description="TekBetter API Server with Flask"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.authors="eliaute,maelapp"

# Custom labels
LABEL app.component="api-server"
LABEL app.dependencies="mongodb,redis"

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir gunicorn

WORKDIR /app/web
COPY web/package.json web/package-lock.json ./
RUN npm install
COPY web ./
RUN npm run build

# Déplacer les fichiers build React
WORKDIR /app
RUN mkdir -p /app/dashboard_build && \
    mv /app/web/build/* /app/dashboard_build
# Delete the web directory
RUN rm -rf /app/web

# Default environment variables
ENV PYTHONPATH=/app \
    PYTHONUNBUFFERED=1 \
    FLASK_ENV=production \
    FLASK_DEBUG=0 \
    DASHBOARD_BUILD_PATH=/app/dashboard_build \
    SCRAPERS_CONFIG_FILE=/app/scrapers.json

RUN useradd -m -s /bin/bash appuser && \
    chown -R appuser:appuser /app
USER appuser

COPY --chown=appuser:appuser app /app/app
COPY --chown=appuser:appuser gunicorn.conf.py /app/

EXPOSE 8080

CMD ["gunicorn", "--config", "gunicorn.conf.py", "app.main:create_app()"]
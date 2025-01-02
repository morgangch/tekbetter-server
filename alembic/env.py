from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# Importer les modèles de l'application
from app import db, import_models

import_models()

config = context.config
fileConfig(config.config_file_name)
target_metadata = db.metadata  # Utilise les métadonnées SQLAlchemy de l'application

def run_migrations_online():
    connectable = engine_from_config(config.get_section(config.config_ini_section), prefix='sqlalchemy.', poolclass=pool.NullPool)
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

run_migrations_online()

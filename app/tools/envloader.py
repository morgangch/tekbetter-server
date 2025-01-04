import os

from dotenv import load_dotenv

from app.tools.teklogger import log_debug, log_warning

default_values = {
    "PORT": "3000",
    "POSTGRES_USER": "postgres",
    "POSTGRES_HOST": "postgres",
    "POSTGRES_DB": "tekbetter",
    "POSTGRES_PASSWORD": "postgres",
    "POSTGRES_PORT": "5432",
    "JWT_SECRET": None,
    "SHOW_BROWSER": "false",
    "SHOW_SQL_LOGS": "false",
    "AES_KEY": None,
}


def load_env():
    """
    Load environment variables from the .env file
    Raises an exception if a required environment variable is missing
    """

    log_debug("Loading environment variables")
    load_dotenv()
    for key, value in default_values.items():
        if os.getenv(key, None) is None:
            if value is not None:
                log_warning(f"Missing environment variable {key}, using default value: {value}")
                os.environ[key] = value
            else:
                raise Exception(f"Missing environment variable {key}")
    if len(os.getenv("AES_KEY")) != 64:
        raise Exception("AES_KEY must be 64 characters long")

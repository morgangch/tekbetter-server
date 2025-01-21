import os

from dotenv import load_dotenv

from app.tools.teklogger import log_debug, log_warning

default_values = {
    "PORT": "8080",
    "MONGO_HOST": "mongo",
    "MONGO_PORT": "27017",
    "MONGO_DB": "tekbetter",
    "REDIS_HOST": "redis",
    "REDIS_PORT": "6379",
    "REDIS_DB": "0",
    "REDIS_PASSWORD": None,
    "APP_URL": None,
    "JWT_SECRET": None,
    "AES_KEY": None,
    "SCRAPERS_CONFIG_FILE": "scrapers.json",
    "SMTP_HOST": None,
    "SMTP_PORT": 587,
    "SMTP_USER": None,
    "SMTP_PASSWORD": None,
    "ENABLE_MAILER": "false",
}


def load_env():
    """
    Load environment variables from the .env file
    Raises an exception if a required environment variable is missing
    """

    log_debug("Loading environment variables")
    load_dotenv()

    smtp_vars = ["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD"]
    if os.getenv("ENABLE_MAILER") == "true":
        for var in smtp_vars:
            if os.getenv(var) is None:
                raise Exception(f"ENABLE_MAILER is true, so {var} must be set")

    for key, value in default_values.items():
        if os.getenv(key, None) is None:
            if value is not None:
                log_warning(
                    f"Missing environment variable {key}, using default value: {value}")
                os.environ[key] = value
            else:
                raise Exception(f"Missing environment variable {key}")

    if len(os.getenv("AES_KEY")) != 64:
        raise Exception("AES_KEY must be 64 characters long")

INTRANET_LOGIN_URL = "https://login.microsoftonline.com/common/oauth2/authorize?response_type=code&client_id=e05d4149-1624-4627-a5ba-7472a39e43ab&redirect_uri=https%3A%2F%2Fintra.epitech.eu%2Fauth%2Foffice365&state=%2F"
INTRANET_SESSION_COOKIE_NAME = "user"
LOGIN_TIMEOUT = 12  # In seconds
INTRA_USERAGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"

import os

class Config:
    SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://{os.getenv("POSTGRES_DB")}:{os.getenv("POSTGRES_PASSWORD")}@{os.getenv("POSTGRES_HOST")}:{os.getenv("POSTGRES_PORT")}/{os.getenv("POSTGRES_DB")}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    if os.getenv("SHOW_SQL_LOGS") == "true":
        SQLALCHEMY_ECHO = True



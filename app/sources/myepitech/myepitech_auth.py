import json

import requests

from app.config import MYEPITECH_LOGIN_URL
from app.models.microsoft_session import MicrosoftSession
from app.tools.aes_cipher import decrypt_text

def create_myepitech_session(microsoft_session: MicrosoftSession):
    """
    Create a my.epitech.eu session using the given Microsoft cookies
    :param microsoft_cookies: Cookies from Microsoft (dict)
    :return: string token if the session is created
    """
    cookies = json.loads(decrypt_text(microsoft_session.json_cookies))["https://login.microsoftonline.com"]
    request = requests.get(MYEPITECH_LOGIN_URL, cookies=cookies)
    if request.status_code != 302:
        raise Exception("Failed to create myepitech session")
    # Get the "Location" response header
    location = request.headers["Location"]
    # Extract the token from the location
    token = location.split("id_token=")[1].split("&")[0]
    return token
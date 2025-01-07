
def create_intranet_session(microsoft_session: MicrosoftSession, antiddos_cookies: dict):
    """
    Create an intranet session using the given Microsoft cookies
    :param microsoft_cookies: Cookies from Microsoft (dict)
    :return: tuple (token, login) if the session is created
    """
    microsoft_cookies = json.loads(decrypt_text(microsoft_session.json_cookies))
    microsoft_request = requests.get(INTRANET_LOGIN_URL, cookies=microsoft_cookies)
    if microsoft_request.status_code != 302:
        raise Exception("Failed to create intranet session (microsoft rejected the cookies)")
    location = microsoft_request.headers["Location"]
    intra_request = requests.get(location, headers={"User-Agent": INTRA_USERAGENT}, cookies=antiddos_cookies)
    if intra_request.status_code != 302:
        raise Exception("Failed to create intranet session (intranet rejected the cookies)")
    # Get the "Set-Cookie" response header and extract the token
    token = intra_request.headers["Set-Cookie"].split(INTRANET_SESSION_COOKIE_NAME + "=")[1].split(";")[0]
    return token
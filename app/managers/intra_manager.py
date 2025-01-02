import requests
from requests.utils import dict_from_cookiejar, cookiejar_from_dict
from app.config import INTRANET_SESSION_COOKIE_NAME, INTRA_USERAGENT
from app.managers.selenium_manager import SeleniumManager
from app.tools.teklogger import log_debug, log_warning, log_error


class IntraManager:
    def __init__(self, selenium_manager: SeleniumManager):
        self.selenium_manager = selenium_manager

    def _gen_cookies(self, user_token):
        if not self.selenium_manager.antiddos_cookies:
            return False
        ddos_cookies = self.selenium_manager.antiddos_cookies["https://intra.epitech.eu"]
        if not ddos_cookies:
            return False
        ddos_cookies.append({
            "name": INTRANET_SESSION_COOKIE_NAME,
            "value": user_token,
            "domain": "intra.epitech.eu",
            "path": "/",
            "secure": True,
            "httpOnly": True,
            "sameSite": "None",
            "expires": None
        })
        # Convert cookies to requests format
        cookies = cookiejar_from_dict({cookie["name"]: cookie["value"] for cookie in ddos_cookies})
        return dict_from_cookiejar(cookies)

    def fetch_planning(self, token, start_date, end_date, user_name):
        try:
            log_debug("Fetching planning for user: " + user_name)
            cookies = self._gen_cookies(token)
            response = requests.get("https://intra.epitech.eu/planning/load", params={
                "start": start_date,
                "end": end_date,
                "format": "json",
            }, cookies=cookies, headers={
                "User-Agent": INTRA_USERAGENT
            })
            if response.status_code != 200:
                log_warning("Failed to fetch planning for user: " + user_name)
                return False
            return response.json()
        except Exception as e:
            log_error("Intranet fetch activity error: " + str(e))
        return False

    def fetch_activity(self, token, start_date, end_date):
        try:
            response = requests.get("https://intra.epitech.eu/module/board", params={
                "start": start_date,
                "end": end_date,
                "format": "json",
            }, cookies=self._gen_cookies(token), headers={
                "User-Agent": INTRA_USERAGENT
            })
            if response.status_code != 200:
                log_warning("Failed to fetch activity")
                return False
            return response.json()
        except Exception as e:
            log_error("Intranet fetch activity error: " + str(e))
        return False

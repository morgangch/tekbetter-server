import os
import time

import requests
from selenium.webdriver.chrome import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from app.config import INTRA_USERAGENT
from app.tools.teklogger import log_error, log_success, log_info


def generate_antiddos_cookies():
    """
    Get the anti-ddos cookies from the intranet
    :return: Anti-ddos cookies (dict) if the cookies are found, False if the cookies are not found
    """

    log_info("Generating anti-ddos cookies")

    options = webdriver.ChromeOptions()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    if os.getenv("SHOW_BROWSER", "false") == "false":
        options.add_argument('--headless')

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get("https://intra.epitech.eu")

    timeout = time.time() + 20 # 20 seconds timeout
    while time.time() < timeout:
        try:
            is_good = driver.find_element("id", "body-wrapper")
            if is_good:
                time.sleep(5)
                cookies = driver.get_cookies()
                driver.quit()
                log_success("Anti-ddos cookies successfully generated !")
                parsed_cookies = {}
                for cookie in cookies:
                    parsed_cookies[cookie["name"]] = cookie["value"]
                return parsed_cookies
        except:
            pass
        time.sleep(0.2)
    driver.quit()
    log_error("Failed to generate anti-ddos cookies (timeout)")
    return False

def check_antiddos_cookies(ddos_cookies: dict):
    """
    Check if the anti-ddos cookies are still valid
    :return: True if the cookies are still valid, False if the cookies are not valid
    """

    req = requests.get("https://intra.epitech.eu/robots.txt", cookies=ddos_cookies, headers={"User-Agent": INTRA_USERAGENT})
    if req.status_code == 404:
        return True
    if req.status_code == 503:
        return False
    raise Exception("Unexpected status code while checking anti-ddos cookies")

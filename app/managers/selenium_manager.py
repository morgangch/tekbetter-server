import json
import os
import time
from dotenv import load_dotenv
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service

from app.config import INTRANET_LOGIN_URL, LOGIN_TIMEOUT, INTRANET_SESSION_COOKIE_NAME
from app.models.microsoft_session import MicrosoftSession
from app.tools.aes_cipher import decrypt_text
from app.tools.teklogger import log_debug, log_info, log_success, log_error

load_dotenv()


def init_driver():
    options = webdriver.ChromeOptions()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    if os.getenv("SHOW_BROWSER", "false") == "false":
        options.add_argument('--headless')
    return webdriver.Chrome(service=Service(ChromeDriverManager().install()))

def create_driver():
    return init_driver()

class SeleniumManager:
    def __init__(self):
        self.antiddos_cookies = {}
        self.last_antiddos_cookies_update = None

        self._load_last_ddos_cookies()

    def _load_last_ddos_cookies(self):
        """
        For development purposes, load the last anti-ddos cookies to avoid regenerating them each time
        :return:
        """
        if os.path.exists("dev_cookies.json"):
            with open("dev_cookies.json", "r") as f:
                self.antiddos_cookies = json.loads(f.read())
                self.last_antiddos_cookies_update = time.time()

    def _save_last_ddos_cookies(self):
        if os.path.exists("dev_cookies.json"):
            with open("dev_cookies.json", "w") as f:
                f.write(json.dumps(self.antiddos_cookies, indent=4))

    def create_intranet_session(self, microsoft_session: MicrosoftSession):
        """
        Create an intranet session using the given Microsoft cookies
        :param microsoft_cookies: Cookies from Microsoft (dict)
        :return: tuple (token, login) if the session is created
        """
        driver = create_driver()

        microsoft_cookies = json.loads(decrypt_text(microsoft_session.json_cookies))
        self._put_cookies(driver, microsoft_cookies)
        driver.get(INTRANET_LOGIN_URL)
        timeout = LOGIN_TIMEOUT + time.time()
        while time.time() < timeout:
            current_url = driver.current_url
            time.sleep(0.2)
            if current_url.startswith("https://intra.epitech.eu"):
                login = self._extract_login(driver)
                intranet_cookies = driver.get_cookies()
                match_cookies = [cookie for cookie in intranet_cookies if
                                 cookie["name"] == INTRANET_SESSION_COOKIE_NAME]
                if len(match_cookies) == 0:
                    driver.quit()
                    raise Exception("No session cookie found")
                token = match_cookies[0]["value"]
                driver.quit()
                return login, token
        driver.quit()
        raise Exception("Intranet url wait timeout")

    def _extract_login(self, driver):
        """
        Extract the email from the intranet
        The drive needs to be on the intranet page, after ddos protection
        :return:
        """
        #/file/userprofil/commentview/eliot.amanieu@epitech.eu.jpg

        timeout = LOGIN_TIMEOUT + time.time()
        is_good = False
        while time.time() < timeout and not is_good:
            try:
                is_good = driver.find_element("id", "body-wrapper")
            except:
                pass
            time.sleep(0.5)
        if not is_good:
            return None
        divs = driver.find_elements("class name", "large")
        for div in divs:
            if "@epitech.eu" in div.get_attribute("title"):
                login = div.get_attribute("title")
                return login
        return None

    def _put_cookies(self, driver, cookies):
        # Inject cookies and delete old ones
        for domain, domain_cookies in cookies.items():
            driver.get(domain)
            # Clear cookies
            driver.delete_all_cookies()
            # Inject cookies
            for cookie in domain_cookies:
                driver.add_cookie(cookie)

    def check_antiddos_cookies(self):
        """
        Check if the anti-ddos cookies are still valid
        :return: True if the cookies are still valid, False if the cookies are not valid
        """

        log_debug("Checking for anti-ddos cookies regeneration")
        if self.last_antiddos_cookies_update is None or time.time() - self.last_antiddos_cookies_update > 30 * 60: # 30 minutes
            log_debug("Auto regenerating anti-ddos cookies after a fixed timeout")
            return self.generate_antiddos_cookies()

        log_debug("Testing last anti-ddos cookies")
        driver = create_driver()
        driver.get("https://intra.epitech.eu/")
        self._put_cookies(driver, self.antiddos_cookies)
        driver.get("https://intra.epitech.eu/")
        try:
            driver.find_element("id", "body-wrapper")
            driver.quit()
            log_debug("Anti-ddos cookies are still valid")
        except:
            driver.quit()
            log_debug("Anti-ddos cookies are not valid")
            self.generate_antiddos_cookies()

    def generate_antiddos_cookies(self):
        """
        Get the anti-ddos cookies from the intranet
        :return: Anti-ddos cookies (dict) if the cookies are found, False if the cookies are not found
        """

        log_info("Generating anti-ddos cookies")
        driver = create_driver()
        driver.get("https://intra.epitech.eu/")

        timeout = LOGIN_TIMEOUT + time.time()
        while time.time() < timeout:
            try:
                is_good = driver.find_element("id", "body-wrapper")
                if is_good:
                    time.sleep(5)
                    cookies = driver.get_cookies()
                    driver.quit()
                    log_success("Anti-ddos cookies successfully generated !")
                    self.antiddos_cookies = {
                        "https://intra.epitech.eu": cookies,
                    }
                    self.last_antiddos_cookies_update = time.time()
                    self._save_last_ddos_cookies()
                    return cookies
            except:
                pass
            time.sleep(0.5)
        driver.quit()
        log_error("Failed to generate anti-ddos cookies (timeout)")
        return False
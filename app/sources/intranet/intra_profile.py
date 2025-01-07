import requests

from app.config import INTRA_USERAGENT
from app.tools.teklogger import log_error


class StudentProfile:
    login: str
    full_name: str
    picture_url: str
    promoyear: int
    yearnumber: int
    credits: int
    gpa: float

def intra_fetch_profile(intra_token: str, ddos_cookies: dict, start_date: str, end_date: str):
    try:
        ddos_cookies["user"] = intra_token
        response = requests.get("https://intra.epitech.eu/user/?format=json", cookies=ddos_cookies, headers={
            "User-Agent": INTRA_USERAGENT
        })
        if response.status_code != 200:
            return False
        profile = StudentProfile()

        profile.login = response.json()["login"]
        profile.full_name = response.json()["title"]
        profile.picture_url = response.json()["picture"]
        profile.promoyear = response.json()["promo"]
        profile.yearnumber = response.json()["studentyear"]
        profile.credits = response.json()["credits"]
        for gpa in response.json()["gpa"]:
            if "gpa" in gpa:
                profile.gpa = gpa["gpa"]
                break
        return profile
    except Exception as e:
        log_error("Intranet fetch activity error: " + str(e))
    return False

def intra_download_picture(intra_token: str, ddos_cookies: dict, profile: StudentProfile, folder_path: str):
    try:
        response = requests.get(f"https://intra.epitech.eu{profile.picture_url}", cookies=ddos_cookies, headers={
            "User-Agent": INTRA_USERAGENT
        })
        if response.status_code != 200:
            return False
        with open(f"{folder_path}/{profile.login}.jpg", "wb") as file:
            file.write(response.content)
        return True
    except Exception as e:
        log_error("Intranet fetch activity error: " + str(e))
    return False

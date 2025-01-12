from functools import wraps

from flask import request

from app.globals import Globals
from app.services.student_service import StudentService


def scraper_auth_middleware():
    def _scraper_auth_middleware(f):
        @wraps(f)
        def __scraper_auth_middleware(*args, **kwargs):
            scraper_token = request.headers.get("Authorization")
            if not scraper_token:
                return {"message": "Missing authorization header"}, 401
            scraper_token = scraper_token.replace("Bearer ", "")
            student = StudentService.get_student_by_scrapetoken(scraper_token)
            if not student:
                return {"message": "Invalid authorization header"}, 401
            request.student = student
            return f(*args, **kwargs)
        return __scraper_auth_middleware
    return _scraper_auth_middleware
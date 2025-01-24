import os
import random
import string
from datetime import datetime, timedelta

from snowflake import SnowflakeGenerator

from app.globals import Globals
from app.models.Student import Student
from app.services.mail_service import MailService
from app.services.redis_service import RedisService
from app.tools.jwt_engine import generate_jwt
from app.tools.password_tools import hash_password
from app.tools.teklogger import log_debug, log_warning


class StudentPictureService:
    @staticmethod
    def get_student_picture(login: str) -> bytes or None:
        if not StudentPictureService.is_picture_exists(login):
            return None
        img_bytes = open(os.path.join(os.getenv("DATA_PATH"), "student_pictures", f"{login}.jpg"), "rb").read()
        return img_bytes

    @staticmethod
    def add_student_picture(login: str, img_bytes: bytes):
        path = os.path.join(os.getenv("DATA_PATH"), "student_pictures", f"{login}.jpg")
        with open(path, "wb") as f:
            f.write(img_bytes)

    @staticmethod
    def remove_student_picture(login: str):
        if not StudentPictureService.is_picture_exists(login):
            return False
        path = os.path.join(os.getenv("DATA_PATH"), "student_pictures", f"{login}.jpg")
        os.remove(path)
        return True

    @staticmethod
    def is_picture_exists(login: str):
        path = os.path.join(os.getenv("DATA_PATH"), "student_pictures", f"{login}.jpg")
        return os.path.exists(path)

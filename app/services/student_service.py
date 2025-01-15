import random
import string
from datetime import datetime, timedelta

from redis import Redis

from app.globals import Globals
from app.models.Student import Student
from snowflake import SnowflakeGenerator

from app.services.redis_service import RedisService
from app.tools.jwt_engine import generate_jwt
from app.tools.password_tools import hash_password
from app.tools.teklogger import log_debug


class StudentService:
    @staticmethod
    def get_student_by_login(login: str) -> Student:
        student = Globals.database["students"].find_one({"login": login})
        return Student(student) if student else None

    @staticmethod
    def get_student_by_id(student_id: str) -> Student:
        student = Globals.database["students"].find_one({"_id": student_id})
        return Student(student) if student else None

    @staticmethod
    def get_students_by_public_scraper(scraper_id: str) -> [Student]:
        students = Globals.database["students"].find({"public_scraper_id": scraper_id})
        return [Student(student) for student in students]

    @staticmethod
    def get_all_students() -> [Student]:
        students = Globals.database["students"].find()
        return [Student(student) for student in students]

    @staticmethod
    def get_public_scraper_students() -> [Student]:
        students = Globals.database["students"].find({"microsoft_session": {"$ne": None}})
        return [Student(student) for student in students]

    @staticmethod
    def add_student(student: Student):
        if StudentService.get_student_by_login(student.login):
            return
        gen = SnowflakeGenerator(42)
        student._id = next(gen)
        student.last_update = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        Globals.database["students"].insert_one(student.to_dict())
        StudentService.regenerate_scraper_token(student)
        return student

    @staticmethod
    def update_student(student: Student):
        student.last_update = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        Globals.database["students"].update_one({"_id": student.id}, {"$set": student.to_dict()})

    @staticmethod
    def delete_student(student: Student):
        Globals.database["students"].delete_one({"_id": student.id})

    @staticmethod
    def get_student_by_scrapetoken(token: str) -> Student:
        student = Globals.database["students"].find_one({"scraper_token": token})
        return Student(student) if student else None

    @staticmethod
    def regenerate_scraper_token(student: Student):
        token = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
        student.scraper_token = f"{student.login.split('@')[0]}_{token}"
        StudentService.update_student(student)
        return student.scraper_token

    @staticmethod
    def create_register_ticket(email: str):
        ticket = ''.join(random.choices(string.ascii_letters + string.digits, k=64))
        ticket = "tbticket_" + ticket
        RedisService.set(f"register_ticket_{ticket}", email, 60*60) # Expires in 1 hour
        # TODO: Send the ticket by email
        log_debug(f"Register ticket created for {email}: {ticket}")
        return ticket

    @staticmethod
    def create_student_by_ticket(ticket: str, password: str):
        email = RedisService.get(f"register_ticket_{ticket}")
        if not email:
            return None
        student = Student()
        student.login = email
        student.password_hash = hash_password(password)
        stud = StudentService.add_student(student)
        if not stud:
            return None
        RedisService.delete(f"register_ticket_{ticket}")
        return stud

    @staticmethod
    def generate_jwt_token(student: Student):
        return generate_jwt(student, datetime.utcnow() + timedelta(days=7))

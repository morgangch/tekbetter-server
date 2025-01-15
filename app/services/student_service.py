import random
import string
from datetime import datetime
from app.globals import Globals
from app.models.Student import Student
from snowflake import SnowflakeGenerator

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

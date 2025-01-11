from datetime import datetime

from app.main import database
from app.models.Student import Student


class StudentService:

    def _build_student(self, mongo_output):
        student = Student()
        student.internal_id = mongo_output["_id"]
        student.login = mongo_output["login"]
        student.city = mongo_output["city"]
        student.credits = mongo_output["credits"]
        student.gpa = mongo_output["gpa"]
        student.first_name = mongo_output["first_name"]
        student.last_name = mongo_output["last_name"]
        return student

    def get_student_by_login(self, login: str) -> Student:
        student = database["students"].find_one({"login": login})
        return self._build_student(student) if student else None

    def get_student_by_id(self, student_id: int) -> Student:
        student = database["students"].find_one({"_id": student_id})
        return self._build_student(student) if student else None

    def get_all_students(self) -> [Student]:
        students = database["students"].find()
        return [self._build_student(student) for student in students]

    def add_student(self, student: Student):
        student.last_update = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        database["students"].insert_one(student.to_dict())

    def update_student(self, student: Student):
        student.last_update = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        database["students"].update_one({"_id": student.internal_id}, {"$set": student.to_dict()})

    def delete_student(self, student: Student):
        database["students"].delete_one({"_id": student.internal_id})

from app.create_app import db
from app.models.student import Student


class StudentManager:
    def __init__(self):
        pass

    def create_student(self, login):
        """
        Create a student
        :param login:
        :return:
        """
        student = Student(login=login)
        db.session.add(student)
        db.session.commit()
        return student

    def update_student_token(self, login, token):
        """
        Update the token of the student
        :param login:
        :param token:
        :return:
        """
        student = Student.query.filter_by(login=login).first()
        if student is None:
            student = self.create_student(login)
        student.intranet_token = token
        student.last_token_update = db.func.now()
        db.session.commit()
        return student

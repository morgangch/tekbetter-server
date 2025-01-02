import json

from flask import request

from app.main import db
from app.managers.intra_manager import IntraManager
from app.managers.student_manager import StudentManager
from app.models.microsoft_session import MicrosoftSession
from app.models.student import Student
from app.tools.aes_cipher import encrypt_text


def load_dev_routes(app, intra_manager: IntraManager, student_manager: StudentManager):
    @app.route("/api/test", methods=["POST"])
    def test_microsoft():
        data = request.get_json()

        if not "https://login.microsoftonline.com" in data:
            return {"message": "Missing microsoft cookies"}, 400

        session = MicrosoftSession()

        data = encrypt_text(json.dumps(data))
        session.json_cookies = data
        db.session.add(session)
        db.session.commit()

        return {}, 200

    @app.route("/api/test2", methods=["GET"])
    def test2():

        session = MicrosoftSession.query.filter_by(id=1).first()
        login, token = intra_manager.selenium_manager.create_intranet_session(session)

        student_manager.update_student_token(login, token)

        print(token)

        return {}, 200
    @app.route("/api/test3", methods=["GET"])
    def test3():

        student = Student.query.filter_by(id=1).first()

        planning = intra_manager.fetch_planning(student.intranet_token, "2025-01-01", "2025-02-01", student.login)

        return planning, 200
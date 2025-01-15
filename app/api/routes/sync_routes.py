from flask import request

from app.api.middlewares.student_auth_middleware import student_auth_middleware
from app.services.student_service import StudentService
from app.tools.aes_tools import encrypt_token


def load_sync_routes(app):
    @app.route("/api/sync/microsoft", methods=["POST"])
    @student_auth_middleware()
    def put_microsoft_token():
        student = request.student

        token = request.json.get("token")
        if token is None:
            return {"error": "Missing token"}, 400

        student.microsoft_session = encrypt_token(token)
        StudentService.update_student(student)

        return {"success": True}

    @app.route("/api/sync/microsoft", methods=["DELETE"])
    @student_auth_middleware()
    def delete_microsoft_token():
        student = request.student

        student.microsoft_session = None
        StudentService.update_student(student)

        return {"success": True}

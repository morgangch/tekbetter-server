from flask import request, Blueprint
from app.models.student import Student
from app.tools.jwt_engine import generate_jwt
from app.tools.password_engine import check_password


main = Blueprint("main", __name__)

@main.route("/api/auth/login", methods=["POST"])
def auth_login():
    data = request.get_json()
    if "login" not in data or "password" not in data:
        return "Missing fields", 400

    student = Student.query.filter_by(login=data["login"]).first()
    if student is None or not check_password(data["password"], student.password):
        return "Invalid credentials", 401

    jwt = generate_jwt(student, expiration=None)
    return {"token": jwt.decode("utf-8")}, 200


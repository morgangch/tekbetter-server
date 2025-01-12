import datetime
import os
import jwt

from app.models.Student import Student

jwt_secret = os.getenv("JWT_SECRET")

def generate_jwt(student: Student, expiration):
    return jwt.encode({
        "id": student.id,
        "login": student.login,
        "created_at": str(datetime.datetime.now()),
        "exp": expiration
    }, jwt_secret, algorithm="HS256")

def decode_jwt(token):
    return jwt.decode(token, jwt_secret, algorithms=["HS256"])
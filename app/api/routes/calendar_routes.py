from flask import request

from app.api.middlewares.student_auth_middleware import student_auth_middleware
from app.services.student_service import StudentService


def load_calendar_routes(app):
    @app.route("/api/calendar", methods=["GET"])
    @student_auth_middleware()
    def calendar_token_route():
        student = request.student
        return {
            "token": student.scraper_token,
        }

    @app.route("/api/calendar/regenerate", methods=["POST"])
    @student_auth_middleware()
    def calendar_regenerate_route():
        student = request.student
        new_token = StudentService.regenerate_scraper_token(student)
        return {
            "token": new_token,
        }

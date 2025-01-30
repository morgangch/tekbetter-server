from flask import request, make_response

from app.api.middlewares.student_auth_middleware import student_auth_middleware
from app.services.planning_service import PlanningService
from app.services.project_service import ProjectService
from app.services.student_picture_service import StudentPictureService


def load_global_routes(app):
    @app.route("/api/global/sync-status", methods=["GET"])
    @student_auth_middleware()
    def global_sync_status():
        student = request.student

        latest_planning = PlanningService.get_latest_fetched_date(student.id)
        latest_project = ProjectService.get_latest_fetchdate(student.id)

        return {
            "planning": latest_planning,
            "projects": latest_project
        }


    @app.route("/api/student/<string:student_id>", methods=["GET"])
    @student_auth_middleware()
    def get_student(student_id):
        student = request.student

        return {
            "login": student.login,
            "id": student.id,
            "name": f"{student.first_name} {student.last_name}",
        }

    @app.route("/api/global/picture/<string:student_login>", methods=["GET"])
   # @student_auth_middleware()
    def global_picture(student_login):
        picture_bytes = StudentPictureService.get_student_picture(student_login)

        if not picture_bytes:
            return {"message": "Student picture not found"}, 404

        response = make_response(picture_bytes)
        response.headers.set('Content-Type', 'image/jpeg')
        response.headers.set(
            'Content-Disposition', 'attachment', filename='%s.jpg' % student_login)
        return response

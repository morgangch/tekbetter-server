from flask import request

from app.api.middlewares.student_auth_middleware import student_auth_middleware
from app.services.project_service import ProjectService


def load_project_routes(app):
    @app.route("/api/projects", methods=["GET"])
    @student_auth_middleware()
    def projects_route():
        student = request.student

        projects = ProjectService.get_student_projects(student.id)

        return [project.to_api() for project in projects]

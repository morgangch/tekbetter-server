from flask import request

from app.api.middlewares.student_auth_middleware import student_auth_middleware
from app.services.planning_service import PlanningService
from app.services.project_service import ProjectService


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

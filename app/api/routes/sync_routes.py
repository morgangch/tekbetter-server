from datetime import datetime

from flask import request

from app.api.middlewares.scraper_auth_middleware import scraper_auth_middleware, public_scraper_auth_middleware
from app.globals import Globals
from app.models.PlanningEvent import PlanningEvent
from app.models.Project import Project
from app.models.PublicScraper import PublicScraper
from app.parsers.mouli_parser import build_mouli_from_myepitech
from app.parsers.planning_parser import fill_event_from_intra
from app.parsers.project_parser import fill_project_from_intra
from app.parsers.student_parser import fill_student_from_intra
from app.services.mouli_service import MouliService
from app.services.planning_service import PlanningService
from app.services.project_service import ProjectService
from app.services.publicscraper_service import PublicScraperService
from app.services.student_service import StudentService


def load_sync_routes():
    @Globals.app.route("/api/sync/microsoft", methods=["POST"])
    def put_microsoft_token():
        student = StudentService.get_student_by_id(1)

        token = request.json.get("token")
        if token is None:
            return {"error": "Missing token"}, 400

        student.microsoft_token = token
        StudentService.update_student(student)

        return {"success": True}

    @Globals.app.route("/api/sync/microsoft", methods=["DELETE"])
    def delete_microsoft_token():
        student = StudentService.get_student_by_id(1)

        student.microsoft_token = None
        StudentService.update_student(student)

        return {"success": True}

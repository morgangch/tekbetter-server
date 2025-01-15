from datetime import datetime

from flask import request

from app.api.middlewares.scraper_auth_middleware import scraper_auth_middleware, public_scraper_auth_middleware
from app.globals import Globals
from app.models.MouliTest import MouliResult
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


def load_global_routes(app):
    @app.route("/api/global/sync-status", methods=["GET"])
    def global_sync_status():
        student = StudentService.get_student_by_id(1)

        latest_planning = PlanningService.get_latest_fetched_date(student.id)
        latest_project = ProjectService.get_latest_fetchdate(student.id)

        return {
            "planning": latest_planning,
            "projects": latest_project
        }

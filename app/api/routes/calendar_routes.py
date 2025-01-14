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


def load_calendar_routes():
    @Globals.app.route("/api/calendar", methods=["GET"])
    def calendar_token_route():
        student = StudentService.get_student_by_id(1)
        return {
            "token": student.scraper_token,
        }

    @Globals.app.route("/api/calendar/regenerate", methods=["POST"])
    def calendar_regenerate_route():
        student = StudentService.get_student_by_id(1)
        new_token = StudentService.regenerate_scraper_token(student)
        return {
            "token": new_token,
        }

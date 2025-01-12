from datetime import datetime

from flask import request

from app.api.middlewares.scraper_auth_middleware import scraper_auth_middleware
from app.globals import Globals
from app.models.Project import Project
from app.parsers.mouli_parser import build_mouli_from_myepitech
from app.parsers.project_parser import fill_project_from_intra
from app.parsers.student_parser import fill_student_from_intra
from app.services.mouli_service import MouliService
from app.services.project_service import ProjectService
from app.services.student_service import StudentService


def load_scrapers_routes():

    @Globals.app.route("/api/scraper/moulis", methods=["GET"])
    @scraper_auth_middleware()
    def get_all_moulis():
        """
        Return the list of ids of all already scraped moulis
        """
        student = request.student
        moulis_ids = MouliService.get_student_mouliids(student.internal_id)

        return {"known_tests": moulis_ids}

    @Globals.app.route("/api/scraper/push", methods=["POST"])
    @scraper_auth_middleware()
    def push_data():
        """
        Handle the reception of the new scraped data
        """
        student = request.student
        data = request.json

        if "intra_profile" in data and data["intra_profile"]:
            fill_student_from_intra(data["intra_profile"], student)
            StudentService.update_student(student)

        if "intra_projects" in data and data["intra_projects"]:
            for proj in data["intra_projects"]:
                project = Project()
                fill_project_from_intra(proj, project, student.internal_id)
                project.last_update = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                ProjectService.upload_project(project)

        if "new_moulis" in data and data["new_moulis"]:
            for mouli_id, mouli_data in data["new_moulis"].items():
                mouli = build_mouli_from_myepitech(mouli_id, mouli_data, student.internal_id)
                MouliService.upload_mouli(mouli)
        return {"message": "Data pushed"}
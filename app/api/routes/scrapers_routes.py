from flask import request

from app.api.middlewares.scraper_auth_middleware import scraper_auth_middleware
from app.globals import Globals
from app.parsers.mouli_parser import build_mouli_from_myepitech
from app.parsers.student_parser import fill_student_from_intra
from app.services.mouli_service import MouliService
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

        if "intra_profile" in data:
            fill_student_from_intra(data["intra_profile"], student)
            StudentService.update_student(student)

        #intra_projects = data["intra_projects"]
        if "new_moulis" in data:
            for mouli_id, mouli_data in data["new_moulis"].items():
                mouli = build_mouli_from_myepitech(mouli_id, mouli_data, student.internal_id)
                MouliService.upload_mouli(mouli)
        return {"message": "Data pushed"}
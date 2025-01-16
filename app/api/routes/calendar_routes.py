from flask import request, Response
from ics import Calendar, Event
from app.api.middlewares.student_auth_middleware import student_auth_middleware
from app.services.planning_service import PlanningService
from app.services.project_service import ProjectService
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

    @app.route("/ical/<string:token>/<string:type>.ics", methods=["GET"])
    def calendar_export_route(token, type):
        student = StudentService.get_student_by_scrapetoken(token)
        if not student:
            return "Invalid token", 401
        if type not in ["projects", "activities", "mixed"]:
            return "File not found:" + type + ".ics", 400

        cal = Calendar()

        activities = []
        projects = []

        if type in ["activities", "mixed"]:
            activities = PlanningService.get_student_events(student.id)
        if type in ["projects", "mixed"]:
            projects = ProjectService.get_student_projects(student.id)

        for activity in activities:
            e = Event()
            e.name = activity.title
            e.location = activity.location
            e.begin = activity.date_start
            e.end = activity.date_end
            cal.events.add(e)

        for project in projects:
            e = Event()
            e.name = project.title
            e.begin = project.date_start
            e.end = project.date_end
            e.make_all_day()
            cal.events.add(e)

        ics_content = cal.serialize()
        response = Response(ics_content, mimetype="text/calendar")
        response.headers["Content-Disposition"] = f"attachment; filename={type}.ics"

        return response
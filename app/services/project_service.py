import uuid
from datetime import datetime

from app.globals import Globals
from app.models.Project import Project

class ProjectService:

    @staticmethod
    def get_student_projects(student_id: str):
        return [Project(p) for p in Globals.database["projects"].find({"student_id": student_id})]

    @staticmethod
    def get_latest_fetchdate(student_id: str) -> str:
        p = Globals.database["projects"].find_one({"student_id": student_id}, sort=[("fetch_date", -1)])
        return p["fetch_date"] if p else None

    @staticmethod
    def get_latest_date_before_now(student_id: str) -> str:
        p = Globals.database["projects"].find_one({"student_id": student_id, "date_end": {"$lt": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}}, sort=[("date_end", -1)])
        return p["date_start"] if p else None

    @staticmethod
    def get_project_by_code_acti(acti_code: str, student_id: int):
        p = Globals.database["projects"].find_one({"code_acti": acti_code, "student_id": student_id})
        if p:
            return Project(p)
        return None
    @staticmethod
    def upload_project(project: Project):
        curr = ProjectService.get_project_by_code_acti(project.code_acti, project.student_id)
        if curr:
            project._id = curr._id
            project.slug = curr.slug if project.slug is None else project.slug
            Globals.database["projects"].update_one({"_id": project._id}, {"$set": project.to_dict()})
        else:
            project._id = uuid.uuid4().hex
            Globals.database["projects"].insert_one(project.to_dict())
        return project

    @staticmethod
    def delete_project(project: Project):
        Globals.database["projects"].delete_one({"_id": project.mongo_id})

    @staticmethod
    def get_modules(student_id: int) -> {str: {str: str}}:
        projects = ProjectService.get_student_projects(student_id)
        modules = {}
        for project in projects:
            if project.code_module not in modules:
                modules[project.code_module] = {
                    "code": project.code_module,
                    "name": project.title_module,
                }
        return modules

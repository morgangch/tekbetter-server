import random
import string
from datetime import datetime
from app.globals import Globals
from app.models.Project import Project
from app.models.Student import Student

class ProjectService:

    @staticmethod
    def get_student_projects(student_id: int):
        return Globals.database["projects"].find({"student_id": student_id})

    @staticmethod
    def get_project_by_id(project_id: int):
        return Globals.database["projects"].find_one({"_id": project_id})

    @staticmethod
    def upload_project(project: Project):
        if ProjectService.get_project_by_id(project.id):
            Globals.database["projects"].update_one({"_id": project.id}, {"$set": project.to_dict()})
        else:
            Globals.database["projects"].insert_one(project.to_dict())

    @staticmethod
    def delete_project(project_id: int):
        Globals.database["projects"].delete_one({"_id": project_id})

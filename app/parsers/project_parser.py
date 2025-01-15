from datetime import datetime

from app.models.Project import Project


def fill_project_from_intra(intra_json: dict, project: Project,
                            student_id: int):
    for key in ["codeacti", "acti_title", "begin_acti", "end_acti",
                "codemodule"]:
        if key not in intra_json:
            return None
    project.student_id = student_id
    project.code_acti = intra_json["codeacti"]
    project.title = intra_json["acti_title"]
    project.date_end = intra_json["end_acti"]
    project.date_start = intra_json["begin_acti"]
    project.fetch_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    project.code_module = intra_json["codemodule"]
    project.title_module = intra_json["title_module"]
    return project

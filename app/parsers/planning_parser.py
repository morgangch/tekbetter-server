
from datetime import datetime

from app.models.PlanningEvent import PlanningEvent
from app.models.Project import Project
from app.models.Student import Student

def fill_event_from_intra(intra_json: dict, event: PlanningEvent, student_id: int):
    for key in ["codeacti", "acti_title", "codemodule"]:
        if key not in intra_json:
            return None

    event.code_acti = intra_json["codeacti"]
    event.student_id = student_id
    event.title = intra_json["acti_title"]

    if "rdv_indiv_registered" in intra_json and intra_json["rdv_indiv_registered"]:
        event.date_start = intra_json["rdv_indiv_registered"].split("|")[0]
        event.date_end = intra_json["rdv_indiv_registered"].split("|")[1]
    elif "rdv_group_registered" in intra_json and intra_json["rdv_group_registered"]:
        event.date_start = intra_json["rdv_group_registered"].split("|")[0]
        event.date_end = intra_json["rdv_group_registered"].split("|")[1]
    elif "start" in intra_json and intra_json["start"]:
        event.date_start = intra_json["start"]
        event.date_end = intra_json["end"]
    elif "begin_acti" in intra_json and intra_json["begin_acti"]:
        event.date_start = intra_json["begin_acti"]
        event.date_end = intra_json["end_acti"]
    else:
        return None

    if "room" in intra_json and intra_json["room"] and "code" in intra_json["room"]:
        event.location = intra_json["room"]["code"].split("\/")[-1]
    else:
        event.location = "Unknown"

    return event


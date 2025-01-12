import random
import string
from datetime import datetime
from app.globals import Globals
from app.models.PlanningEvent import PlanningEvent
from app.models.Project import Project
from app.models.Student import Student

class PlanningService:

    @staticmethod
    def get_student_events_ids(student_id: int):
        return [int(event["_id"]) for event in Globals.database["planning"].find({"student_id": student_id})]

    @staticmethod
    def create_event(event: PlanningEvent):
        Globals.database["planning"].insert_one(event.to_dict())

    @staticmethod
    def delete_event(event_id: int):
        Globals.database["planning"].delete_one({"_id": event_id})

    @staticmethod
    def update_event(event: PlanningEvent):
        Globals.database["planning"].update_one({"_id": event.id}, {"$set": event.to_dict()})

    @staticmethod
    def sync_events(events: [PlanningEvent], student_id: int):
        ids = PlanningService.get_student_events_ids(student_id)
        for event in events:
            event.fetch_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            if event.id in ids:
                PlanningService.update_event(event)
            else:
                PlanningService.create_event(event)
        # Delete events that are not in the list
        for event_id in ids:
            if event_id not in [event.id for event in events]:
                PlanningService.delete_event(event_id)
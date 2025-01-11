from datetime import datetime

from app.main import database
from app.models.MouliTest import MouliTest, MouliResult, CodingStyleReport
from app.models.Student import Student


class MouliService:


    def get_mouli_by_id(self, mouli_id: int) -> MouliResult:
        mouli = database["moulis"].find_one({"_id": mouli_id})
        return MouliResult(mouli) if mouli else None

    def get_student_mouliids(self, student_id: int) -> [int]:
        return [mouli["_id"] for mouli in database["moulis"].find({"student_id": student_id})]

    def upload_mouli(self, mouli: MouliResult):
        database["moulis"].insert_one(mouli.to_dict())

    def delete_mouli(self, mouli: MouliResult):
        database["moulis"].delete_one({"_id": mouli.test_id})


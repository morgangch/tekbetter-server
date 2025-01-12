import uuid

from requests import delete

from app.globals import Globals
from app.models.MouliTest import MouliTest, MouliResult, CodingStyleReport

class MouliService:

    @staticmethod
    def get_mouli_by_id(test_id: int, student_id: int) -> MouliResult:
        mouli = Globals.database["moulis"].find_one({"test_id": test_id, "student_id": student_id})
        return MouliResult(mouli) if mouli else None

    @staticmethod
    def get_student_mouliids(student_id: int) -> [int]:
        return [int(mouli["test_id"]) for mouli in Globals.database["moulis"].find({"student_id": student_id})]

    @staticmethod
    def delete_mouli(mouli: MouliResult):
        Globals.database["moulis"].delete_one({"_id": mouli.mongo_id})

    @staticmethod
    def upload_mouli(mouli: MouliResult):
        current = MouliService.get_mouli_by_id(mouli.test_id, mouli.student_id)
        if current:
            new_data = current.to_dict()
            new_data["_id"] = current.mongo_id
            Globals.database["moulis"].update_one({"_id": current.mongo_id}, {"$set": new_data})
        else:
            mouli._id = uuid.uuid4().hex
            Globals.database["moulis"].insert_one(mouli.to_dict())
        return mouli

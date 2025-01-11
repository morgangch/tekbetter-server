from requests import delete

from app.globals import Globals
from app.models.MouliTest import MouliTest, MouliResult, CodingStyleReport

class MouliService:

    @staticmethod
    def get_mouli_by_id(mouli_id: int) -> MouliResult:
        mouli = Globals.database["moulis"].find_one({"_id": mouli_id})
        return MouliResult(mouli) if mouli else None

    @staticmethod
    def get_student_mouliids(student_id: int) -> [int]:
        return [mouli["_id"] for mouli in Globals.database["moulis"].find({"student_id": student_id})]

    @staticmethod
    def delete_mouli(mouli: MouliResult):
        Globals.database["moulis"].delete_one({"_id": mouli.test_id})


    @staticmethod
    def upload_mouli(mouli: MouliResult):
        if MouliService.get_mouli_by_id(mouli.test_id):
            MouliService.delete_mouli(mouli)
        Globals.database["moulis"].insert_one(mouli.to_dict())

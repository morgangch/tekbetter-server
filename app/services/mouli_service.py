import uuid
from app.globals import Globals
from app.models.MouliTest import MouliResult

class MouliService:

    @staticmethod
    def get_mouli_by_id(test_id: int, student_id: str) -> MouliResult:
        mouli = Globals.database["moulis"].find_one({"test_id": str(test_id)    , "student_id": student_id})
        return MouliResult(mouli) if mouli else None

    @staticmethod
    def get_latest_of_project(project_slug: str, student_id: str) -> MouliResult:
        mouli = Globals.database["moulis"].find_one({"project_code": project_slug, "student_id": student_id}, sort=[("test_date", -1)])
        if mouli:
            return MouliResult(mouli)
        return None

    @staticmethod
    def get_project_moulis(project_slug: str, student_id: str) -> [MouliResult]:
        moulis = Globals.database["moulis"].find({"project_code": project_slug, "student_id": student_id})
        return [MouliResult(m) for m in moulis]

    @staticmethod
    def build_evolution(mouli: MouliResult) -> [MouliResult]:
        all_moulis = [MouliResult(m) for m in Globals.database["moulis"].find({"student_id": mouli.student_id, "project_code": mouli.project_code})]
        all_moulis.sort(key=lambda m: m.test_date)
        result = ([], [], [])
        for m in all_moulis:
            result[0].append(m.test_date)
            result[1].append(m.score)
            result[2].append(m.test_id)
        return result




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

from app.services.student_service import StudentService


class PublicScraper:
    _id: str = None

    label: str
    access_token: str
    enabled: bool = True

    def __init__(self, mongo_data=None):
        if mongo_data is None:
            return
        self._id = mongo_data["_id"]
        self.label = mongo_data["label"]
        self.access_token = mongo_data["access_token"]
        self.enabled = mongo_data.get("enabled", True)

    def to_dict(self):
        return {
            "_id": self._id,
            "label": self.label,
            "access_token": self.access_token,
            "enabled": self.enabled
        }

    @property
    def id(self):
        return self._id

    def get_students(self):
        return StudentService.get_students_by_public_scraper(self.id)
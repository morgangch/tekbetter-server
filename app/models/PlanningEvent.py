class PlanningEvent:
    _id: str = None
    code_acti: str
    student_id: int

    date_start: str
    date_end: str

    title: str
    location: str

    fetch_date: str

    def __init__(self, mongo_data=None):
        if mongo_data is None:
            return
        self._id = mongo_data["_id"]
        self.code_acti = mongo_data["code_acti"]
        self.student_id = mongo_data["student_id"]
        self.date_start = mongo_data["date_start"]
        self.date_end = mongo_data["date_end"]
        self.title = mongo_data["title"]
        self.location = mongo_data["location"]
        self.fetch_date = mongo_data["fetch_date"]


    def to_dict(self):
        return {
            "_id": self._id,
            "code_acti": self.code_acti,
            "student_id": self.student_id,
            "date_start": self.date_start,
            "date_end": self.date_end,
            "title": self.title,
            "fetch_date": self.fetch_date,
            "location": self.location
        }

    @property
    def mongo_id(self):
        return self._id
class Project:
    _id: str
    student_id: int
    title: str

    date_start: str
    date_end: str

    code_module: str
    title_module: str

    fetch_date: str


    def __init__(self, mongo_data=None):
        if mongo_data is None:
            return
        self._id = mongo_data["_id"]
        self.student_id = mongo_data["student_id"]
        self.date_start = mongo_data["date_start"]
        self.date_end = mongo_data["date_end"]
        self.code_module = mongo_data["code_module"]
        self.title = mongo_data["title"]
        self.title_module = mongo_data["title_module"]
        self.fetch_date = mongo_data["fetch_date"]

    def to_dict(self):
        return {
            "_id": self._id,
            "student_id": self.student_id,
            "date_start": self.date_start,
            "date_end": self.date_end,
            "code_module": self.code_module,
            "title_module": self.title_module,
            "title": self.title,
            "fetch_date": self.fetch_date
        }

    @property
    def id(self):
        return self._id
class Student:
    _id: str = None
    login: str
    first_name: str = None
    last_name: str = None
    city: str = "Epitech"
    promo_year: int = None
    credits: int = None
    gpa: float = None
    scraper_token: str = None

    last_update: str = None

    def to_dict(self):
        return {
            "_id": self._id,
            "login": self.login,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "city": self.city,
            "promo_year": self.promo_year,
            "credits": self.credits,
            "gpa": self.gpa,
            "last_update": self.last_update,
            "scraper_token": self.scraper_token
        }

    @property
    def id(self):
        return self._id

    def __init__(self, mongo_data=None):
        if mongo_data is None:
            return
        self._id = mongo_data["_id"]
        self.login = mongo_data["login"]
        self.first_name = mongo_data.get("first_name", None)
        self.last_name = mongo_data.get("last_name", None)
        self.city = mongo_data.get("city", "Epitech")
        self.promo_year = mongo_data.get("promo_year", None)
        self.credits = mongo_data.get("credits", None)
        self.gpa = mongo_data.get("gpa", None)
        self.scraper_token = mongo_data.get("scraper_token", None)
        self.last_update = mongo_data.get("last_update", None)
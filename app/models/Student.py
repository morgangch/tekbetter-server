class Student:
    internal_id: int
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
            "_id": self.internal_id,
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
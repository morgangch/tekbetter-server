class Student:
    internal_id: int
    login: str
    first_name: str
    last_name: str
    city: str = "Epitech"
    promo_year: int
    credits: int
    gpa: float

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
            "last_update": self.last_update
        }
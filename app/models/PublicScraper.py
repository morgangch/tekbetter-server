class PublicScraper:
    id: str
    label: str
    access_token: str

    def to_dict(self):
        return {
            "id": self.id,
            "label": self.label,
            "access_token": self.access_token
        }

    def get_students(self):
        from app.services.student_service import StudentService
        return StudentService.get_students_by_public_scraper(self.id)

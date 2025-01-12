import random
import string
import uuid
from datetime import datetime
from app.globals import Globals
from app.models.PublicScraper import PublicScraper
from app.models.Student import Student
from app.services.student_service import StudentService


class PublicScraperService:
    @staticmethod
    def get_scraper(scraper_id: str) -> PublicScraper:
        scraper = Globals.database["public_scrapers"].find_one({"_id": scraper_id})
        return PublicScraper(scraper) if scraper else None

    @staticmethod
    def get_scraper_by_accesstoken(access_token: str) -> PublicScraper:
        scraper = Globals.database["public_scrapers"].find_one({"access_token": access_token})
        return PublicScraper(scraper) if scraper else None

    @staticmethod
    def get_all_scrapers() -> [PublicScraper]:
        scrapers = Globals.database["public_scrapers"].find()
        return [PublicScraper(scraper) for scraper in scrapers]

    @staticmethod
    def add_scraper(scraper: PublicScraper):
        scraper._id = uuid.uuid4().hex
        Globals.database["public_scrapers"].insert_one(scraper.to_dict())
        PublicScraperService.regenerate_access_token(scraper)
        return scraper

    @staticmethod
    def update_scraper(scraper: PublicScraper):
        Globals.database["public_scrapers"].update_one({"_id": scraper.id}, {"$set": scraper.to_dict()})
        return scraper

    @staticmethod
    def delete_scraper(scraper: PublicScraper):
        Globals.database["public_scrapers"].delete_one({"_id": scraper.id})

    @staticmethod
    def regenerate_access_token(scraper: PublicScraper):
        scraper.access_token = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
        PublicScraperService.update_scraper(scraper)
        return scraper.access_token

    @staticmethod
    def reassign_scrapers():
        students = StudentService.get_public_scraper_students()
        scrapers = PublicScraperService.get_all_scrapers()
        groups = [[] for _ in range(len(scrapers))]
        for i, student in enumerate(students):
            groups[i % len(scrapers)].append(student)
        for i, scraper in enumerate(scrapers):
            for student in groups[i]:
                student.public_scraper_id = scraper.id
                StudentService.update_student(student)
        return len(students)

from app.main import db
from app.models.microsoft_session import MicrosoftSession
from app.models.student import Student
from app.tools import aes_cipher


class MicrosoftManager:
    def __init__(self):
        pass

    def find_session(self, student: Student):
        email = student.login

        # Find a microsoft session who correspond to the student
        sessions = MicrosoftSession.query.filter_by(epitech_login=email).filter_by(is_expired=False).all()

        # If no session found
        if not sessions:
            return None

        # Return the first session found
        return sessions[0]

    def create_session(self, student: Student, json_cookies: str):
        email = student.login
        cipher = aes_cipher.AESCipher()
        session = MicrosoftSession(epitech_login=email, json_cookies=cipher.encrypt(json_cookies))
        db.session.add(session)
        db.session.commit()
        return session

    def mark_as_expired(self, session: MicrosoftSession):
        session.is_expired = True
        db.session.commit()
        return session
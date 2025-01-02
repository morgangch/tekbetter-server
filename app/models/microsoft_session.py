from app import db


class MicrosoftSession(db.Model):
    __tablename__ = 'microsoft_sessions'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    epitech_login = db.Column(db.String(255), nullable=True)
    is_expired = db.Column(db.Boolean, nullable=False, default=False)
    json_cookies = db.Column(db.Text, nullable=False)

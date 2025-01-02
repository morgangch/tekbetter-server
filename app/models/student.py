from app import db


class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    login = db.Column(db.String(255), nullable=False)
    password = db.Column(db.Text, nullable=True, default=None)
    intranet_token = db.Column(db.Text, nullable=True, default=None)
    last_token_update = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

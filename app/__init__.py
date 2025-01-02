from app.tools.envloader import load_env
load_env()
from flask_cors import CORS
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from app.config import Config

db = SQLAlchemy()

def import_models():
    from app.models import student, microsoft_session


def create_app():
    """Crée et configure une instance de l'application Flask."""
    app = Flask(__name__, static_folder="./static")
    app.config.from_object(Config)
    CORS(app)

    # Allow requests from any origin
    @app.before_request
    def before_request():
        if request.method == 'OPTIONS':
            return '', 200, {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*',
                             'Access-Control-Allow-Methods': '*'}

    db.init_app(app)

    with app.app_context():
        import_models()
        db.create_all()
        db.session.commit()
    from app.http.routes.auth_routes import main as auth_routes
    app.register_blueprint(auth_routes)
    return app

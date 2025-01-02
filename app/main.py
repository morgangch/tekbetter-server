import os
import sys
from alembic.command import upgrade

from app import create_app, db
from app.models.student import Student
from app.schedules.intra_ddos_schedule import intra_schedule_ddos
from app.tools.envloader import load_env
from app.tools.teklogger import log_info, log_debug, log_error
from flask import send_from_directory
from apscheduler.schedulers.background import BackgroundScheduler

app = create_app()


# Commande pour appliquer les migrations (facultatif si vous optez pour une commande manuelle)
def apply_migrations():
    """Applique les migrations Alembic."""
    try:
        print("Applying database migrations...")
        upgrade()  # Utilise flask-migrate pour wrapper Alembic
        print("Migrations applied successfully.")
    except Exception as e:
        print(f"Error applying migrations: {e}")
        sys.exit(1)


if __name__ == '__main__':
    log_info("Welcome to TekBetter server !")
    log_debug("Debug mode enabled")
    try:
        load_env()
    except Exception as e:
        log_error(str(e))
        exit(1)

    # with app.app_context():
    #     s = Student()
    #     s.login = "admin"
    #     db.session.add(s)
    #     db.session.commit()


    app.run(host="0.0.0.0", port=os.getenv("PORT"), debug=True, use_reloader=False)

    # with app.app_context():
    #     from app.managers.intra_manager import IntraManager
    #     from app.managers.selenium_manager import SeleniumManager
    #     from app.managers.student_manager import StudentManager
    #
    #     log_debug("Initializing database")
    #
    #     selenium_manager = SeleniumManager()
    #     intra_manager = IntraManager(selenium_manager)
    #     student_manager= StudentManager()
    #
    #     scheduler = BackgroundScheduler()
    #     scheduler.add_job(func=intra_schedule_ddos, trigger="interval", seconds=120, args=[selenium_manager])
    #     scheduler.start()
    #
    #
    #
    #     intra_schedule_ddos(selenium_manager)
    #
    #     from app.http.routes.dev import load_dev_routes
    #     from app.http.routes.auth_routes import load_auth_routes
    #
    #     load_dev_routes(app, intra_manager, student_manager)
    #     load_auth_routes(app)
    #     db.create_all()
    #     db.session.commit()
    #
    #
    #     # Serve dashboard
    #     @app.route('/')
    #     def serve_dashboard():
    #         return send_from_directory(app.static_folder, 'index.html')
    #     @app.route('/<path:path>')
    #     def serve_static_files(path):
    #         return send_from_directory(app.static_folder, path)
    #
    #
    #
    # log_info("Starting server on port {}".format(os.getenv("PORT")))
    # app.run(host="0.0.0.0", port=os.getenv("PORT"), debug=True, use_reloader=False)

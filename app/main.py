import os
import pymongo
from flask import Flask, send_from_directory, render_template
from flask_cors import CORS

from app.api.routes.auth_routes import load_auth_routes
from app.api.routes.calendar_routes import load_calendar_routes
from app.api.routes.global_routes import load_global_routes
from app.api.routes.mouli_routes import load_mouli_routes
from app.api.routes.project_routes import load_project_routes
from app.api.routes.scrapers_routes import load_scrapers_routes
from app.api.routes.sync_routes import load_sync_routes
from app.globals import Globals
from app.services.publicscraper_service import PublicScraperService
from app.tools.envloader import load_env
from app.tools.teklogger import log_info, log_debug, log_error, log_success
from app.services.redis_service import RedisService


def shutdown_server():
    """
    Shutdown all the services.
    """

    # Shutdown the Redis service
    log_info("Closing redis connection...")
    RedisService.disconnect()

    # Shutdown the MongoDB service
    log_info("Closing MongoDB connection...")
    Globals.database.client.close()

    # Shutdown the Flask app
    log_info("Shutting down Flask app...")
    Globals.app.shutdown()

    # Exit the program
    log_info("Exiting...")
    exit(0)


def create_app():
    """
    Create the Flask application and load the routes.
    """
    app = Flask(__name__, static_folder="../dashboard_build")

    # Serve React App
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(app.static_folder + '/' + path):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    #Load the routes
    load_scrapers_routes(app)
    load_project_routes(app)
    load_mouli_routes(app)
    load_global_routes(app)
    load_calendar_routes(app)
    load_sync_routes(app)
    load_auth_routes(app)

    # Enable CORS
    CORS(app)


    return app


def run():
    log_info("Welcome to TekBetter server !")
    log_debug("Debug mode enabled")
    try:
        load_env()
    except Exception as e:
        log_error(str(e))
        exit(1)

    # Connect to MongoDB
    mongo_url = f"mongodb://{os.getenv('MONGO_HOST')}:{os.getenv('MONGO_PORT')}"
    log_info("Connecting to MongoDB...")
    Globals.database = pymongo.MongoClient(mongo_url)[os.getenv('MONGO_DB')]

    try:
        Globals.database.list_collection_names()
    except Exception as e:
        log_error(f"Failed to connect to MongoDB server at {mongo_url}: {e}")
        exit(1)

    log_success("Connected to MongoDB")

    # Connect to Redis
    RedisService.connect(
        host=os.getenv("REDIS_HOST"),
        port=os.getenv("REDIS_PORT"),
        db=os.getenv("REDIS_DB"),
        password=os.getenv("REDIS_PASSWORD")
    )

    # Load scrapers from config file
    if os.getenv("SCRAPERS_CONFIG_FILE") != "":
        PublicScraperService.load_scrapers_from_config()
        PublicScraperService.reassign_scrapers()

    app = create_app()
    app.run("0.0.0.0", port=8080, debug=True)


try:
    run()
except KeyboardInterrupt:
    shutdown_server()

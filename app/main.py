import os
import pymongo
from flask import Flask
from flask_cors import CORS

from app.api.routes.global_routes import load_global_routes
from app.api.routes.mouli_routes import load_mouli_routes
from app.api.routes.project_routes import load_project_routes
from app.api.routes.scrapers_routes import load_scrapers_routes
from app.globals import Globals
from app.services.publicscraper_service import PublicScraperService
from app.tools.envloader import load_env
from app.tools.teklogger import log_info, log_debug, log_error, log_success

if __name__ == '__main__':
    log_info("Welcome to TekBetter server !")
    log_debug("Debug mode enabled")
    try:
        load_env()
    except Exception as e:
        log_error(str(e))
        exit(1)

    mongo_url = f"mongodb://{os.getenv('MONGO_HOST')}:{os.getenv('MONGO_PORT')}"

    log_info("Connecting to MongoDB...")
    Globals.database = pymongo.MongoClient(mongo_url)[os.getenv('MONGO_DB')]

    # Check if the connection is successful
    try:
        Globals.database.list_collection_names()
    except:
        log_error("Failed to connect to MongoDB server at " + mongo_url)
        exit(1)
    log_success("Connected to MongoDB")

    Globals.app = Flask(__name__)
    load_scrapers_routes()
    load_project_routes()
    load_mouli_routes()
    load_global_routes()

    if os.getenv("SCRAPERS_CONFIG_FILE") != "":
        PublicScraperService.load_scrapers_from_config()
        PublicScraperService.reassign_scrapers()

    CORS(Globals.app)
    Globals.app.run("0.0.0.0", port=8080, debug=True)

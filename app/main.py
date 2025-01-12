import json
import pymongo
from flask import Flask

from app.api.routes.scrapers_routes import load_scrapers_routes
from app.globals import Globals
from app.tools.teklogger import log_info, log_debug, log_error



if __name__ == '__main__':
    log_info("Welcome to TekBetter server !")
    log_debug("Debug mode enabled")
    try:
        pass  # load_env()
    except Exception as e:
        log_error(str(e))
        exit(1)
    Globals.database = pymongo.MongoClient("mongodb://localhost:27017")["tekbetter"]
    log_info("Connected to MongoDB")

    Globals.app = Flask(__name__)
    load_scrapers_routes()

    Globals.app.run("0.0.0.0", port=8080, debug=True)

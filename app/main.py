import json
import pymongo

from app.globals import Globals
from app.parsers.mouli_parser import build_mouli_from_myepitech
from app.parsers.student_parser import build_student_from_intra
from app.services.mouli_service import MouliService
from app.services.student_service import StudentService
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

from app.tools.teklogger import log_info, log_debug, log_error

database = None


if __name__ == '__main__':
    log_info("Welcome to TekBetter server !")
    log_debug("Debug mode enabled")
    try:
        pass  # load_env()
    except Exception as e:
        log_error(str(e))
        exit(1)

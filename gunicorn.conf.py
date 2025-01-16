import os

workers = 1
threads = 4
worker_class = 'gthread'

bind = f"0.0.0.0:{os.getenv('PORT', '8080')}"

timeout = 120
graceful_timeout = 30
keepalive = 65
preload_app = False

accesslog = '-'
errorlog = '-'
loglevel = 'info'

worker_tmp_dir = '/dev/shm'

max_requests = 0
max_requests_jitter = 0

max_worker_restart = 0


def on_starting(server):
    server.log.info("Starting Gunicorn server...")


def worker_abort(worker):
    """Prevent worker from restarting on error"""
    worker.log.warning("Worker received SIGABRT. Preventing restart.")
    return True


def on_exit(server):
    try:
        from app.tools.teklogger import log_info
        from app.globals import Globals
        from app.services.redis_service import RedisService

        log_info("Closing redis connection...")
        RedisService.disconnect()

        log_info("Closing MongoDB connection...")
        if hasattr(Globals, 'database') and Globals.database:
            Globals.database.client.close()
    except:
        pass

    server.log.info("Shutting down Gunicorn server...")

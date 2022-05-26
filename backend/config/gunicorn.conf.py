wsgi_app = "Polling_App.wsgi"
bind = "0.0.0.0:8000"
accesslog = errorlog = "./gunicorn.log"
capture_output = True
pidfile = "./gunicorn.log"
loglevel = "debug"

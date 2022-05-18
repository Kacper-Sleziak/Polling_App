#! /bin/sh

python3 /django/manage.py wait_for_db
python3 /django/manage.py migrate
python3 /django/manage.py loaddata /django/share/data.json
gunicorn Polling_App.wsgi --bind 0.0.0.0:8000

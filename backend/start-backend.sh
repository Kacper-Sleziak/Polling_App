#! /bin/sh

cp /django/custom/commands/wait_for_db.py /usr/local/lib/python3.10/site-packages/django/core/management/commands/

python3 /django/manage.py wait_for_db
python3 /django/manage.py migrate
python3 /django/manage.py loaddata /django/share/data.json
gunicorn Polling_App.wsgi --bind 0.0.0.0:8000

from django.core.management.base import BaseCommand
from django.db import connection
from django.db.utils import OperationalError
import time


class Command(BaseCommand):
    """ Django command to pause execution until database is available"""
    def handle(self, *args, **kwargs):
        self.stdout.write('waiting for db ...')
        while True:
            try:
                # get the database with keyword 'default' from settings.py
                connection.ensure_connection()
                # prints success messge in green
                self.stdout.write(self.style.SUCCESS('db available'))
                return
            except OperationalError:
                self.stdout.write("Database unavailable, waiting 1 second ...")
                time.sleep(1)

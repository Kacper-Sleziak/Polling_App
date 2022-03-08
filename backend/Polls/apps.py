from django.apps import AppConfig


class PollsConfig(AppConfig):
    name = 'Polls'
    
    def ready(self):
        import Polls.signals

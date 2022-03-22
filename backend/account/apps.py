from django.apps import AppConfig


class accountConfig(AppConfig):
    name = 'account'

    def ready(self):
        import account.signals

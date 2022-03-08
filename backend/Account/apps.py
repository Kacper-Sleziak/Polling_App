from django.apps import AppConfig


class AccountConfig(AppConfig):
    name = 'Account'
    
    def ready(self):
        import Account.signals

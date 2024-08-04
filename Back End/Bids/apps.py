from django.apps import AppConfig


class BidsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Bids'

    def ready(self):
        import Bids.signals

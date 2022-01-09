from django.apps import AppConfig

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

# https://docs.djangoproject.com/en/4.0/topics/signals/
    def ready(self):
        from . import signals

from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

from celery import Celery
from celery.schedules import crontab

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'QuickBids.settings')

# Create the Celery application instance
app = Celery('QuickBids')

# Load task modules from all registered Django app configs.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks from installed apps
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


app.conf.beat_schedule = {
    'check-auctions-every-minute': {
        'task': 'Auction.tasks.check_ended_auctions',
        'schedule': crontab(minute='*'),
    },
}
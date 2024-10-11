# Generated by Django 5.0.6 on 2024-08-13 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Notifications', '0003_notification_auction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='type',
            field=models.CharField(choices=[('OUTBID', 'Outbid'), ('WIN', 'Auction Win'), ('LOSING_BID', 'Losing Bid'), ('BID_PLACED', 'Bid Placed'), ('AUCTION_START', 'Auction started'), ('AUCTION_END', 'Auction ended'), ('SYSTEM_ALERT', 'System alert'), ('NEW_USER', 'New user')], max_length=50),
        ),
    ]

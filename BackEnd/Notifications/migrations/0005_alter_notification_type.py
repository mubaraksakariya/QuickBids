# Generated by Django 5.0.6 on 2024-08-21 12:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Notifications', '0004_alter_notification_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='type',
            field=models.CharField(choices=[('OUTBID', 'Outbid'), ('WIN', 'Auction Win'), ('LOSING_BID', 'Losing Bid'), ('BID_PLACED', 'Bid Placed'), ('AUCTION_START', 'Auction started'), ('AUCTION_END', 'Auction ended'), ('AUCTION_BUY_NOW', 'Product bought'), ('AUCTION_SALE', 'Product sold'), ('SYSTEM_ALERT', 'System alert'), ('NEW_USER', 'New user')], max_length=50),
        ),
    ]

# Generated by Django 5.1 on 2024-09-18 07:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Notifications', '0005_alter_notification_type'),
        ('Payments', '0013_upidetail_upi_id_hash'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='withdrawal_request',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='Payments.withdrawalrequest'),
        ),
        migrations.AlterField(
            model_name='notification',
            name='type',
            field=models.CharField(choices=[('OUTBID', 'Outbid'), ('WIN', 'Auction Win'), ('LOSING_BID', 'Losing Bid'), ('BID_PLACED', 'Bid Placed'), ('AUCTION_START', 'Auction started'), ('AUCTION_END', 'Auction ended'), ('AUCTION_BUY_NOW', 'Product bought'), ('AUCTION_SALE', 'Product sold'), ('SYSTEM_ALERT', 'System alert'), ('NEW_USER', 'New user'), ('WITHDRAWALREQUEST', 'Withdrawal Request')], max_length=50),
        ),
    ]

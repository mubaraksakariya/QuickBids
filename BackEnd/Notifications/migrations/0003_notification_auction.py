# Generated by Django 5.0.6 on 2024-08-07 10:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Auction', '0003_auction_winner_auction_winning_bid'),
        ('Notifications', '0002_alter_notification_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='auction',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='Auction.auction'),
        ),
    ]

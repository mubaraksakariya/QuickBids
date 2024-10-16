# Generated by Django 5.0.6 on 2024-08-03 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Wallet', '0002_transaction_description_transaction_receiver_wallet_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='transaction_type',
            field=models.CharField(choices=[('DEPOSIT', 'Deposit'), ('WITHDRAWAL', 'Withdrawal'), ('PAYMENT', 'Payment'), ('TOPUP', 'Top-Up'), ('TRANSFER', 'Transfer'), ('REFUND', 'Refund')], max_length=10),
        ),
    ]
